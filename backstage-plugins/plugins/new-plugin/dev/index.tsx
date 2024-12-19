import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { newPluginPlugin, NewPluginPage } from '../src/plugin';

createDevApp()
  .registerPlugin(newPluginPlugin)
  .addPage({
    element: <NewPluginPage />,
    title: 'Root Page',
    path: '/new-plugin',
  })
  .render();
