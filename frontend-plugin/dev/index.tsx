/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// eslint-disable-next-line @backstage/no-undeclared-imports
import React from 'react';
import { EntityProvider } from '@backstage/plugin-catalog-react';
import { createDevApp } from '@backstage/dev-utils';
import { EntityTabPortContent, portPlugin } from '../src/plugin';
import { mockEntity } from './mockPortEntity';

createDevApp()
    .registerPlugin(portPlugin)
    .addPage({
        path: '/port',
        title: 'Port',
        element: (
            <EntityProvider entity={mockEntity}>
                <EntityTabPortContent annotation="getport.io/Jira_Project" />
            </EntityProvider>
        ),
    })
    .render();