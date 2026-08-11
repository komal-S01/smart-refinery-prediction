from fastapi import FastAPI
from pydantic import BaseModel

from backend.predict import predict

app = FastAPI(
    title="IOCL Smart Refinery Prediction API",
    version="1.0"
)


class InputData(BaseModel):

    Crude_Flow_BPH: float
    API_Gravity: float
    Sulfur_Feed_pct: float
    Feed_Temperature_C: float
    Furnace_Temperature_C: float
    Column_Pressure_bar: float
    Reflux_Ratio: float
    Catalyst_Activity_pct: float
    Pump_Vibration_mms: float
    HeatExchanger_Eff_pct: float
    Fuel_Gas_Consumption: float
    Electricity_kWh: float
    Maintenance_Days: float
    Operator_Experience_yrs: float
    Diesel_Sulfur_ppm: float

    Crude_Type_Light_Sweet: int
    Crude_Type_Medium: int


@app.get("/")
def home():

    return {
        "message": "IOCL Smart Refinery Prediction API is running"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }


@app.post("/predict")
def get_prediction(data: InputData):

    input_dict = {
        "Crude_Flow_BPH": data.Crude_Flow_BPH,
        "API_Gravity": data.API_Gravity,
        "Sulfur_Feed_pct": data.Sulfur_Feed_pct,
        "Feed_Temperature_C": data.Feed_Temperature_C,
        "Furnace_Temperature_C": data.Furnace_Temperature_C,
        "Column_Pressure_bar": data.Column_Pressure_bar,
        "Reflux_Ratio": data.Reflux_Ratio,
        "Catalyst_Activity_pct": data.Catalyst_Activity_pct,
        "Pump_Vibration_mms": data.Pump_Vibration_mms,
        "HeatExchanger_Eff_pct": data.HeatExchanger_Eff_pct,
        "Fuel_Gas_Consumption": data.Fuel_Gas_Consumption,
        "Electricity_kWh": data.Electricity_kWh,
        "Maintenance_Days": data.Maintenance_Days,
        "Operator_Experience_yrs": data.Operator_Experience_yrs,
        "Diesel_Sulfur_ppm": data.Diesel_Sulfur_ppm,
        "Crude_Type_Light Sweet": data.Crude_Type_Light_Sweet,
        "Crude_Type_Medium": data.Crude_Type_Medium
    }

    return predict(input_dict)