import { activityEvents } from '../../services/api';

function ActivityTimeline() {
  return (
    <div className="panel timeline-panel">
      <div className="panel-header">
        <h3>Activity Timeline</h3>
      </div>
      <div className="timeline">
        {activityEvents.map((event, i) => (
          <div key={event.id} className={`timeline-item type-${event.type}`}>
            <div className="timeline-marker">
              <span className="timeline-dot" />
              {i < activityEvents.length - 1 && <span className="timeline-line" />}
            </div>
            <div className="timeline-content">
              <span className="timeline-time">{event.time}</span>
              <p>{event.event}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityTimeline;
