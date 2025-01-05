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
import { SurveyResult } from '../../pages/admin';

type Props = {
  results: SurveyResult[];
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF99CC'];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {value}
    </text>
  );
};

const ChallengePieChart = ({
  title,
  data,
}: {
  title: string;
  data: { name: string; value: number }[];
}) => (
  <InfoCard title={title}>
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={renderCustomizedLabel}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </InfoCard>
);

export const ChallengesDetails = ({ results }: Props) => {
  const workPlanningData = React.useMemo(() => {
    const counts = results.reduce((acc, curr) => {
      acc[curr.work_planning_challenges] =
        (acc[curr.work_planning_challenges] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([key, value]) => ({
      name: key.replace(/_/g, ' '),
      value,
    }));
  }, [results]);

  const developmentProcessData = React.useMemo(() => {
    const counts = results.reduce((acc, curr) => {
      acc[curr.development_process_challenges] =
        (acc[curr.development_process_challenges] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([key, value]) => ({
      name: key.replace(/_/g, ' '),
      value,
    }));
  }, [results]);

  const shippingFeaturesData = React.useMemo(() => {
    const counts = results.reduce((acc, curr) => {
      acc[curr.shipping_features_challenges] =
        (acc[curr.shipping_features_challenges] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([key, value]) => ({
      name: key.replace(/_/g, ' '),
      value,
    }));
  }, [results]);

  const productionChallengesData = React.useMemo(() => {
    const counts = results.reduce((acc, curr) => {
      acc[curr.managing_production_challenges] =
        (acc[curr.managing_production_challenges] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([key, value]) => ({
      name: key.replace(/_/g, ' '),
      value,
    }));
  }, [results]);

  return (
    <Grid container spacing={3}>
      <Grid item md={6} xs={12}>
        <ChallengePieChart
          title="Work Planning Challenges"
          data={workPlanningData}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <ChallengePieChart
          title="Development Process Challenges"
          data={developmentProcessData}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <ChallengePieChart
          title="Shipping Features Challenges"
          data={shippingFeaturesData}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <ChallengePieChart
          title="Production Management Challenges"
          data={productionChallengesData}
        />
      </Grid>
    </Grid>
  );
};
