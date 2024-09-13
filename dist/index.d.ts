import * as react from 'react';
import * as _backstage_core_plugin_api from '@backstage/core-plugin-api';

declare const portPlugin: _backstage_core_plugin_api.BackstagePlugin<{
    root: _backstage_core_plugin_api.RouteRef<undefined>;
}, {}, {}>;
declare const EntityTabPortContent: (props: {
    annotation: string;
}) => react.JSX.Element;
declare const HomePage: () => react.JSX.Element;

export { EntityTabPortContent, HomePage, portPlugin };
