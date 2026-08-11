import ChartCard from '../components/dashboard/ChartCard';
import EquipmentChart from '../components/dashboard/EquipmentChart';
import StatCard from '../components/dashboard/StatCard';
import { MdBuild, MdWarning, MdCheckCircle } from 'react-icons/md';

function EquipmentEfficiency() {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h2>Equipment Efficiency</h2>
        <p>Monitor health and performance of refinery units</p>
      </div>
      <div className="stat-row">
        <StatCard label="Overall Health" value="96" unit="%" change="+0.8% this week" icon={MdBuild} color="primary" />
        <StatCard label="Units Online" value="6" unit="/ 6" change="All operational" icon={MdCheckCircle} color="success" />
        <StatCard label="Active Warnings" value="2" unit="" change="P-401A, Furnace-3" icon={MdWarning} color="warning" />
      </div>
      <div className="charts-grid charts-grid-1">
        <ChartCard title="Unit Efficiency" subtitle="Performance by process unit">
          <EquipmentChart />
        </ChartCard>
      </div>
    </div>
  );
}

export default EquipmentEfficiency;
