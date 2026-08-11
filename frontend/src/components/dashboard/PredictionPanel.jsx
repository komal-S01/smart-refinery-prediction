import { useState } from 'react';
import { MdAutoAwesome, MdRefresh } from 'react-icons/md';
import { predictQuality } from '../../services/api';

const initialForm = {
  temperature: 385,
  pressure: 2.4,
  flowRate: 1250,
  catalystLevel: 78,
  feedRate: 320,
};

function PredictionPanel() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: parseFloat(e.target.value) || 0 });
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    const data = await predictQuality(form);
    setResult(data);
    setLoading(false);
  };

  const handleReset = () => {
    setForm(initialForm);
    setResult(null);
  };

  return (
    <div className="panel prediction-panel" id="ai">
      <div className="panel-header">
        <MdAutoAwesome className="panel-icon" />
        <div>
          <h3>AI Prediction Panel</h3>
          <p>Enter process parameters to predict product quality</p>
        </div>
      </div>

      <form className="prediction-form" onSubmit={handlePredict}>
        <div className="form-grid">
          {[
            { name: 'temperature', label: 'Temperature (°C)', min: 300, max: 500 },
            { name: 'pressure', label: 'Pressure (bar)', min: 1, max: 5, step: 0.1 },
            { name: 'flowRate', label: 'Flow Rate (m³/h)', min: 500, max: 2000 },
            { name: 'catalystLevel', label: 'Catalyst Level (%)', min: 50, max: 100 },
            { name: 'feedRate', label: 'Feed Rate (Ton/hr)', min: 200, max: 400 },
          ].map(({ name, label, min, max, step }) => (
            <div className="form-group" key={name}>
              <label htmlFor={name}>{label}</label>
              <input
                id={name}
                name={name}
                type="number"
                value={form[name]}
                onChange={handleChange}
                min={min}
                max={max}
                step={step || 1}
              />
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary btn-ripple" disabled={loading}>
            <MdAutoAwesome />
            {loading ? 'Predicting...' : 'Predict'}
          </button>
          <button type="button" className="btn btn-secondary btn-ripple" onClick={handleReset}>
            <MdRefresh /> Reset
          </button>
        </div>
      </form>

      {loading && (
        <div className="prediction-result skeleton-result">
          <div className="skeleton" style={{ height: 20, width: '50%' }} />
          <div className="skeleton" style={{ height: 20, width: '70%', marginTop: 8 }} />
          <div className="skeleton" style={{ height: 20, width: '60%', marginTop: 8 }} />
        </div>
      )}

      {result && !loading && (
        <div className="prediction-result fade-in">
          <div className="result-grid">
            <div className="result-item">
              <span>Predicted Quality</span>
              <strong className="result-value primary">{result.predictedQuality}</strong>
            </div>
            <div className="result-item">
              <span>Confidence Score</span>
              <strong className="result-value">{result.confidenceScore}</strong>
            </div>
            <div className="result-item">
              <span>Status</span>
              <span className={`status-badge ${result.status === 'Optimal' ? 'green' : result.status === 'Good' ? 'yellow' : 'red'}`}>
                {result.status}
              </span>
            </div>
          </div>
          <div className="result-recommendation">
            <strong>Recommendation:</strong>
            <p>{result.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PredictionPanel;
