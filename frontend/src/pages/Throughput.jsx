import ChartCard from '../components/dashboard/ChartCard';
import ProductionChart from '../components/dashboard/ProductionChart';
import StatCard from '../components/dashboard/StatCard';
import { MdSpeed, MdTrendingUp, MdTimeline } from 'react-icons/md';

function Throughput() {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h2>Throughput Prediction</h2>
        <p>Production rate monitoring and AI forecasting</p>
      </div>
      <div className="stat-row">
        <StatCard label="Current Rate" value="318" unit="Ton/hr" change="+5.1% vs target" icon={MdSpeed} color="primary" />
        <StatCard label="Daily Output" value="7,632" unit="Tons" change="On track" icon={MdTrendingUp} color="success" />
        <StatCard label="Predicted Peak" value="325" unit="Ton/hr" change="At 16:00 today" icon={MdTimeline} color="secondary" />
      </div>
      <div className="charts-grid charts-grid-1">
        <ChartCard title="Production Trend" subtitle="Throughput over time">
          <ProductionChart />
        </ChartCard>
      </div>
    </div>
  );
}

export default Throughput;
