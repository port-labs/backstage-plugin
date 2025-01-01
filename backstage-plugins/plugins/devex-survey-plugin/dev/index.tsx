import { createDevApp } from '@backstage/dev-utils';
import React from 'react';
import { devexSurveyPlugin } from '../src/plugin';

createDevApp()
  .registerPlugin(devexSurveyPlugin)
  .addPage({
    element: <div>Devex Survey Plugin</div>,
    title: 'Root Page',
    path: '/devex-survey-plugin',
  })
  .render();
