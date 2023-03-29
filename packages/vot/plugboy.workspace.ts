import { defineWorkspaceConfig } from '@fastkit/plugboy';

export default defineWorkspaceConfig({
  entries: {
    '.': './src/index.ts',
    tool: './src/tool/index.ts',
  },
  external: ['virtual:generated-pages', /^\@fastkit\/vot/],
});
