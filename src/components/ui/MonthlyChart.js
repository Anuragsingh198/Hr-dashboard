'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { generateMonthlyStats } from '@/lib/utils';

const data = generateMonthlyStats();

export default function MonthlyTrendChart() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Monthly Trends</h3>
      <div className="h-80 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" orientation="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--background)', 
                borderColor: 'var(--border)',
                color: 'var(--foreground)'
              }} 
            />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="bookmarks" 
              name="Bookmarks" 
              stroke="hsl(var(--chart-1))" 
              activeDot={{ r: 8 }} 
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="promotions" 
              name="Promotions" 
              stroke="hsl(var(--chart-2))" 
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="avgRating" 
              name="Avg. Rating" 
              stroke="hsl(var(--chart-3))" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}