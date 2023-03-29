import { definePlugin, findFile } from '@fastkit/plugboy';
import { ESBuildVanillaExtract } from './esbuild';
import { VanillaExtractPlugin, PluginOptions, PLUGIN_NAME } from './types';

declare module '@fastkit/plugboy' {
  export interface WorkspaceMeta {
    hasVanillaExtract: boolean;
  }
}

export async function createVanillaExtractPlugin(options: PluginOptions = {}) {
  return definePlugin<VanillaExtractPlugin>({
    name: PLUGIN_NAME,
    options,
    hooks: {
      async setupWorkspace(ctx) {
        const { external = [] } = ctx.config;

        ctx.config.external = [...external, /@vanilla\-extract/];

        ctx.meta.hasVanillaExtract = await !!findFile(
          ctx.dirs.src.value,
          /\.css\.ts$/,
        );
      },
    },
    esbuildPlugins: [
      (workspace) => {
        if (!workspace.meta.hasVanillaExtract) return;
        return ESBuildVanillaExtract(options);
      },
    ],
  });
}
