# megafon-ui

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
 
 If you don't want to update some package, you can choose "custom version" and type current version.
