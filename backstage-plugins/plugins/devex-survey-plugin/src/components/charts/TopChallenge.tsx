import { InfoCard } from '@backstage/core-components';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import { SurveyResult } from '../../pages/admin';

type Props = {
  results: SurveyResult[];
};

const useStyles = makeStyles(theme => ({
  highlight: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  category: {
    marginBottom: theme.spacing(2),
  },
  specific: {
    marginTop: theme.spacing(1),
  },
}));

export const TopChallenge = ({ results }: Props) => {
  const classes = useStyles();

  const { topCategory, topSpecificChallenge } = React.useMemo(() => {
    if (results.length === 0) {
      return {
        topCategory: null,
        topSpecificChallenge: null,
      };
    }
    // Count primary blockers
    const categoryCount = results.reduce((acc, curr) => {
      acc[curr.primary_blocker] = (acc[curr.primary_blocker] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Find the most common category
    const topCategory = Object.entries(categoryCount).reduce((a, b) =>
      a[1] > b[1] ? a : b,
    );

    const topCategoryKey = `${topCategory[0]}_challenges`;
    const allChallenges = results.reduce((acc, curr) => {
      if (!(topCategoryKey in curr)) {
        return acc;
      }

      const challenge =
        curr[topCategoryKey as keyof Omit<SurveyResult, 'last_updated'>];
      acc[challenge] = (acc[challenge] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topSpecificChallenge = Object.entries(allChallenges).reduce((a, b) =>
      a[1] > b[1] ? a : b,
    );

    return {
      topCategory: {
        name: topCategory[0].replace(/_/g, ' '),
        count: topCategory[1],
        total: results.length,
      },
      topSpecificChallenge: {
        name: topSpecificChallenge[0]?.replace(/_/g, ' ') ?? '',
        count: topSpecificChallenge[1],
        total: results.length,
      },
    };
  }, [results]);

  if (!topCategory || !topSpecificChallenge) {
    return null;
  }

  return (
    <InfoCard title="Top Developer Challenge">
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={6} className={classes.category}>
          <Typography variant="h6">Most Common Challenge Area:</Typography>
          <Typography variant="h4" className={classes.highlight}>
            {topCategory.name}
          </Typography>
          <Typography variant="body1">
            {topCategory.count} out of {topCategory.total} respondents (
            {Math.round((topCategory.count / topCategory.total) * 100)}%)
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.specific}>
          <Typography variant="h6">
            Top Challenge inside {topCategory.name}:
          </Typography>
          <Typography variant="h4" className={classes.highlight}>
            {topSpecificChallenge.name}
          </Typography>
          <Typography variant="body1">
            {topSpecificChallenge.count} out of {topSpecificChallenge.total}{' '}
            respondents (
            {Math.round(
              (topSpecificChallenge.count / topSpecificChallenge.total) * 100,
            )}
            %)
          </Typography>
        </Grid>
      </Grid>
    </InfoCard>
  );
};
