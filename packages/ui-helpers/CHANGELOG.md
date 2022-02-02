# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-beta.3](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-helpers@2.0.0-beta.2...@megafon/ui-helpers@2.0.0-beta.3) (2022-02-02)


### Bug Fixes

* **core:** fix build ui-core ([458c824](https://github.com/MegafonWebLab/megafon-ui/commit/458c824aab639e4802db261d0416b3cee58ac274))





# [2.0.0-beta.2](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-helpers@2.0.0-beta.1...@megafon/ui-helpers@2.0.0-beta.2) (2022-01-24)


### Features

* **ui-helpers:** add a11y function to check event is click or enter press ([65befe3](https://github.com/MegafonWebLab/megafon-ui/commit/65befe336852eb2a5783af5dd723d369ee265911))





# [2.0.0-beta.1](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-helpers@2.0.0-beta.0...@megafon/ui-helpers@2.0.0-beta.1) (2022-01-20)


### Bug Fixes

* **colors:** renabe green and purple to brandGreen and brandPurple to avoid postcss-colormin bug ([563d97c](https://github.com/MegafonWebLab/megafon-ui/commit/563d97c42900099415a6872f57b500b87aeed647))


### BREAKING CHANGES

* **colors:** green, green20, green80, purple, purple20 and purple80 colors now have 'brand'
prefix (e.g. brandGreen)





# [2.0.0-beta.0](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-helpers@1.0.0...@megafon/ui-helpers@2.0.0-beta.0) (2022-01-19)


### Features

* **colors:** css custom properties and color themes support ([b19a9a5](https://github.com/MegafonWebLab/megafon-ui/commit/b19a9a5112ebc7427d60f6514d606dd9d71ca444))


### BREAKING CHANGES

* **colors:** read commit description





# [1.0.0](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-helpers@1.0.0-beta.2...@megafon/ui-helpers@1.0.0) (2021-11-30)

**Note:** Version bump only for package @megafon/ui-helpers





# [1.0.0-beta.2](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-helpers@1.0.0-beta.1...@megafon/ui-helpers@1.0.0-beta.2) (2021-10-07)


### Bug Fixes

* add lint-staged to pre-commit hook ([83e2e13](https://github.com/MegafonWebLab/megafon-ui/commit/83e2e1304c92cd0125e80fa0c2879e28476499d9))
* run lint-staged only on pre-commit hook ([8570564](https://github.com/MegafonWebLab/megafon-ui/commit/857056423e738135f6d0866df8c0166ce9bd289e))





# [1.0.0-beta.1](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-helpers@1.0.0-beta.0...@megafon/ui-helpers@1.0.0-beta.1) (2021-10-04)


### Bug Fixes

* **ui-helpers:** eslint and prettier fixes ([920b13d](https://github.com/MegafonWebLab/megafon-ui/commit/920b13d232aa107e974b742a1bc11c0e49d4d955))
* **ui-helpers:** fix export types ([0e9d170](https://github.com/MegafonWebLab/megafon-ui/commit/0e9d17090780eaa2f916c21ae90b5c7e2355ba71))
* **ui-icons:** add frontend-presets; fix eslint and prettier errors ([c1e0675](https://github.com/MegafonWebLab/megafon-ui/commit/c1e06758c2b6002a3011d7e98a745f1f25186714))





# 1.0.0-beta.0 (2021-07-13)


### Features

* **packages:** added @megafon/ui-helpers package ([811f67c](https://github.com/MegafonWebLab/megafon-ui/commit/811f67c26c87e2582e461c03223b12344513ecac))


### BREAKING CHANGES

* **packages:** utils from @megafon/ui-core removed, use @megafon/ui-helpers package instead
* **packages:** breakpoints from @megafon/ui-core removed, use @megafon/ui-helpers package instead
* **packages:** throttleTime removed from export in @megafon/ui-core package
