# Contributing

`megafon-ui` - is a monorepository managed with [Lerna](https://github.com/lerna/lerna).

`packages` directory includes several library parts that are separate `npm` modules with independent versions.

Root `package.json` defines scripts for proxying execution of commands in every package. For example, script
`lerna run build` (or `yarn run build` in root folder) runs `yarn run build` inside every directory under `packages`
directory.

# Development

## Basics

To contribute to `megafon-ui` you need to create your own fork of this repository. After making changes, you create pull
request with appropriate description.

Local development require `node 12+` and `yarn`.

- Install dependencies:

```bash
yarn install
```

- Run documentation:

```bash
yarn run demo
```

## Add component

For development `typeScript` is used. All components are based on functions. Parameters by default set in
destructuration in component arguments.

```jsx
const ComponentName = ({ name = 'name' }) => ...
```

For every component a directory is created with:

1. `<Component name>.tsx` with components
2. `<Component name>.less` for styles
3. `<Component name>.test.tsx` for tests. All props should be tested: callbacks with mocks, other props with snapshots.
4. `doc` directory, include documentation in format [Docz](https://github.com/doczjs/docz):
    - `<Component name>.mdx` - root page documentation for components, should include component DoczTabs
    - `<Component name>.example.mdx` - file with examples how to use component
    - `<Component name>.props.mdx` - table with props
    - `<Component name>.design.mdx` - design documentation
    - `<Component name>.docz.tsx` - source for examples, by example for wrappers and styles

Tests and code linting checks can be executed with commands:

```bash
$ yarn run lint
```

```bash
$ yarn run test
```

Tests and code linting are also run via git hooks before committing.

Before running tests `yarn run build` needs to be executed otherwise there will be a problem with dependencies between
packages.

## How to commit

Project uses [conventional commits](https://www.conventionalcommits.org/ru/v1.0.0-beta.4/). A more applied description
can be found [here](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format).

A commit message has to describe:

- **type**, level of change (i.e. feat, fix, ci or docs);
- **scope** of changes (i.e. component);
- **description** of changes to be in changelog.

*Example of types by semver:*

```
patch: fix(button): new prop onClick
minor: feat(incredible-component): added new component
major:

feat(button): deprecated onClick prop removed

BREAKING CHANGE: onClick prop removed
```

To simplify the creation of commits, a `commitizen` has been added so you can do it like this:

```bash
$ git add .
$ git cz
```

`cz` starts a wizard that will guide you through the steps to create a valid message.

If something goes wrong with commit (i.e. linter fails), you can retry command `git cz --retry`.

### Commit types

Main types are `fix` and `feat` for patch and minor changes. They are used in 99% cases. Others can be found in
[angular documentation](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format).
Breaking changes may appear under any type. When BC commits are merged new major version gets released. That's a very
rare case.

### What changelog consists of

Commit messages with type `feat`, `fix`, `perf`, and all commits marked as `breaking change` with any type will be
included in the changelog.

### Adding commits to an existing branch

If branch already has a commit with type that gets recorded in the changelog, new commits can be added with type
`refactor` not to be included in the changelog.

## Review

All changes in pull requests must be checked to reflect the commit messages. When it's not the case the pull request is
to be returned to the contributor.

Close attention must be paid to `breaking changes` commit messages. Github interface may not show these messages without
clicking on `...` to expand the commit message.

## Package Publishing

Publishing is executed automatically when a commit is pushed to the `master` branch. `Lerna` uses commit messages to
determine next release version, generates changelog and publishes a new version to the registry.

### How to skip publishing

In order to skip package publishing **the latest commit** must contain `skip release` in its message. When branch should
not trigger publishing on merge, `skip release` can be written in commit message in `github` ui.

These changes will be released when a new commit without `skip release` in its message is pushed to `master` branch.

## Legal Information

When contributing to the project you adopt the `Rules for use of intellectual property in simplified manner` and `Rules for participation in open source projects of MegaFon PJSC` that are available at [https://www.megafon.ru/opensource/](https://www.megafon.ru/opensource/) in Russian and English languages.
