import { createDevApp } from '@backstage/dev-utils';
import React from 'react';
import { devtoolsPlugin } from '../src/plugin';

createDevApp()
  .registerPlugin(devtoolsPlugin)
  .addPage({
    element: <div>DevTools Plugin</div>,
    title: 'Root Page',
    path: '/devtools-plugin',
  })
  .render();
