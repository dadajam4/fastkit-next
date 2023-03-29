import { PackageJson } from 'pkg-types';

export type RequiredPackageJSON<Field extends string> = PackageJson &
  Required<Pick<PackageJson, Field>>;
