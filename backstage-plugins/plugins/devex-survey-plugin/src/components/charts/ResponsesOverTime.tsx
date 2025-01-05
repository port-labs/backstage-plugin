import { InfoCard } from '@backstage/core-components';
import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { SurveyResult } from '../../pages/admin';

type Props = {
  results: SurveyResult[];
};

export const ResponsesOverTime = ({ results }: Props) => {
  const data = React.useMemo(() => {
    // Group responses by date
    const responsesByDate = results.reduce((acc, curr) => {
      const date = curr.last_updated.toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Convert to array and sort by date
    const sortedData = Object.entries(responsesByDate)
      .map(([date, count]) => ({
        date,
        responses: count,
        total: 0, // Will be calculated next
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Calculate running total
    let runningTotal = 0;
    return sortedData.map(item => ({
      ...item,
      total: (runningTotal += item.responses),
    }));
  }, [results]);

  return (
    <InfoCard title="Responses Over Time">
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="responses"
              stroke="#8884d8"
              name="Daily Responses"
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#82ca9d"
              name="Total Responses"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </InfoCard>
  );
};
