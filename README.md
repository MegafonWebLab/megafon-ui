# megafon-ui

React UI components library.

[![codecov](https://codecov.io/gh/MegafonWebLab/megafon-ui/branch/master/graph/badge.svg)](https://codecov.io/gh/MegafonWebLab/megafon-ui)
[![Build Status](https://travis-ci.org/MegafonWebLab/megafon-ui.svg?branch=master)](https://travis-ci.org/MegafonWebLab/megafon-ui)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

Includes:
- ui-core 
[![npm (scoped)](https://img.shields.io/npm/v/@megafon/ui-core.svg)](https://www.npmjs.com/package/@megafon/ui-core)

- ui-shared 
[![npm (scoped)](https://img.shields.io/npm/v/@megafon/ui-shared.svg)](https://www.npmjs.com/package/@megafon/ui-shared)

---

## Development notes

## Getting Started

```bash
npm install -g lerna
```

## Install all packages

```bash
yarn
```

## Build all packages

```bash
yarn run build
```

## Update package versions

```bash
yarn run bump-version
```

Will make next steps:
- ask for a new version of each changed package
- update all cross-dependencies

If you don't want to update all the packages, you can choose "custom version" and type current version.

## Release process

1. [Update package versions.](#update-package-versions)
2. Commit changes.
3. Make git tag on commit with updated version.

    <details>
    <summary>Tag format</summary>
    
    - For one updated package: `<package-name>@<new-version>`, for ex. `ui-shared@1.0.1`
    - For a few updated packages: `<package-name1>@<new-version1>/<package-name2>@<new-version2>`, for ex. `ui-core@2.0.0/ui-shared@1.0.1`
    
    </details>

4. Push commit and tags to the remote.

TravisCI will publish packages to NPM after successful build. 
