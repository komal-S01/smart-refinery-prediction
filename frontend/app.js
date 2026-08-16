const state = {
  apiBase: localStorage.getItem("refinex_api") || "http://127.0.0.1:8000",
  prediction: null,
  optimization: null
};

const $ = id => document.getElementById(id);

function toast(message){
  const el = $("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 3200);
}

function setApiStatus(online){
  const el = $("apiStatus");
  el.classList.toggle("online", online);
  el.classList.toggle("offline", !online);
  el.querySelector("span").textContent = online ? "API ONLINE" : "API OFFLINE";
  $("heroStatus").textContent = online ? "ONLINE" : "OFFLINE";
}

async function checkHealth(){
  try{
    const r = await fetch(`${state.apiBase}/health`, {method:"GET"});
    if(!r.ok) throw new Error();
    setApiStatus(true);
    return true;
  }catch{
    setApiStatus(false);
    return false;
  }
}

function collectFormData(){
  const data = {};
  new FormData($("predictionForm")).forEach((value,key) => {
    data[key] = Number(value);
  });
  const crude = $("crudeType").value;
  data.Crude_Type_Light_Sweet = crude === "light" ? 1 : 0;
  data.Crude_Type_Medium = crude === "medium" ? 1 : 0;
  return data;
}

function num(value,d=2){
  if(value === null || value === undefined || Number.isNaN(Number(value))) return "—";
  return Number(value).toLocaleString(undefined,{minimumFractionDigits:d,maximumFractionDigits:d});
}

async function postJson(endpoint,payload){
  const response = await fetch(`${state.apiBase}${endpoint}`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(payload)
  });
  let body=null;
  try{body=await response.json()}catch{}
  if(!response.ok){
    const detail=body?.detail ? (typeof body.detail==="string" ? body.detail : JSON.stringify(body.detail)) : `HTTP ${response.status}`;
    throw new Error(detail);
  }
  return body;
}

function renderPrediction(data){
  state.prediction=data;
  const thr=Number(data.Unit_Throughput_BPH);
  const eff=Number(data.Equipment_Efficiency_pct);
  const en=Number(data.Energy_Consumption_MWh);

  $("throughputValue").textContent=num(thr,2);
  $("efficiencyValue").textContent=num(eff,2);
  $("energyValue").textContent=num(en,2);

  $("heroThroughput").textContent=num(thr,0);
  $("heroEnergy").textContent=num(en,1);
  $("heroEfficiency").textContent=num(eff,1);
  $("heroModelState").textContent="LIVE";
  $("predictionState").textContent="INFERENCE COMPLETE";
  $("predictionMessage").textContent="Prediction received from the FastAPI model layer.";

  $("throughputBar").style.width=`${Math.min(100,Math.max(8,thr/150))}%`;
  $("efficiencyBar").style.width=`${Math.min(100,Math.max(5,eff))}%`;
  $("energyBar").style.width=`${Math.min(100,Math.max(8,en*1.5))}%`;
}

function renderOptimization(data){
  state.optimization=data;
  $("optFurnace").textContent=num(data.Furnace_Temperature_C,2);
  $("optReflux").textContent=num(data.Reflux_Ratio,2);
  $("optPressure").textContent=num(data.Column_Pressure_bar,2);
  $("optThroughput").textContent=num(data.Predicted_Throughput_BPH,1);
  $("optEfficiency").textContent=num(data.Predicted_Efficiency_pct,1);
  $("optEnergy").textContent=num(data.Predicted_Energy_MWh,2);
  $("scoreValue").textContent=num(data.Combined_Score,4);
  $("optimizationDecision").textContent="Recommended point generated from the current scenario.";
}

$("predictionForm").addEventListener("submit",async e=>{
  e.preventDefault();
  const btn=$("predictBtn"), original=btn.innerHTML;
  btn.disabled=true; btn.innerHTML="<span class='execute-icon'>◌</span><span>RUNNING MODEL...</span><b>WAIT</b>";
  $("predictionState").textContent="RUNNING INFERENCE";
  $("heroModelState").textContent="RUNNING";
  $("predictionMessage").textContent="Sending scenario to /predict...";
  try{
    if(!(await checkHealth())) throw new Error("FastAPI is not reachable at "+state.apiBase);
    const data=await postJson("/predict",collectFormData());
    renderPrediction(data);
    toast("AI prediction received.");
  }catch(err){
    $("predictionMessage").textContent=err.message;
    $("predictionState").textContent="REQUEST FAILED";
    $("heroModelState").textContent="ERROR";
    toast(err.message);
  }finally{
    btn.disabled=false; btn.innerHTML=original;
  }
});

$("optimizeBtn").addEventListener("click",async()=>{
  const btn=$("optimizeBtn"), original=btn.innerHTML;
  btn.disabled=true; btn.innerHTML="<span>◌</span><b>SEARCHING 512 CANDIDATES...</b><small>PLEASE WAIT</small>";
  $("optimizationMessage").textContent="Searching furnace × reflux × pressure combinations...";
  try{
    if(!(await checkHealth())) throw new Error("FastAPI is not reachable at "+state.apiBase);
    const data=await postJson("/optimize",collectFormData());
    renderOptimization(data);
    $("optimizationMessage").textContent="Optimization complete. Review the recommended operating point.";
    toast("Best setpoints received.");
  }catch(err){
    $("optimizationMessage").textContent=err.message;
    $("optimizationDecision").textContent="Optimization request failed.";
    toast(err.message);
  }finally{
    btn.disabled=false; btn.innerHTML=original;
  }
});

$("resetBtn").addEventListener("click",()=>{
  $("predictionForm").reset();
  $("crudeType").value="medium";
  ["throughputValue","efficiencyValue","energyValue","heroThroughput","heroEfficiency","heroEnergy","optFurnace","optReflux","optPressure","optThroughput","optEfficiency","optEnergy","scoreValue"].forEach(id=>$(id).textContent="—");
  ["throughputBar","efficiencyBar","energyBar"].forEach(id=>$(id).style.width="0");
  $("heroModelState").textContent="IDLE";
  $("predictionState").textContent="WAITING FOR INPUT";
  $("predictionMessage").textContent="Ready. Submit the current scenario to the prediction API.";
  $("optimizationMessage").textContent="Uses the same operating scenario from the prediction workspace.";
  $("optimizationDecision").textContent="Run optimizer to generate a recommendation.";
});

$("connectBtn").addEventListener("click",()=>{
  $("apiUrlInput").value=state.apiBase;
  $("apiModal").classList.add("open");
});
$("closeModal").addEventListener("click",()=>$("apiModal").classList.remove("open"));
$("apiModal").addEventListener("click",e=>{if(e.target===$("apiModal"))$("apiModal").classList.remove("open")});
$("saveApiBtn").addEventListener("click",async()=>{
  const url=$("apiUrlInput").value.trim().replace(/\/+$/,"");
  if(!url)return toast("Enter a valid API URL.");
  state.apiBase=url;
  localStorage.setItem("refinex_api",url);
  const ok=await checkHealth();
  if(ok){$("apiModal").classList.remove("open");toast("FastAPI connected.");}
  else toast("Could not reach that API.");
});

const sections=[...document.querySelectorAll("main section[id]")];
const links=[...document.querySelectorAll(".nav a")];
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")===`#${entry.target.id}`));
  });
},{threshold:.3});
sections.forEach(s=>observer.observe(s));

checkHealth();
