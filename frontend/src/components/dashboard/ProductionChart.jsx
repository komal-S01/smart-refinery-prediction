import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { productionTrendData } from '../../services/api';

function ProductionChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={productionTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#5A6578' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#5A6578' }} axisLine={false} tickLine={false} unit=" Ton/hr" />
        <Tooltip
          contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
          formatter={(v) => [`${v} Ton/hr`, 'Production']}
        />
        <Line type="monotone" dataKey="value" stroke="#1565C0" strokeWidth={3} dot={{ r: 4, fill: '#1565C0' }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ProductionChart;
