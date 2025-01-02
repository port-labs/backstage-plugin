import { Content, Header, Page } from '@backstage/core-components';
import { alertApiRef, useApi } from '@backstage/core-plugin-api';
import { makeStyles, Paper } from '@material-ui/core';
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
}));

export const SurveyPage = () => {
  const classes = useStyles();
  const alertApi = useApi(alertApiRef);
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
      // TODO: Implement API call to save survey data
      console.log('Survey submitted:', formData);
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

  return (
    <Page themeId="tool">
      <Header title="Developer Experience Survey" />
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
    </Page>
  );
};
