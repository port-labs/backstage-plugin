import { Content } from '@backstage/core-components';
import { alertApiRef, useApi } from '@backstage/core-plugin-api';
import {
  LinearProgress,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { ApiHooks, portApiRef } from '@port-labs/backstage-plugin-framework';
import React, { useState } from 'react';
import { SurveyForm, SurveyFormData } from '../components/SurveyForm';
import { defaultSurvey } from '../config/defaultSurvey';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 800,
    margin: '0 auto',
    padding: theme.spacing(3),
    height: 'calc(100vh - 140px)',
  },
  message: {
    padding: theme.spacing(3),
  },
  progress: {
    marginTop: theme.spacing(2),
  },
}));

export const SurveyPage = () => {
  const classes = useStyles();
  const alertApi = useApi(alertApiRef);
  const portApi = useApi(portApiRef);
  const [userEmail, setUserEmail] = useState<string>('');

  const { data: existingSurveys, loading } = ApiHooks.useSearchQuery({
    combinator: 'and',
    rules: [
      {
        property: '$blueprint',
        operator: '=',
        value: 'survey_results',
      },
      {
        property: 'email',
        operator: '=',
        value: userEmail || '',
      },
    ],
  });

  React.useEffect(() => {
    const fetchUser = async () => {
      const user = await portApi.getUserInfo();
      if (user?.spec?.profile?.email) {
        setUserEmail(user.spec.profile.email);
      }
    };
    fetchUser();
  }, [portApi]);

  const [formData, setFormData] = useState<SurveyFormData>({
    primary_blocker: '',
    work_planning_challenges: '',
    development_process_challenges: '',
    shipping_features_challenges: '',
    managing_production_challenges: '',
    feedback: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const user = await portApi.getUserInfo();
      await portApi.createEntity('survey_results', {
        properties: {
          blocking_your_flow: formData.primary_blocker,
          work_planning_challenges: formData.work_planning_challenges,
          development_process_challenges:
            formData.development_process_challenges,
          shipping_features_challenges: formData.shipping_features_challenges,
          managing_production_challenges:
            formData.managing_production_challenges,
          other_feedback: formData.feedback || null,
          email: user?.spec?.profile?.email || '',
        },
      });

      alertApi.post({
        message: 'Thank you for your feedback!',
        severity: 'success',
      });
      setFormData({
        primary_blocker: '',
        work_planning_challenges: '',
        development_process_challenges: '',
        shipping_features_challenges: '',
        managing_production_challenges: '',
        feedback: '',
      });
    } catch (error) {
      alertApi.post({
        message: 'Failed to submit survey',
        severity: 'error',
      });
      console.error('Error submitting survey:', error);
    }
  };

  if (!userEmail || loading) {
    return (
      <Content>
        <Paper className={classes.root}>
          <Typography variant="body1" className={classes.message}>
            Loading survey...
          </Typography>
          <LinearProgress className={classes.progress} />
        </Paper>
      </Content>
    );
  }

  if (existingSurveys && existingSurveys.length > 0) {
    const lastSubmission = new Date(
      Math.max(
        ...existingSurveys.map(survey => new Date(survey.updatedAt).getTime()),
      ),
    );

    return (
      <Content>
        <Paper className={classes.root}>
          <Typography variant="h4" className={classes.message}>
            Survey Already Submitted
          </Typography>
          <Typography variant="body1" className={classes.message}>
            Thank you for your interest! You have already submitted the survey
            on {lastSubmission.toLocaleDateString()} at{' '}
            {lastSubmission.toLocaleTimeString()}.
          </Typography>
          <Typography variant="body2" className={classes.message}>
            We appreciate your feedback and will use it to improve our developer
            experience.
          </Typography>
        </Paper>
      </Content>
    );
  }

  return (
    <Content>
      <Paper className={classes.root}>
        <SurveyForm
          survey={defaultSurvey}
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </Paper>
    </Content>
  );
};
