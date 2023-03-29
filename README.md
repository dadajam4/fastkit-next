# Fastkit

## Set Up Your Local Development Environment

To contribute to Fastkit, you need to set up a local environment.

1. [Fork](https://help.github.com/articles/fork-a-repo/) the [@dadajam4/fastkit repository](https://github.com/dadajam4/fastkit-next) to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.

1. Ensure using the latest Node.js (18.x)

1. Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` to have `pnpm` and `yarn`

1. Run `pnpm install` to install the dependencies.

    > If you are adding a dependency, please use `pnpm add`. The `pnpm-lock.yaml` file is the source of truth for all Nuxt dependencies.

1. Run `pnpm build:stub` to activate the passive development system

1. Check out a branch where you can work and commit your changes:

```bash
git checkout -b my-new-branch
```
