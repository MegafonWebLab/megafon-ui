# Architecture

`megafon-ui` - is a monorepository managed with [Lerna](https://github.com/lerna/lerna).

`packages` directory includes several library parts which are
the separated `npm` modules with independent versions.

Root `package.json` defines scripts for proxying execution of commands in every package.
For example, script `lerna run build` (or `yarn run build` in
root folder) runs `yarn run build` inside every directory in `packages` folder.


# Development

For contributing to `megafon-ui` library you need to create your own fork of the main repository.
After making some changes you should create pull request with appropriate description.

For Development use TypeScript. All components are based on functions.
Parameters by default set in destructuration in component arguments.
```jsx
const ComponentName = ({ name = 'name' }) => ...
```

For each components should be create a directory with:

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

Tests and code linting also run via git hooks before committing of any changes.

Before run tests need build packages with command `yarn run build`, if packages not be builded, then there will be a problem with dependencies between packages.


## How commit changes

Project use [conventional commits](https://www.conventionalcommits.org/ru/v1.0.0-beta.4/).
A more applied description can be found here: https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format

Message each commit should describe:

- type, т.е. what level of change will the impact of the commit bring (example: feat, fix, ci или docs)
- scope changes (component)
- description of changes, which will be recorded on a separate line in the changelog.

*Example of types by semver:*

```
patch: fix(button): new prop onClick
minor: feat(incredible-component): added new component
major:

feat(button): deprecated onClick prop removed

BREAKING CHANGE: onClick prop removed
```


To simplify the creation of commits, a commitizen has been added, with it a commit can be done like this:

```
git add .
git cz
```

After starting `cz` starts `wizard`, which will task the required message parameters. One of steps need mark task number to which applies changes.

If something go wrong on commit(linter fails), you can use command `git cz --retry`.


### Commit types

Main types - fix and feat for patch and minor changes. It will be used in 99% cases.
Breaking changes may to appear inside anyone types, then after merge will release next major version.
That's rare case. Other types can be seen in the dock for [angular](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format).


### What will fall in changelog

Messages from commits with type `feat`, `fix`, `perf`, and all commits marked as `breaking change` with any type will fall in changelog.

### Adding commits to an existing branch

If branch already have commit with type, which fall in generation changelog'а, then can add new
commits with the type `refactor` for not added to changelog.

## Review

In review process need to check commit messages for compliance
edit in request. If message inappropriate changes in code need return request for revision.

Особое внимание должно уделяться `breaking change` - в интерфейсе github'а в сообщении коммита эта строка не видна
и при просмотре будет необходимо раскрывать сообщения коммитов, они свернуты под иконкой троеточия.

## Публикация пакетов

Публикация происходит автоматически при коммите в ветку `master` с помощью Github Actions. Lerna по сообщениям из коммитов определяет
следующую релизную версию, генерирует changelog и при наличии изменений в коде публикует пакеты в npm.

### Как пропустить публикацию

Чтобы не публиковать новый пакет нужно в сообщение коммита добавить строку `skip release`.
Сообщение должно быть в последнем коммите, загруженном в репозиторий, например:

1. если пушнуть 2 коммита одновременно, `skip release` должен быть в последнем коммите, в первом не обязательно
2. если нужно влить ветку без публикации, в поле сообщения в интерфейсе github'а нужно добавить `skip release`

Добавленные изменения попадут в релиз при следующем коммите в мастер, если у него не будет `skip release` в сообщении.

## Переход от пререлизной версии к основной:

1. в `lerna.json` удалить строки с `distTag`, `conventionalPrerelease`, `preid`
2. в `lerna.json` вместо удаленных добавить `conventionalGraduate="*"``
3. влить в мастер, дождаться прохода пайплайна и публикации пакетов
4. следующим коммитом можно удалить `conventionalGraduate="*"`` (если не удалять, он все равно будет игнорироваться)
