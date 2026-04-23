import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface ChartData {
  fileName: string;
  downloadCount: number;
  uuid: string;
}

interface DownloadChartProps {
  data: ChartData[];
}

const COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
  '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1',
];

export const DownloadChart: React.FC<DownloadChartProps> = ({ data }) => {
  const formattedData = data.map((item, index) => ({
    ...item,
    shortName: item.fileName.length > 15
      ? item.fileName.substring(0, 12) + '...'
      : item.fileName,
    color: COLORS[index % COLORS.length],
  }));

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 text-slate-400">
        No download data available yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={formattedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis
          dataKey="shortName"
          angle={-45}
          textAnchor="end"
          height={60}
          interval={0}
          tick={{ fontSize: 12, fill: '#94A3B8' }}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fill: '#94A3B8' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1E293B',
            border: '1px solid #334155',
            borderRadius: '8px',
            color: '#F1F5F9',
          }}
          formatter={(value) => [`${value} downloads`, 'Count']}
          labelFormatter={(label) => `File: ${label}`}
        />
        <Bar dataKey="downloadCount" radius={[4, 4, 0, 0]}>
          {formattedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};