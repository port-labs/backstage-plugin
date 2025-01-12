import { InfoCard } from '@backstage/core-components';
import { Grid } from '@material-ui/core';
import React from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { ScorecardStats } from '../hooks/useInitiatives';

const COLORS = {
  Gold: '#FFA500',
  Silver: '#808080',
  Bronze: '#eba763',
  default: '#CCCCCC',
};

type InitiativesChartsProps = {
  stats: ScorecardStats[];
};

export function InitiativesCharts({ stats }: InitiativesChartsProps) {
  return (
    <Grid container spacing={3}>
      {stats.map(stat => (
        <Grid item xs={12} md={6} key={stat.name}>
          <InfoCard title={stat.name}>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={Object.entries(stat.levels).map(([name, value]) => ({
                      name,
                      value,
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {Object.entries(stat.levels).map(([name]) => (
                      <Cell
                        key={name}
                        fill={
                          COLORS[name as keyof typeof COLORS] ?? COLORS.default
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </InfoCard>
        </Grid>
      ))}
    </Grid>
  );
}
