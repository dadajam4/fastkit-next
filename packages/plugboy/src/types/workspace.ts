import type { Path } from '../path';
import { RequiredPackageJSON } from './_utils';
import type { PlugboyProject } from '../project';
import type { UserPluginOption, Plugin } from './plugin';
import type { UserHooks, BuildedHooks } from './hook';
import { Options as TSUpOptions } from 'tsup';
import { DTSNormalizeSettings, ResolvedDTSNormalizeSettings } from './dts';

export const WORKSPACE_REQUIRED_FIELDS = ['name', 'version'] as const;

type WorkspaceRequiredField = (typeof WORKSPACE_REQUIRED_FIELDS)[number];

export interface RawWorkspaceEntryObject {
  src: string;
  css?: boolean;
}

export type WorkspaceEntry = Required<RawWorkspaceEntryObject>;

export type RawWorkspaceEntry = string | RawWorkspaceEntryObject;

export type WorkspaceEntries = Record<string, WorkspaceEntry>;

export type RawWorkspaceEntries = Record<string, RawWorkspaceEntry>;

export const TSUP_SYNC_OPTIONS = [
  'define',
  'noExternal',
  'external',
  'replaceNodeEnv',
  'skipNodeModulesBundle',
] as const;

type TSUpSyncOption = (typeof TSUP_SYNC_OPTIONS)[number];

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TSUpSyncOptions extends Pick<TSUpOptions, TSUpSyncOption> {}

export interface UserWorkspaceConfig extends TSUpSyncOptions {
  ignoreProjectConfig?: boolean;
  entries?: RawWorkspaceEntries;
  hooks?: UserHooks;
  plugins?: UserPluginOption[];
  dtsNormalize?: DTSNormalizeSettings[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ResolvedWorkspaceConfig
  extends Required<
      Omit<
        UserWorkspaceConfig,
        'entries' | 'hooks' | 'plugins' | 'dtsNormalize' | TSUpSyncOption
      >
    >,
    TSUpSyncOptions {
  entries: WorkspaceEntries;
  hooks?: UserHooks;
  plugins: Plugin[];
  dtsNormalize: ResolvedDTSNormalizeSettings[];
}

export type WorkspacePackageJson = RequiredPackageJSON<WorkspaceRequiredField>;

export interface WorkspaceDirs {
  src: Path;
  dist: Path;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface WorkspaceMeta {}

export interface WorkspaceSetupContext {
  dir: Path;
  json: WorkspacePackageJson;
  config: ResolvedWorkspaceConfig;
  project: PlugboyProject | null;
  dirs: WorkspaceDirs;

  /**
   * All package names on which the workspace depends
   */
  dependencies: string[];

  /**
   * Names of all in-project packages on which the workspace depends
   */
  projectDependencies: string[];

  /**
   * Workspace Meta Info
   *
   * * This is intended to be extended by plug-ins.
   */
  meta: WorkspaceMeta;

  plugins: Plugin[];
  hooks: BuildedHooks;
}
