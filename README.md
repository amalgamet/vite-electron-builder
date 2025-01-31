# Vite Electron Builder Boilerplate v2 (React)

[![GitHub issues by-label](https://img.shields.io/github/issues/amalgamet/vite-electron-builder/help%20wanted?label=issues%20need%20help&logo=github)](https://github.com/amalgamet/vite-electron-builder/issues?q=label%3A%22help+wanted%22+is%3Aopen+is%3Aissue)
[![Minimal node version](https://img.shields.io/static/v1?label=node&message=%3E=14.16&logo=node.js&color)](https://nodejs.org/about/releases/)
[![Minimal npm version](https://img.shields.io/static/v1?label=npm&message=%3E=7.7&logo=npm&color)](https://github.com/npm/cli/releases)

> Vite + Electron = 🔥

This is a secure template for [Electron] applications based on the latest security requirements, recommendations and
best practices.

Under the hood an insanely fast next-gen bundler [Vite] is used for both development and production bundling, along with
[`electron-builder`][electron-builder] for compilation.

### Support

- This template is forked from [Vite Electron Builder][cawa-93-repo], maintained by [Alex
  Kozack][cawa-93-github]. You can [💖 sponsor him][cawa-93-sponsor] for continued development of this template.

- Found a problem? Pull requests are welcome.

- If you have ideas, questions or suggestions - **Welcome to
  [discussions](https://github.com/cawa-93/vite-electron-builder/discussions)**. 😊

## Get started

Follow these steps to get started with this template:

1. Click the **[Use this template](https://github.com/amalgamet/vite-electron-builder/generate)** button (you must be
   logged in) or just clone this repo.
2. If you want use another package manager don't forget to edit relevant [`.github/workflows`](/.github/workflows) --
   they use `npm` by default.

That's all you need. 😉

**Note**: This template uses NPM v7, and as such
[**installs `peerDependencies` automatically**](https://github.com/npm/rfcs/blob/latest/implemented/0025-install-peer-deps.md).
If you are using a different package manager, you may need to install your `peerDependencies` manually.

## Features

### Electron [![Electron version](https://img.shields.io/github/package-json/dependency-version/amalgamet/vite-electron-builder/dev/electron?label=%20)][electron]

- Template use the latest electron version with all the latest security patches.
- The architecture of the application is built according to the security
  [guids](https://www.electronjs.org/docs/tutorial/security) and best practices.
- The latest version of the [electron-builder] is used to compile the application.

### Vite [![Vite version](https://img.shields.io/github/package-json/dependency-version/amalgamet/vite-electron-builder/dev/vite?label=%20)][vite]

- [Vite] is used to bundle all source code. This is an extremely fast bundler with several great features. You
  can learn more about how it is arranged in [this](https://youtu.be/xXrhg26VCSc) video.
- Vite supports [reading `.env` files](https://vitejs.dev/guide/env-and-mode.html). This template has a separate command
  to generate type declaration files with your environment variables.

[See all Vite features](https://vitejs.dev/guide/features.html).

### TypeScript [![TypeScript version](https://img.shields.io/github/package-json/dependency-version/amalgamet/vite-electron-builder/dev/typescript?label=%20)][typescript] (optional)

- The Latest TypeScript is used for all source code.
- **Vite** supports TypeScript out of the box. However, it does not support type checking.
- Code formatting rules follow the latest TypeScript recommendations and best practices thanks to
  [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin).

**[See this discussion](https://github.com/cawa-93/vite-electron-builder/discussions/339)** if you want completly remove
TypeScript.

### React [![React version](https://img.shields.io/github/package-json/dependency-version/amalgamet/vite-electron-builder/react?label=%20)][react] (optional)

- By default, web pages are built using [React]. However, you can easily change it. Or do not use additional frameworks
  at all. (See [the original repository](https://github.com/cawa-93/vite-electron-builder) for a Vue example)
- Code formatting rules adhere to the default [Prettier] config.
- Installed
  [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
  with React 17 support.

### Continuous Integration

There are a few Github Action workflows triggered against PRs or pushes to the `main` branch.

- Check types for main, preload, and renderer code
- Lint all codecode
- Run automated tests with [spectron]
  - Has the main window been created, and is it visible?
  - Is the main window not empty?
  - Is devtools closed?

### Continuous delivery

- The [`release`](.github/workflows/release.yml) workflow is triggered on every push to the `main` branch. This workflow creates a release draft.
  - The version is automatically set based on the current date in the format "yy.mm.dd".
  - Notes are automatically generated and added to the release draft.
  - Code signing supported. See the [`compile` job in the `release` workflow](.github/workflows/release.yml).
- **Auto-update is supported**. After a new release is published, all client applications will download the new
  version and install updates silently.

## Status

This template was created to make my work easier. It may not be universal, but I try to keep it that way.

I am actively involved in its development, but I do not guarantee that this template will be maintained in the future.

**At the moment, there are the following problems:**

- ⚠ Some files require refactoring.
- ⚠ Release notes are created automatically based on commit history.
  [`.github/actions/release-notes`](.github/actions/release-notes) is used for generation. It may not provide some
  scenarios. If you encounter a problem - write about it.
- ⏳ I want to migrate all code base to ESM. But because Nodejs ecosystem is unprepared I have not known whether this
  will give more benefits or more inconvenience.

Some improvement or problems can be listed in [issues](https://github.com/amalgamet/vite-electron-builder/issues).

**Pull requests are welcome**.

## How it works

Run `npm install` to get all the dependencies.

### Project Structure

The structure of this template is very similar to the structure of a monorepo.

The entire source code of the program is divided into three modules (packages) that are bundled each independently:

- [`packages/main`](packages/main) Electron
  [**main script**](https://www.electronjs.org/docs/tutorial/quick-start#create-the-main-script-file).
- [`packages/preload`](packages/preload) Used in `BrowserWindow.webPreferences.preload`. See
  [Checklist: Security Recommendations](https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content).
- [`packages/renderer`](packages/renderer) Electron
  [**web page**](https://www.electronjs.org/docs/tutorial/quick-start#create-a-web-page).

### Build web resources

The `main` and `preload` modules are built in [library mode](https://vitejs.dev/guide/build.html#library-mode) they are simple Node.js-based, well, libraries. The `renderer` module is built as full-fledged web app.

Building production web resources is handled by [`scripts/build.js`](scripts/build.js), which calls `vite build` sequentially for each package.

### Compile App

[electron-builder] will package and compile a distribution for your desired target platforms (macOS, Windows, and Linux). Auto-update support is included out-of-the-box.

To do this, using the [electron-builder]:

- `npm run compile`: This script is configured to compile the application as quickly as possible. It is not ready
  for distribution, is compiled only for the current platform and is used for debugging.
- In GitHub Action: The application is compiled for any platform and ready-to-distribute files are automatically added
  to the draft GitHub release.

### Using Node.js API in renderer

According to
[Electron's security guidelines](https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content),
Node.js integration should be disabled for any views that render remote content. This means that **you cannot call any
Node.js api in the `packages/renderer` code directly**. To do this, you **must** describe the interface in the
`packages/preload` where Node.js api is allowed:

```ts
// packages/preload/src/index.ts
import { readFile } from 'fs/promises';

const api = {
  readConfig: () => readFile('/path/to/config.json', { encoding: 'utf-8' }),
};

contextBridge.exposeInMainWorld('electron', api);
```

```ts
// packages/renderer/src/App.tsx
import { useElectron } from '/@/use/electron';

const { readConfig } = useElectron();
```

[Read more about Security Considerations](https://www.electronjs.org/docs/tutorial/context-isolation#security-considerations).

**Note**: Context isolation disabled for `test` environment. See
[#693](https://github.com/electron-userland/spectron/issues/693#issuecomment-747872160).

### Modes and Environment Variables

All environment variables set as part of the `import.meta`, so you can access them as follows: `import.meta.env`.

You can also build type definitions of your variables by running `scripts/buildEnvTypes.js`. This command will create
`types/env.d.ts` file with describing all environment variables for all modes.

The mode option is used to specify the value of `import.meta.env.MODE` and the corresponding environment variables files
that needs to be loaded.

By default, there are two modes:

- `production` is used by default
- `development` is used by `npm run watch` script
- `test` is used by `npm test` script

When running building, environment variables are loaded from the following files in your project root:

```
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified env mode
.env.[mode].local   # only loaded in specified env mode, ignored by git
```

**Note:** only variables prefixed with `VITE_` are exposed to your code (e.g. `VITE_SOME_KEY=123`) and `SOME_KEY=123`
will not. you can access `VITE_SOME_KEY` using `import.meta.env.VITE_SOME_KEY`. This is because the `.env` files may be
used by some users for server-side or build scripts and may contain sensitive information that should not be exposed in
code shipped to browsers.

## Contribution

See [Contributing Guide](contributing.md).

[vite]: https://github.com/vitejs/vite/
[electron]: https://github.com/electron/electron
[electron-builder]: https://github.com/electron-userland/electron-builder
[react]: https://github.com/facebook/react
[prettier]: https://github.com/prettier/prettier
[typescript]: https://github.com/microsoft/TypeScript/
[spectron]: https://github.com/electron-userland/spectron
[cawa-93-repo]: https://github.com/cawa-93/vite-electron-builder
[cawa-93-github]: https://github.com/cawa-93/
[cawa-93-sponsor]: https://www.patreon.com/Kozack/
