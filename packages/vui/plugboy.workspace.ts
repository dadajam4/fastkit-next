import { defineWorkspaceConfig, DTSNormalizeTarget } from '@fastkit/plugboy';

const toDTSNormalizeTarget = (typeName: string): DTSNormalizeTarget => {
  return {
    from: new RegExp(`"__${typeName}__"`, 'g'),
    typeName,
  };
};

const toDTSNormalizeTargets = (typeNames: string[]): DTSNormalizeTarget[] =>
  typeNames.map(toDTSNormalizeTarget);

export default defineWorkspaceConfig({
  entries: {
    '.': {
      src: './src/index.ts',
      css: true,
    },
  },
  dtsNormalize: [
    {
      targets: toDTSNormalizeTargets([
        'ThemeName',
        'PaletteName',
        'ScopeName',
        'ColorVariant',
      ]),
      pkg: '@fastkit/color-scheme',
    },
    {
      targets: toDTSNormalizeTargets(['MediaMatchKey']),
      pkg: '@fastkit/media-match',
    },
    {
      targets: toDTSNormalizeTargets(['IconName']),
      pkg: '@fastkit/icon-font',
    },
  ],
});
