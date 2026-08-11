import { MdPictureAsPdf, MdAssessment, MdBolt, MdBuild, MdHistory } from 'react-icons/md';

const reports = [
  { icon: MdAssessment, title: 'Production Report', desc: 'Daily and weekly production summary with KPIs', date: 'Jul 2, 2026' },
  { icon: MdBolt, title: 'Energy Report', desc: 'Energy consumption analysis and optimization logs', date: 'Jul 1, 2026' },
  { icon: MdBuild, title: 'Equipment Report', desc: 'Equipment health, maintenance, and efficiency data', date: 'Jun 30, 2026' },
  { icon: MdHistory, title: 'Prediction History', desc: 'AI model predictions and accuracy metrics', date: 'Jun 28, 2026' },
];

function Reports() {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h2>Reports</h2>
          <p>Generate and export refinery performance reports</p>
        </div>
        <button className="btn btn-primary btn-ripple">
          <MdPictureAsPdf /> Export PDF
        </button>
      </div>
      <div className="reports-grid">
        {reports.map(({ icon: Icon, title, desc, date }) => (
          <div key={title} className="report-card">
            <div className="report-icon"><Icon /></div>
            <div className="report-content">
              <h3>{title}</h3>
              <p>{desc}</p>
              <span className="report-date">Last generated: {date}</span>
            </div>
            <button className="btn btn-outline btn-sm btn-ripple">View</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reports;
