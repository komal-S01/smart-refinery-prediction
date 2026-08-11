import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { equipmentEfficiencyData } from '../../services/api';

const COLORS = ['#1565C0', '#1976D2', '#1E88E5', '#2196F3', '#42A5F5', '#64B5F6'];

function EquipmentChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={equipmentEfficiencyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
        <XAxis dataKey="unit" tick={{ fontSize: 11, fill: '#5A6578' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#5A6578' }} axisLine={false} tickLine={false} domain={[80, 100]} unit="%" />
        <Tooltip
          contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
          formatter={(v) => [`${v}%`, 'Efficiency']}
        />
        <Bar dataKey="efficiency" radius={[6, 6, 0, 0]} barSize={36}>
          {equipmentEfficiencyData.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default EquipmentChart;
