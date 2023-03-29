import { RequiredPackageJSON } from './_utils';
import type { CompilerOptions } from 'typescript';
import { WorkspacePackageJson } from './workspace';
import { UserPluginOption, Plugin } from './plugin';
import type { Path } from '../path';
import { UserHooks } from './hook';

export const PROJECT_REQUIRED_FIELDS = ['name'] as const;

type ProjectRequiredField = (typeof PROJECT_REQUIRED_FIELDS)[number];

export type TSConfigJSON = {
  compilerOptions?: CompilerOptions;
} & Record<string, any>;

export interface ProjectScriptsTemplate {
  name: string;
  scripts: Record<string, string>;
}

export interface UserProjectConfig {
  /**
   * xxx
   *
   * @default packages
   */
  workspacesDir?: string;
  scripts?: Record<string, string> | ProjectScriptsTemplate[];
  tsconfig?: TSConfigJSON;
  readme?: (json: WorkspacePackageJson) => string;

  /**
   * プロジェクト内の全てのピア依存関係のバージョンを固定します
   */
  peerDependencies?: Record<string, string>;
  hooks?: UserHooks;
  plugins?: UserPluginOption[];
}

export interface ResolvedProjectConfig
  extends Required<
    Omit<UserProjectConfig, 'scripts' | 'tsconfig' | 'hooks' | 'plugins'>
  > {
  scripts: ProjectScriptsTemplate[];
  tsconfig?: TSConfigJSON;
  hooks?: UserHooks;
  plugins: Plugin[];
}

export type ProjectPackageJson = RequiredPackageJSON<ProjectRequiredField>;

export interface ProjectSetupContext {
  dir: Path;
  json: ProjectPackageJson;
  config: ResolvedProjectConfig;
  resolvedWorkspaces: string[];
}
