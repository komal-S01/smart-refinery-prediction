import { MdAssessment, MdDownload, MdAutoAwesome, MdFileDownload } from 'react-icons/md';

const actions = [
  { icon: MdAssessment, label: 'Generate Report', color: 'primary' },
  { icon: MdDownload, label: 'Download CSV', color: 'secondary' },
  { icon: MdAutoAwesome, label: 'Run AI Prediction', color: 'accent' },
  { icon: MdFileDownload, label: 'Export Dashboard', color: 'neutral' },
];

function QuickActions() {
  return (
    <div className="panel quick-actions-panel">
      <div className="panel-header">
        <h3>Quick Actions</h3>
      </div>
      <div className="quick-actions-grid">
        {actions.map(({ icon: Icon, label, color }) => (
          <button key={label} className={`quick-action-btn btn-ripple ${color}`}>
            <Icon />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;
