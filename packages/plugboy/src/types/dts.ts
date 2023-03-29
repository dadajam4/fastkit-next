export interface DTSNormalizeTarget {
  from: string | RegExp;
  typeName: string;
}

export interface ResolvedDTSNormalizeTarget
  extends Omit<DTSNormalizeTarget, 'from'> {
  from: RegExp;
}

export function resolveDTSNormalizeTarget(
  target: DTSNormalizeTarget,
): ResolvedDTSNormalizeTarget {
  const { from, typeName } = target;
  return {
    from: typeof from === 'string' ? new RegExp(`${from}`, 'g') : from,
    typeName,
  };
}

export interface DTSNormalizeSettings {
  pkg?: string;
  targets: DTSNormalizeTarget[];
}

export interface ResolvedDTSNormalizeSettings
  extends Omit<DTSNormalizeSettings, 'targets'> {
  targets: ResolvedDTSNormalizeTarget[];
}

export function resolveDTSNormalizeSettings(
  settings: DTSNormalizeSettings,
): ResolvedDTSNormalizeSettings {
  return {
    ...settings,
    targets: settings.targets.map(resolveDTSNormalizeTarget),
  };
}
