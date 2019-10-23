# Architecture

`megafon-ui` is a monorepository managed with [Lerna](https://github.com/lerna/lerna).

`packages` directory includes several library parts which are
the separated `npm` modules with independent versions.

Root `package.json` defines scripts for proxying execution of commands in every package.
For example, script `lerna run build` (or `yarn run build` in
root folder) runs `yarn run build` inside every directory in `packages` folder.

# Development

For contributing to `megafon-ui` library you need to create your own fork of the main repository.
After making some changes you should create pull request with appropriate description.

We use TypeScript for development. All components are based on classes.

Every component's directory should include:

1. File `<Component name>.tsx` with component class.
2. File `<Component name>.less` for styles.
3. File `<Component name>.test.tsx` with tests. Events should be tested with mocks,
whereas snapshots should be used for visual representations.
4. File `<Component name>.mdx` for documentation in [Docz](https://github.com/doczjs/docz) format.
Such documentation is available only for `ui-core` module for a now.

Examples of components can be found [here](https://github.com/MegafonWebLab/megafon-ui/tree/master/packages/ui-core/src).

Special function `cn` should be created before every component's class declaration.
This function generates css-classes in BEM-format for component's elements.
The name of component in css should be prefixed with `mfui-`. This name should be
passed to the function for `cn` creation.

For example:

```
const cn = cnCreate('mfui-button');
```

Interfaces `IComponentNameProps` and `IComponentNameState` should be declared before
component class in case component has incoming props or internal state.
Interface with props should be exported.

For example:

```
export interface IButtonProps {
    /** Link */
    href?: string | null;
    /** Click event handler */
    onClick?(e: React.SyntheticEvent<EventTarget>): void;
}

interface IButtonState {
    isTouch: boolean;
}
```

Tests and code linting checks can be executed with commands:

```bash
$ yarn run lint
```

```bash
$ yarn run test
```

# Release process

Before starting release process you need to build project:

```bash
$ yarn run build
```

To make a new release of all changed packages you need to run:

```bash
$ yarn run release
```

This script prompts for a new version of each changed package.

After confirm script does the following:

- updates cross-dependencies
- makes commit with publish info
- creates git tags for each updated package
- pushes all of that to git

TravisCI will publish packages to NPM after successful build.
