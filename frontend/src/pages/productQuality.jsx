import ChartCard from '../components/dashboard/ChartCard';
import QualityChart from '../components/dashboard/QualityChart';
import StatCard from '../components/dashboard/StatCard';
import { MdScience, MdTrendingUp, MdCheckCircle } from 'react-icons/md';

function ProductQuality() {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h2>Product Quality</h2>
        <p>Monitor and predict refinery product quality metrics</p>
      </div>
      <div className="stat-row">
        <StatCard label="Current Quality" value="98.6" unit="%" change="+1.2% vs yesterday" icon={MdScience} color="primary" />
        <StatCard label="Premium Grade" value="42" unit="%" change="Stable" icon={MdCheckCircle} color="success" />
        <StatCard label="Off-Spec Rate" value="0.4" unit="%" change="-0.2% improvement" icon={MdTrendingUp} color="secondary" />
      </div>
      <div className="charts-grid charts-grid-1">
        <ChartCard title="Quality Distribution" subtitle="Product grade breakdown">
          <QualityChart />
        </ChartCard>
      </div>
    </div>
  );
}

export default ProductQuality;
