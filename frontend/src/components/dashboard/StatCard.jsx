function StatCard({ label, value, unit, change, icon: Icon, color = 'primary' }) {
  return (
    <div className={`stat-card stat-${color}`}>
      <div className="stat-icon">{Icon && <Icon />}</div>
      <div className="stat-content">
        <span className="stat-label">{label}</span>
        <div className="stat-value-row">
          <strong>{value}</strong>
          {unit && <span className="stat-unit">{unit}</span>}
        </div>
        {change && <span className="stat-change">{change}</span>}
      </div>
    </div>
  );
}

export default StatCard;
