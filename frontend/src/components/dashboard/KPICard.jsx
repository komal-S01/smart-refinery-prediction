import { MdTrendingUp, MdTrendingDown, MdScience, MdBolt, MdBuild, MdSpeed } from 'react-icons/md';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const iconMap = {
  quality: MdScience,
  energy: MdBolt,
  equipment: MdBuild,
  throughput: MdSpeed,
};

const sparkData = [
  { v: 40 }, { v: 55 }, { v: 45 }, { v: 60 }, { v: 50 }, { v: 70 }, { v: 65 }, { v: 80 },
];

function KPICard({ title, value, trend, trendUp, indicator, icon, loading }) {
  const Icon = iconMap[icon] || MdScience;

  if (loading) {
    return (
      <div className="kpi-card skeleton-card">
        <div className="skeleton" style={{ width: 40, height: 40, borderRadius: 10 }} />
        <div className="skeleton" style={{ width: '60%', height: 14, marginTop: 12 }} />
        <div className="skeleton" style={{ width: '40%', height: 28, marginTop: 8 }} />
        <div className="skeleton" style={{ width: '100%', height: 40, marginTop: 12 }} />
      </div>
    );
  }

  return (
    <div className={`kpi-card indicator-${indicator}`}>
      <div className="kpi-top">
        <div className="kpi-icon-wrap">
          <Icon />
        </div>
        <span className={`status-dot ${indicator}`} />
      </div>
      <p className="kpi-title">{title}</p>
      <h3 className="kpi-value">{value}</h3>
      <div className="kpi-bottom">
        <span className={`kpi-trend ${trendUp ? 'up' : 'down'}`}>
          {trendUp ? <MdTrendingUp /> : <MdTrendingDown />}
          {trend}
        </span>
        <div className="kpi-sparkline">
          <ResponsiveContainer width="100%" height={36}>
            <LineChart data={sparkData}>
              <Line type="monotone" dataKey="v" stroke={trendUp ? '#2E7D32' : '#1565C0'} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default KPICard;
