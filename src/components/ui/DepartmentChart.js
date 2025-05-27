'use client';

import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { generateDepartmentStats } from '@/lib/utils';

const data = generateDepartmentStats();

export default function DepartmentChart() {
  const [activeBar, setActiveBar] = useState('avgRating');

  const handleLegendClick = (dataKey) => {
    setActiveBar(dataKey);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Department Performance</h3>
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-3 py-1.5 text-sm rounded-full ${
            activeBar === 'avgRating' 
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          }`}
          onClick={() => handleLegendClick('avgRating')}
        >
          Avg. Rating
        </button>
        <button
          className={`px-3 py-1.5 text-sm rounded-full ${
            activeBar === 'employeeCount' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          }`}
          onClick={() => handleLegendClick('employeeCount')}
        >
          Employee Count
        </button>
        <button
          className={`px-3 py-1.5 text-sm rounded-full ${
            activeBar === 'bookmarkCount' 
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' 
              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          }`}
          onClick={() => handleLegendClick('bookmarkCount')}
        >
          Bookmarks
        </button>
      </div>

      <div className="h-80 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 70 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="department" 
              angle={-45} 
              textAnchor="end" 
              height={70}
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--background)', 
                borderColor: 'var(--border)',
                color: 'var(--foreground)'
              }} 
            />
            <Legend />
            {activeBar === 'avgRating' && (
              <Bar 
                dataKey="avgRating" 
                name="Average Rating" 
                fill="hsl(var(--chart-1))" 
                radius={[4, 4, 0, 0]} 
              />
            )}
            {activeBar === 'employeeCount' && (
              <Bar 
                dataKey="employeeCount" 
                name="Employee Count" 
                fill="hsl(var(--chart-2))" 
                radius={[4, 4, 0, 0]} 
              />
            )}
            {activeBar === 'bookmarkCount' && (
              <Bar 
                dataKey="bookmarkCount" 
                name="Bookmarks" 
                fill="hsl(var(--chart-3))" 
                radius={[4, 4, 0, 0]} 
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}