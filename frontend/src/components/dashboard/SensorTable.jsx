import { sensorData } from '../../services/api';

function SensorTable() {
  return (
    <div className="panel sensor-panel">
      <div className="panel-header">
        <h3>Live Sensor Data</h3>
        <span className="live-badge"><span className="pulse" /> Live</span>
      </div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Sensor</th>
              <th>Current Value</th>
              <th>Unit</th>
              <th>Status</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {sensorData.map((row) => (
              <tr key={row.id}>
                <td>{row.sensor}</td>
                <td className="value-cell">{row.value}</td>
                <td>{row.unit}</td>
                <td>
                  <span className={`status-badge ${row.status}`}>
                    <span className={`status-dot ${row.status}`} />
                    {row.status}
                  </span>
                </td>
                <td className="time-cell">{row.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SensorTable;
