import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { devDailyPluginPlugin, DevDailyPluginPage } from '../src/plugin';

createDevApp()
  .registerPlugin(devDailyPluginPlugin)
  .addPage({
    element: <DevDailyPluginPage />,
    title: 'Root Page',
    path: '/dev-daily-plugin',
  })
  .render();
