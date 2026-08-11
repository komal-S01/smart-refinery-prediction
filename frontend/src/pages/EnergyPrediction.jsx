import ChartCard from '../components/dashboard/ChartCard';
import EnergyChart from '../components/dashboard/EnergyChart';
import StatCard from '../components/dashboard/StatCard';
import { MdBolt, MdTrendingDown, MdEco } from 'react-icons/md';

function EnergyPrediction() {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h2>Energy Prediction</h2>
        <p>AI-driven energy consumption analysis and forecasting</p>
      </div>
      <div className="stat-row">
        <StatCard label="Current Usage" value="1260" unit="kWh" change="-3.4% vs baseline" icon={MdBolt} color="primary" />
        <StatCard label="Predicted Savings" value="8.2" unit="%" change="Next 24 hours" icon={MdTrendingDown} color="success" />
        <StatCard label="Carbon Index" value="42" unit="CO₂e" change="Within limits" icon={MdEco} color="secondary" />
      </div>
      <div className="charts-grid charts-grid-1">
        <ChartCard title="Energy Consumption Trend" subtitle="Hourly kWh usage pattern">
          <EnergyChart />
        </ChartCard>
      </div>
    </div>
  );
}

export default EnergyPrediction;
