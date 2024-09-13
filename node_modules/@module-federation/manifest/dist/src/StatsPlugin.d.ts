import { Compiler, WebpackPluginInstance } from 'webpack';
import { moduleFederationPlugin } from '@module-federation/sdk';
export declare class StatsPlugin implements WebpackPluginInstance {
    readonly name = "StatsPlugin";
    private _options;
    private _statsManager;
    private _manifestManager;
    private _enable;
    private _bundler;
    constructor(options: moduleFederationPlugin.ModuleFederationPluginOptions, { pluginVersion, bundler, }: {
        pluginVersion: string;
        bundler: 'webpack' | 'rspack';
    });
    apply(compiler: Compiler): void;
}
