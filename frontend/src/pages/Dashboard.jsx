import { useState, useEffect } from 'react';

import KPICard from '../components/dashboard/KPICard';
import ChartCard from '../components/dashboard/ChartCard';
import ProductionChart from '../components/dashboard/ProductionChart';
import EnergyChart from '../components/dashboard/EnergyChart';
import EquipmentChart from '../components/dashboard/EquipmentChart';
import QualityChart from '../components/dashboard/QualityChart';
import PredictionPanel from '../components/dashboard/PredictionPanel';
import SensorTable from '../components/dashboard/SensorTable';
import NotificationPanel from '../components/dashboard/NotificationPanel';
import ActivityTimeline from '../components/dashboard/ActivityTimeline';
import QuickActions from '../components/dashboard/QuickActions';

import { kpiData, predict } from '../services/api';


function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPrediction = async () => {
      try {
        setLoading(true);
        setError(null);

        // Current/default refinery operating conditions
        const inputData = {
          Crude_Flow_BPH: 1250,
          API_Gravity: 32,
          Sulfur_Feed_pct: 2.5,
          Feed_Temperature_C: 180,
          Furnace_Temperature_C: 385.2,
          Column_Pressure_bar: 2.4,
          Reflux_Ratio: 3.0,
          Catalyst_Activity_pct: 78.5,
          Pump_Vibration_mms: 4.8,
          HeatExchanger_Eff_pct: 92,
          Fuel_Gas_Consumption: 500,
          Electricity_kWh: 1200,
          Maintenance_Days: 10,
          Operator_Experience_yrs: 8,
          Diesel_Sulfur_ppm: 50,

          Crude_Type_Light_Sweet: 1,
          Crude_Type_Medium: 0,
        };

        const result = await predict(inputData);

        setPrediction(result);
      } catch (err) {
        console.error('Prediction API error:', err);
        setError('Unable to fetch live prediction from backend.');
      } finally {
        setLoading(false);
      }
    };

    loadPrediction();
  }, []);


  // Create live KPI values when backend prediction is available
  const liveKpis = prediction
    ? [
        {
          ...kpiData.find((kpi) => kpi.id === 'quality'),
          value: '—',
        },
        {
          ...kpiData.find((kpi) => kpi.id === 'energy'),
          value: `${prediction.Energy_Consumption_MWh?.toFixed(2)} MWh`,
        },
        {
          ...kpiData.find((kpi) => kpi.id === 'equipment'),
          value: `${prediction.Equipment_Efficiency_pct?.toFixed(2)}%`,
        },
        {
          ...kpiData.find((kpi) => kpi.id === 'throughput'),
          value: `${prediction.Unit_Throughput_BPH?.toFixed(2)} BPH`,
        },
      ]
    : kpiData;


  return (
    <div className="dashboard-page">

      {/* Header */}
      <div className="page-header">
        <div>
          <h2>Operations Dashboard</h2>
          <p>Real-time refinery monitoring and AI optimization</p>
        </div>
      </div>


      {/* Backend status */}
      {error && (
        <div className="api-error">
          {error}
        </div>
      )}


      {/* KPI Cards */}
      <div className="kpi-grid">
        {liveKpis.map((kpi) => (
          <KPICard
            key={kpi.id}
            {...kpi}
            loading={loading}
          />
        ))}
      </div>


      {/* Charts */}
      <div className="charts-grid" id="analytics">

        <ChartCard
          title="Production Trend"
          subtitle="Ton/hr over last 24 hours"
        >
          <ProductionChart />
        </ChartCard>


        <ChartCard
          title="Energy Consumption"
          subtitle="kWh hourly usage"
        >
          <EnergyChart />
        </ChartCard>


        <ChartCard
          title="Equipment Efficiency"
          subtitle="Unit performance %"
        >
          <EquipmentChart />
        </ChartCard>


        <ChartCard
          title="Product Quality Distribution"
          subtitle="Output grade breakdown"
        >
          <QualityChart />
        </ChartCard>

      </div>


      {/* Prediction + Sensors */}
      <div className="dashboard-grid-2">
        <PredictionPanel />
        <SensorTable />
      </div>


      {/* Notifications + Activity + Actions */}
      <div className="dashboard-grid-3">
        <NotificationPanel />
        <ActivityTimeline />
        <QuickActions />
      </div>

    </div>
  );
}


export default Dashboard;