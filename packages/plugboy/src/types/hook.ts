import type { Listable } from '../utils';
import { WorkspaceSetupContext, WorkspacePackageJson } from './workspace';
import type { PlugboyWorkspace } from '../workspace';

export interface HookTypes {
  setupWorkspace: (ctx: WorkspaceSetupContext) => any;
  createWorkspace: (workspace: PlugboyWorkspace) => any;
  preparePackageJSON: (
    json: WorkspacePackageJson,
    workspace: PlugboyWorkspace,
  ) => any;
}

export function createHooksDefaults(): ResolvedHooks {
  return {
    setupWorkspace: [],
    createWorkspace: [],
    preparePackageJSON: [],
  };
}

export type HookName = keyof HookTypes;

export type UserHooks = {
  [Name in HookName]?: Listable<HookTypes[Name]>;
};

export type ResolvedHooks = {
  [Name in HookName]: HookTypes[Name][];
};

export type HookArgs<Name extends HookName> = Parameters<HookTypes[Name]>;

export type UnPromisify<T> = T extends Promise<infer U> ? U : T;

export type HookReturnType<Name extends HookName> = UnPromisify<
  ReturnType<HookTypes[Name]>
>;

export type BuildedHooks = {
  [Name in HookName]: (
    ...args: HookArgs<Name>
  ) => Promise<HookReturnType<Name>>;
};
