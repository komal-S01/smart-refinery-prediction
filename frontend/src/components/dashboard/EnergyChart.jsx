import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { energyConsumptionData } from '../../services/api';

function EnergyChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={energyConsumptionData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#42A5F5" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#42A5F5" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="hour" tick={{ fontSize: 12, fill: '#5A6578' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#5A6578' }} axisLine={false} tickLine={false} unit=" kWh" />
        <Tooltip
          contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
          formatter={(v) => [`${v} kWh`, 'Consumption']}
        />
        <Area type="monotone" dataKey="consumption" stroke="#42A5F5" strokeWidth={2} fill="url(#energyGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default EnergyChart;
