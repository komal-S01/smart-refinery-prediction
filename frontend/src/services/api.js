const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// -----------------------------
// Backend API
// -----------------------------

export const checkHealth = async () => {
  const response = await api.get("/health");
  return response.data;
};

export const predict = async (inputData) => {
  const response = await api.post('/predict', inputData);
  return response.data;
};

export const optimize = async (inputData) => {
  const response = await api.post('/optimize', inputData);
  return response.data;
};


// -----------------------------
// Existing dashboard mock data
// Keep these for now.
// -----------------------------

export const kpiData = [
  {
    id: "quality",
    title: "Product Quality",
    value: "98.6%",
    trend: "+1.2%",
    trendUp: true,
    indicator: "green",
    icon: "quality",
  },
  {
    id: "energy",
    title: "Energy Consumption",
    value: "1260 kWh",
    trend: "-3.4%",
    trendUp: false,
    indicator: "yellow",
    icon: "energy",
  },
  {
    id: "equipment",
    title: "Equipment Health",
    value: "96%",
    trend: "+0.8%",
    trendUp: true,
    indicator: "green",
    icon: "equipment",
  },
  {
    id: "throughput",
    title: "Throughput",
    value: "318 Ton/hr",
    trend: "+5.1%",
    trendUp: true,
    indicator: "green",
    icon: "throughput",
  },
];

export const productionTrendData = [
  { time: "06:00", value: 280 },
  { time: "08:00", value: 295 },
  { time: "10:00", value: 310 },
  { time: "12:00", value: 305 },
  { time: "14:00", value: 318 },
  { time: "16:00", value: 322 },
  { time: "18:00", value: 315 },
  { time: "20:00", value: 308 },
];

export const energyConsumptionData = [
  { hour: "00:00", consumption: 980 },
  { hour: "04:00", consumption: 1050 },
  { hour: "08:00", consumption: 1180 },
  { hour: "12:00", consumption: 1260 },
  { hour: "16:00", consumption: 1220 },
  { hour: "20:00", consumption: 1100 },
];

export const equipmentEfficiencyData = [
  { unit: "CDU", efficiency: 94 },
  { unit: "FCC", efficiency: 88 },
  { unit: "HCU", efficiency: 92 },
  { unit: "Reformer", efficiency: 96 },
  { unit: "Alkylation", efficiency: 91 },
  { unit: "Hydrotreater", efficiency: 89 },
];

export const qualityDistributionData = [
  { name: "Premium", value: 42, color: "#1565C0" },
  { name: "Standard", value: 35, color: "#42A5F5" },
  { name: "Regular", value: 18, color: "#90CAF9" },
  { name: "Off-Spec", value: 5, color: "#EF5350" },
];

export const sensorData = [
  {
    id: 1,
    sensor: "Furnace Temperature",
    value: 385.2,
    unit: "°C",
    status: "yellow",
    lastUpdated: "14:32:05",
  },
  {
    id: 2,
    sensor: "Distillation Pressure",
    value: 2.4,
    unit: "bar",
    status: "green",
    lastUpdated: "14:32:08",
  },
  {
    id: 3,
    sensor: "Feed Flow Rate",
    value: 1250,
    unit: "m³/h",
    status: "green",
    lastUpdated: "14:32:10",
  },
  {
    id: 4,
    sensor: "Catalyst Level",
    value: 78.5,
    unit: "%",
    status: "green",
    lastUpdated: "14:32:12",
  },
  {
    id: 5,
    sensor: "Pump Vibration",
    value: 4.8,
    unit: "mm/s",
    status: "red",
    lastUpdated: "14:32:15",
  },
  {
    id: 6,
    sensor: "Reactor Temperature",
    value: 420.1,
    unit: "°C",
    status: "green",
    lastUpdated: "14:32:18",
  },
  {
    id: 7,
    sensor: "Cooling Water Flow",
    value: 890,
    unit: "m³/h",
    status: "green",
    lastUpdated: "14:32:20",
  },
  {
    id: 8,
    sensor: "Stack Emissions",
    value: 42,
    unit: "ppm",
    status: "yellow",
    lastUpdated: "14:32:22",
  },
];

export const notifications = [
  {
    id: 1,
    title: "High Furnace Temperature",
    message: "Furnace zone 3 exceeded threshold at 385°C",
    type: "warning",
    time: "12 min ago",
  },
  {
    id: 2,
    title: "Energy Usage Increased",
    message: "Energy consumption up 8% compared to baseline",
    type: "info",
    time: "28 min ago",
  },
  {
    id: 3,
    title: "Pump Maintenance Due",
    message: "P-401A scheduled maintenance in 48 hours",
    type: "warning",
    time: "1 hr ago",
  },
  {
    id: 4,
    title: "AI Recommendation Available",
    message: "New optimization strategy ready for review",
    type: "success",
    time: "2 hr ago",
  },
];

export const activityEvents = [
  { id: 1, time: "10:15", event: "Production Started", type: "success" },
  { id: 2, time: "11:00", event: "Quality Prediction Completed", type: "info" },
  { id: 3, time: "12:30", event: "Equipment Warning", type: "warning" },
  { id: 4, time: "13:00", event: "AI Optimization Applied", type: "success" },
  { id: 5, time: "13:45", event: "Sensor Calibration Done", type: "info" },
  { id: 6, time: "14:15", event: "Throughput Target Met", type: "success" },
];


// Temporary fallback for existing dashboard
export const fetchDashboardData = async () => {
  return {
    kpis: kpiData,
    production: productionTrendData,
    energy: energyConsumptionData,
    equipment: equipmentEfficiencyData,
    quality: qualityDistributionData,
    sensors: sensorData,
    notifications,
    activities: activityEvents,
  };
};

export default api;