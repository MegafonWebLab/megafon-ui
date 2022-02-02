# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.0.0-beta.6](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@3.0.0-beta.5...@megafon/ui-core@3.0.0-beta.6) (2022-02-02)


### Bug Fixes

* color props values changes ([b279f2b](https://github.com/MegafonWebLab/megafon-ui/commit/b279f2b5af0edae92fe9825bbfa90a207cb8009a))
* remove deprecated props values ([add76f3](https://github.com/MegafonWebLab/megafon-ui/commit/add76f38a9ebad8b5b6504dfe6aae862746f0dfc))
* **colors:** rename green and purple to brandGreen and brandPurple ([2266734](https://github.com/MegafonWebLab/megafon-ui/commit/2266734336be1a0faa5f1736fdf39070442837b3))
* **core:** fix build ui-core ([458c824](https://github.com/MegafonWebLab/megafon-ui/commit/458c824aab639e4802db261d0416b3cee58ac274))
* **core:** separated colors.css file ([f0a4d72](https://github.com/MegafonWebLab/megafon-ui/commit/f0a4d728e0b30c5caeae5c8d9607e624fb4ea288))
* **textlink:** fix color prop type ([6edcea0](https://github.com/MegafonWebLab/megafon-ui/commit/6edcea06ce26d137611aaf022d3ee6f7da295366))


### BREAKING CHANGES

* ContentArea: prop color change values from 'base' to 'white' and from 'content' to 'default';
remove depreacted value 'freshAsphalt'
Paragraph: prop color change values from 'base' to 'white' and from 'contend' to 'default';
remove deprecared values 'freshAsphalt' and 'clearWhite'
StoreBanner: prop theme change value from 'black' to 'default'; remove deprecated value 'clearWhite'
* ContentArea, Paragraph, StoreBanner and Breadcrumbs components from no don't have
freshAsphalt and clearWhite as values for colorize props





# [3.0.0-beta.5](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@3.0.0-beta.4...@megafon/ui-core@3.0.0-beta.5) (2022-01-28)


### Features

* **header:** made header as a functional component ([81701ad](https://github.com/MegafonWebLab/megafon-ui/commit/81701ad87b6e9df2fe630bf4e183383264c0bb01))
* **radiobutton:** made radiobutton as a functional component ([65406af](https://github.com/MegafonWebLab/megafon-ui/commit/65406afc90fd82f7eb0fdcbbe78569fc98164e78))





# [3.0.0-beta.4](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@3.0.0-beta.3...@megafon/ui-core@3.0.0-beta.4) (2022-01-27)

**Note:** Version bump only for package @megafon/ui-core





# [3.0.0-beta.3](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@3.0.0-beta.2...@megafon/ui-core@3.0.0-beta.3) (2022-01-24)


### Bug Fixes

* **accordion:** add focus on arrow after tab press, add open/close accordion after enter press ([9bfa0ac](https://github.com/MegafonWebLab/megafon-ui/commit/9bfa0ac5348ac25c0e37a4df51e26e2dabde02ba))
* **accordion:** change type of onClickAccordion prop ([9a150c5](https://github.com/MegafonWebLab/megafon-ui/commit/9a150c5de309547763a714b0eb630dfb386a8107))
* **calendar/month:** add focus on month arrows, add enter press handlers ([63f1e47](https://github.com/MegafonWebLab/megafon-ui/commit/63f1e4761e57ed6d56464b632dce9fd5e77655e1))
* **checkbox:** add focus on custom checkbox, add enter press handler ([83d111d](https://github.com/MegafonWebLab/megafon-ui/commit/83d111d0e4b41d3915bdd079bed4a7f9715ce7a5))
* **checkbox:** add isChecked state, change type of onChange prop ([f535caf](https://github.com/MegafonWebLab/megafon-ui/commit/f535caf39a02ab6793d3c63b654a1f1f3e9b2b93))
* **tooltip:** add check event function from ui-helpers ([a784ab4](https://github.com/MegafonWebLab/megafon-ui/commit/a784ab4f288124eb941fe8f52e46b2efc9aa2f82))


### BREAKING CHANGES

* **checkbox:** change type of onChange prop on (checked: boolean) => void
* **accordion:** remove parameter 'title' in onClickAccordion prop
* **tooltip:** change onOpen, onClose types; AccessibilityEventTypeNative from @megafon/ui-helpers





# [3.0.0-beta.2](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@3.0.0-beta.1...@megafon/ui-core@3.0.0-beta.2) (2022-01-21)

**Note:** Version bump only for package @megafon/ui-core





# [3.0.0-beta.1](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@3.0.0-beta.0...@megafon/ui-core@3.0.0-beta.1) (2022-01-20)


### Bug Fixes

* **colors:** fix colors component ([3061f7c](https://github.com/MegafonWebLab/megafon-ui/commit/3061f7c7b56d5baa32f109d7ce941bcc7e70c5b9))
* **colors:** remove unused classname modifiers ([d919cdc](https://github.com/MegafonWebLab/megafon-ui/commit/d919cdcf1fa79d60230fc85811518ded1c0537ad))
* **colors:** remove unused method ([2970295](https://github.com/MegafonWebLab/megafon-ui/commit/2970295df9053a4f54ed19d3d46deb07994844e0))
* **colors:** renabe green and purple to brandGreen and brandPurple to avoid postcss-colormin bug ([563d97c](https://github.com/MegafonWebLab/megafon-ui/commit/563d97c42900099415a6872f57b500b87aeed647))
* **colors:** update color values on colors page when user switches theme ([8552ff6](https://github.com/MegafonWebLab/megafon-ui/commit/8552ff69a66153ef890437ffc4dd2e50c31d6f2e))
* **less:** import base.less file through reference ([5a13aae](https://github.com/MegafonWebLab/megafon-ui/commit/5a13aaedec3a7fd09f77dcddfe437fda604f60a5))


### Features

* **styles:** export css version for base.less ([14aff17](https://github.com/MegafonWebLab/megafon-ui/commit/14aff17f8d3f77ec7beb2e3cb5c8a489ecd77e74))


### BREAKING CHANGES

* **colors:** green, green20, green80, purple, purple20 and purple80 colors now have 'brand'
prefix (e.g. brandGreen)





# [3.0.0-beta.0](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.2.0...@megafon/ui-core@3.0.0-beta.0) (2022-01-19)


### Features

* **colors:** css custom properties and color themes support ([b19a9a5](https://github.com/MegafonWebLab/megafon-ui/commit/b19a9a5112ebc7427d60f6514d606dd9d71ca444))


### BREAKING CHANGES

* **colors:** read commit description





# [2.2.0](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.1.4...@megafon/ui-core@2.2.0) (2021-12-29)


### Features

* **radiobutton:** add dataAttrs prop ([3f8d0b4](https://github.com/MegafonWebLab/megafon-ui/commit/3f8d0b4c4ec4a6ca301ab44feed2842ec8e54f3a))





## [2.1.4](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.1.3...@megafon/ui-core@2.1.4) (2021-12-20)


### Bug Fixes

* **colors:** add hover colors to system group ([634ac03](https://github.com/MegafonWebLab/megafon-ui/commit/634ac034445fdcd08b60ff056f75683025cb6d49))
* **tabs:** fix active tab underline width ([4499399](https://github.com/MegafonWebLab/megafon-ui/commit/449939942730143712a92930a279a8b6fc17a012))





## [2.1.3](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.1.2...@megafon/ui-core@2.1.3) (2021-12-14)


### Bug Fixes

* **contentarea:** fix backgroundColor and innerBackgroundColor props values ([d6004a4](https://github.com/MegafonWebLab/megafon-ui/commit/d6004a493b623cced4c453d69b0fd16d3cfbef43))





## [2.1.2](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.1.1...@megafon/ui-core@2.1.2) (2021-12-14)


### Bug Fixes

* **paragraph:** rollback deprecated color props clearWhite ([ee4e5a9](https://github.com/MegafonWebLab/megafon-ui/commit/ee4e5a9ce158a4df68e437d316e37ed6e87df664))





## [2.1.1](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.1.0...@megafon/ui-core@2.1.1) (2021-12-13)


### Bug Fixes

* **carousel:** add prevendefault mouse event for disable slide click ([2e8f190](https://github.com/MegafonWebLab/megafon-ui/commit/2e8f1904101ffab860b4e74f28b9609f962f1340))
* **colors:** refactor colors page by new ui colors scheme ([6ff2629](https://github.com/MegafonWebLab/megafon-ui/commit/6ff262953bd87f77e81f906b0bb195b84aecad13))
* **notification:** update color style by new color scheme ([3b2b625](https://github.com/MegafonWebLab/megafon-ui/commit/3b2b625f082935b2c24123e06197d0bd4fbe6000))





# [2.1.0](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0...@megafon/ui-core@2.1.0) (2021-12-07)


### Bug Fixes

* **button:** fix rendering difference on client and server side ([323287e](https://github.com/MegafonWebLab/megafon-ui/commit/323287ea040716b9200bbaa5112f277427015598))
* **contentarea:** fix prop type ([3e4114d](https://github.com/MegafonWebLab/megafon-ui/commit/3e4114dbd2d8a446a1247528fbf5464706bb4d4a))
* **textfield:** fix rendering difference on client and server side ([4d26cac](https://github.com/MegafonWebLab/megafon-ui/commit/4d26cac90002692d7c404f9180310261e9a0e567))


### Features

* **tabs:** add renderOnlyCurrentPanel props ([0241f6c](https://github.com/MegafonWebLab/megafon-ui/commit/0241f6c9ed4ebb5132b38204612bcff095302822))
* **ui-core:** fix mixin ([8e0f401](https://github.com/MegafonWebLab/megafon-ui/commit/8e0f401973d758821ee32ca2af1a714f3bca8b01))
* **ui-core:** fix some mixins and variables ([be0462e](https://github.com/MegafonWebLab/megafon-ui/commit/be0462ed3bdcbc1e72d83b749723cf7b896f0846))





# [2.0.0](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.169...@megafon/ui-core@2.0.0) (2021-11-30)


### Bug Fixes

* rename last mfui-beta to mfui ([6bc1d33](https://github.com/MegafonWebLab/megafon-ui/commit/6bc1d33d118862f969b09126dceb4e4462ec5128))


### Features

* rename prefix mfui-beta to mfui ([41b2ea4](https://github.com/MegafonWebLab/megafon-ui/commit/41b2ea4880ee6dd0e76b862bfc0d2a86031d734c))


### BREAKING CHANGES

* 1.x.x version of ui library also has mfui- prefix for components. please, check,
that you don't have any styles or business logic (e.g. css or js selectors) using mfui- prefix as
match pattern.





# [2.0.0-beta.169](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.168...@megafon/ui-core@2.0.0-beta.169) (2021-11-29)


### Bug Fixes

* **carousel:** slides carousel to focusable slide ([f31c806](https://github.com/MegafonWebLab/megafon-ui/commit/f31c806387e3cef6cc1d4c98e2af2d65015eef3c))
* **search:** fix items container position ([178eeed](https://github.com/MegafonWebLab/megafon-ui/commit/178eeed58c79f30ddfcca4c33c394f7333e2cc7a))
* **select:** remove arrow and arrows wrap classes ([2811796](https://github.com/MegafonWebLab/megafon-ui/commit/28117968f55430ce92198559a8b55174d9791368))
* **select:** update keyboard focus ([59999df](https://github.com/MegafonWebLab/megafon-ui/commit/59999dfac0aee425a0a445ed5e93702e78f11a21))
* **textlink:** fix double underline for dashed and border style ([da41c55](https://github.com/MegafonWebLab/megafon-ui/commit/da41c55f23e3953efdca24e576633a0d07269c3d))
* **tooltip:** add keyboard accessibility for tooltip open ([f4c97b8](https://github.com/MegafonWebLab/megafon-ui/commit/f4c97b8a8d9a29669e475bda670550d72a3b49e4))


### Features

* **search:** add disabled prop ([bc32588](https://github.com/MegafonWebLab/megafon-ui/commit/bc32588f1964ecd93f1f8a2aec1479959ef9d131))


### BREAKING CHANGES

* **select:** arrow display by pseudo element now, props and element removed from component





# [2.0.0-beta.168](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.167...@megafon/ui-core@2.0.0-beta.168) (2021-11-23)


### Features

* **carousel:** fix effect fade ([359fd55](https://github.com/MegafonWebLab/megafon-ui/commit/359fd55990ac7e018917301bb4b3ae12d0e133e0))
* **select:** update items prop typings ([280d581](https://github.com/MegafonWebLab/megafon-ui/commit/280d5818aee2a8b8f596bb25b3752e5729a8edb3))


### BREAKING CHANGES

* **select:** items prop reuired and has exact structure in propType





# [2.0.0-beta.167](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.166...@megafon/ui-core@2.0.0-beta.167) (2021-11-15)


### Bug Fixes

* **select:** restore keyboard controls ([d78031b](https://github.com/MegafonWebLab/megafon-ui/commit/d78031baf4ee70a69866446f9d32f009f1fcd346))





# [2.0.0-beta.166](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.165...@megafon/ui-core@2.0.0-beta.166) (2021-11-15)


### Bug Fixes

* **textfield:** set empty string as default value ([1bba2bb](https://github.com/MegafonWebLab/megafon-ui/commit/1bba2bbb577acf34fa3bc3c694999ac26f900ef7))
* **ui-core:** enable some eslint rules and fix problems ([ee8fd03](https://github.com/MegafonWebLab/megafon-ui/commit/ee8fd03d6620cbcff25915f279e481db2193a6d1))
* **ui-core:** fix ContentArea props ([dbede1d](https://github.com/MegafonWebLab/megafon-ui/commit/dbede1d1a021cc13c2c1872f1b86a8c6a5813b95))
* **ui-core:** fix RadioButton tests ([f3410f7](https://github.com/MegafonWebLab/megafon-ui/commit/f3410f7b1dd2007d40f17f8ec54905bff76ff994))
* **ui-core:** fix RedioButton default value ([df1fe2c](https://github.com/MegafonWebLab/megafon-ui/commit/df1fe2c37fc51d10c2ee459cdd5badb6c1ee48fb))
* **ui-core:** restore defaultProps ([5e2ef7c](https://github.com/MegafonWebLab/megafon-ui/commit/5e2ef7c18c30fb1873b8b7638c299eb066bd1ee3))


### Features

* **accordion:** added new type for title ([0275349](https://github.com/MegafonWebLab/megafon-ui/commit/0275349edffec74c4fb08638cbebf7026d99d4cd))





# [2.0.0-beta.165](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.164...@megafon/ui-core@2.0.0-beta.165) (2021-11-01)


### Bug Fixes

* add [@fresh](https://github.com/fresh)AsphaltL50 color ([e032c1d](https://github.com/MegafonWebLab/megafon-ui/commit/e032c1df461973717b57290eb565e72b65fcb5b4))
* add additional faded colors ([6b162b8](https://github.com/MegafonWebLab/megafon-ui/commit/6b162b84b643695c9b7418143e433568aceacff1))
* rename [@fresh](https://github.com/fresh)AsphaltL50 to [@fresh](https://github.com/fresh)AsphaltLighten50 ([fb7f9cc](https://github.com/MegafonWebLab/megafon-ui/commit/fb7f9cc77899e2b852b9c8afd536925302a6c8fd))


### Features

* **search:** add onBlure callback, add ability to render custom search results ([4f04552](https://github.com/MegafonWebLab/megafon-ui/commit/4f045526d586071d91b1f5c7200c44370bea804f))
* **tabs:** add data attributes for tab ([ef947fd](https://github.com/MegafonWebLab/megafon-ui/commit/ef947fde5330ec866728dd3299378558d0ec4b96))
* **tooltip:** add new prop targetElement ([e3af122](https://github.com/MegafonWebLab/megafon-ui/commit/e3af122594c5e998835d7b8055d801b248569d20))
* add color variable [@fresh](https://github.com/fresh)Asphalt50 to base.less ([9aee3d7](https://github.com/MegafonWebLab/megafon-ui/commit/9aee3d7d6e9250fc61546539ea9e8cb5c3be15aa))


### BREAKING CHANGES

* **search:** type and functionality of the props items are changed





# [2.0.0-beta.164](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.163...@megafon/ui-core@2.0.0-beta.164) (2021-10-25)


### Bug Fixes

* **paragraph:** add default font-weight ([af8eeea](https://github.com/MegafonWebLab/megafon-ui/commit/af8eeea268dea714863c9eaef5afc627769be60c))





# [2.0.0-beta.163](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.162...@megafon/ui-core@2.0.0-beta.163) (2021-10-18)


### Bug Fixes

* props isDisabled renamed to disabled ([5c1efee](https://github.com/MegafonWebLab/megafon-ui/commit/5c1efee6d059164e77f4740a4423607262560b4a))


### BREAKING CHANGES

* for all components prop isDisabled renamed to disabled





# [2.0.0-beta.162](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.161...@megafon/ui-core@2.0.0-beta.162) (2021-10-07)


### Bug Fixes

* add lint-staged to pre-commit hook ([83e2e13](https://github.com/MegafonWebLab/megafon-ui/commit/83e2e1304c92cd0125e80fa0c2879e28476499d9))
* run lint-staged only on pre-commit hook ([8570564](https://github.com/MegafonWebLab/megafon-ui/commit/857056423e738135f6d0866df8c0166ce9bd289e))





# [2.0.0-beta.161](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.160...@megafon/ui-core@2.0.0-beta.161) (2021-10-05)


### Features

* **textfield:** isConstrolled false by default, remove prop initialValue ([7cea901](https://github.com/MegafonWebLab/megafon-ui/commit/7cea901e821a34712fc6a984fc1d0a5b9d099948))


### BREAKING CHANGES

* **textfield:** isControlled prop false by default





# [2.0.0-beta.160](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.159...@megafon/ui-core@2.0.0-beta.160) (2021-10-04)


### Bug Fixes

* **carousel:** add slidesPerGroup setting ([558b745](https://github.com/MegafonWebLab/megafon-ui/commit/558b745cf2311d4e80d9753b57f3a80b6be846b2))


### Features

* **banner:** added new classes arrow ([1a03361](https://github.com/MegafonWebLab/megafon-ui/commit/1a033612c1fb882676a5cfb85b53622954b87299))
* **counter:** add isControlled props for forwarding actual value to component ([ee01afb](https://github.com/MegafonWebLab/megafon-ui/commit/ee01afb28eda1d4a71de99b3b718c6452ec43381))





# [2.0.0-beta.159](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.158...@megafon/ui-core@2.0.0-beta.159) (2021-09-27)


### Bug Fixes

* **textfield:** fix value of controlled input ([93d27a7](https://github.com/MegafonWebLab/megafon-ui/commit/93d27a7a5fb623b6ee11b7a504291234127a48cf))


### Features

* **textfield:** isConstrolled true by default, new prop initialValue ([78f463c](https://github.com/MegafonWebLab/megafon-ui/commit/78f463c4df2059b233c57d8ffc81b869557b2884))


### BREAKING CHANGES

* **textfield:** isControlled prop true by default





# [2.0.0-beta.158](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.157...@megafon/ui-core@2.0.0-beta.158) (2021-09-27)


### Bug Fixes

* **.stylelintrc.json:** move .stylelint.json to root and extends package configs from it ([ae5eac3](https://github.com/MegafonWebLab/megafon-ui/commit/ae5eac3dbbbea00413cea6b45ecbc22babb723c4))
* **carousel:** fixed pagination and arrow position ([9cbb3f1](https://github.com/MegafonWebLab/megafon-ui/commit/9cbb3f179dc0dbbf9050f743ffe77613a2a7c2d9))
* enable and fix few eslint rules ([cb83053](https://github.com/MegafonWebLab/megafon-ui/commit/cb83053b705242a747f792f6622fdc31e6ea042b))
* make .eslintrc.json to root and extends it in package ([90949c2](https://github.com/MegafonWebLab/megafon-ui/commit/90949c2f97ab6389cd050bf5a7b10a02c5d1cc0b))
* **gulpfile.js:** allow to replace both type of quotes ([4db4bb5](https://github.com/MegafonWebLab/megafon-ui/commit/4db4bb597fc95b3c271da530809a3f4968d821e8))
* **gulpfile.js:** fix code replacement ([8a5119a](https://github.com/MegafonWebLab/megafon-ui/commit/8a5119a00222ee1a33b17db04777ab2c6b00b568))
* **gulpfile.js:** fix regexp ([ac2114c](https://github.com/MegafonWebLab/megafon-ui/commit/ac2114ccd6aa1eaa36bbcf2d9ae8e7c3cc41ed7a))
* ui-core: add eslint; fix prettier errors; disable some rules to future fix ([bd3afc4](https://github.com/MegafonWebLab/megafon-ui/commit/bd3afc40ab342aa150716c523c76ff1a00dfedcd))
* ui-core: replace tslint with eslint; fix prettier errors ([6e4437d](https://github.com/MegafonWebLab/megafon-ui/commit/6e4437d5b1d291dfbe32c08ba703177171ef1286))





# [2.0.0-beta.157](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.156...@megafon/ui-core@2.0.0-beta.157) (2021-09-20)


### Bug Fixes

* **carousel:** fix indent without pagination ([83ce8f8](https://github.com/MegafonWebLab/megafon-ui/commit/83ce8f8492892a35d5f164c8d937bdfea9af9f71))
* **carousel:** fixed loosing Tooltip position ([bde41dd](https://github.com/MegafonWebLab/megafon-ui/commit/bde41dd306f02de0b0514e77084afac88ee50045))
* add frontend-presets for ui-core package and fix stylelint errors ([752bce5](https://github.com/MegafonWebLab/megafon-ui/commit/752bce59cfd31494e85c11faa4795ca7ee89adcc))


### BREAKING CHANGES

* **carousel:** add negative bottom margin for container





# [2.0.0-beta.156](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.155...@megafon/ui-core@2.0.0-beta.156) (2021-09-14)


### Bug Fixes

* **navarrow:** change button type ([954937a](https://github.com/MegafonWebLab/megafon-ui/commit/954937a5ea8b532f2fdb3804675dce34c8bb885a))





# [2.0.0-beta.155](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.154...@megafon/ui-core@2.0.0-beta.155) (2021-09-13)


### Bug Fixes

* **select:** add classes for title and arrow ([7d46cf2](https://github.com/MegafonWebLab/megafon-ui/commit/7d46cf2c978cb6a773fe97511e779bbc13da9d6a))





# [2.0.0-beta.154](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.153...@megafon/ui-core@2.0.0-beta.154) (2021-08-30)


### Bug Fixes

* **carousel:** edit slide margin on mobile resolution ([45aba92](https://github.com/MegafonWebLab/megafon-ui/commit/45aba928f11167cc31eefc018858ea6f4c793d96))
* **pagination:** add dependencies for usecallback buttons handler ([0faad5f](https://github.com/MegafonWebLab/megafon-ui/commit/0faad5fdd76e96daf521fa70f9ee2d85e593fda0))





# [2.0.0-beta.153](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.152...@megafon/ui-core@2.0.0-beta.153) (2021-08-25)


### Features

* **packages:** extracts icons from @megafon/ui-core to @megafon/ui-icons package ([ddabc32](https://github.com/MegafonWebLab/megafon-ui/commit/ddabc325b888540804f1fa13c94a1c5a58009df2))


### BREAKING CHANGES

* **packages:** icons from @megafon/ui-core removed, use @megafon/ui-icons package instead





# [2.0.0-beta.152](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.151...@megafon/ui-core@2.0.0-beta.152) (2021-08-16)


### Bug Fixes

* **tile:** fix component shadow ([aada445](https://github.com/MegafonWebLab/megafon-ui/commit/aada44552c919d357678de64ec1fd46fc3f2061d))


### Features

* **checkbox:** add classes for checkbox component ([47d56a5](https://github.com/MegafonWebLab/megafon-ui/commit/47d56a5f8ddc7fbec65a7ba9efd8dc2db034eb47))
* **search:** add outer class for icon ([a670bff](https://github.com/MegafonWebLab/megafon-ui/commit/a670bff2bd5989c78c2e2bb5eb588c3665b760fb))





# [2.0.0-beta.151](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.150...@megafon/ui-core@2.0.0-beta.151) (2021-08-02)


### Bug Fixes

* add new prop classes ([d72a883](https://github.com/MegafonWebLab/megafon-ui/commit/d72a8835e9d62234e2fec2e22c355d22755950da))
* **pagination:** fix svg icons in safari ([97ef850](https://github.com/MegafonWebLab/megafon-ui/commit/97ef850284debe00583f5f8c7551e3a822e78c7d))
* **select:** update component Select ([33e2623](https://github.com/MegafonWebLab/megafon-ui/commit/33e2623045c263ea80d01e9d7451f087e7a7aacd))





# [2.0.0-beta.150](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.149...@megafon/ui-core@2.0.0-beta.150) (2021-07-26)


### Features

* **carousel:** added initialSlide param ([5cd2d76](https://github.com/MegafonWebLab/megafon-ui/commit/5cd2d76a0a616a9b798f37d52ebfae3edb0ef013))





# [2.0.0-beta.149](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.148...@megafon/ui-core@2.0.0-beta.149) (2021-07-14)


### Bug Fixes

* **build:** change contants path resolve ([b4b810a](https://github.com/MegafonWebLab/megafon-ui/commit/b4b810a6b3b753103360dbccc20e891fd6f87cd8))





# [2.0.0-beta.148](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.147...@megafon/ui-core@2.0.0-beta.148) (2021-07-13)


### Bug Fixes

* **search:** change highlight regexp logic ([f6ce881](https://github.com/MegafonWebLab/megafon-ui/commit/f6ce881904dc926e1f503c581d59825ed8986d14))


### Features

* **packages:** added @megafon/ui-helpers package ([811f67c](https://github.com/MegafonWebLab/megafon-ui/commit/811f67c26c87e2582e461c03223b12344513ecac))


### BREAKING CHANGES

* **packages:** utils from @megafon/ui-core removed, use @megafon/ui-helpers package instead
* **packages:** breakpoints from @megafon/ui-core removed, use @megafon/ui-helpers package instead
* **packages:** throttleTime removed from export in @megafon/ui-core package





# [2.0.0-beta.147](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.146...@megafon/ui-core@2.0.0-beta.147) (2021-07-12)


### Bug Fixes

* **carousel:** fix opacity transition bug in ie ([6a1fe04](https://github.com/MegafonWebLab/megafon-ui/commit/6a1fe04ba5883ece1a001e01ea622a29da8821b1))
* **constants:** change mobile small start value ([859e6d8](https://github.com/MegafonWebLab/megafon-ui/commit/859e6d8a2465e8082fa428da8e8eaf5cfbf5da23))
* **search:** add max-height and scroll to dropdown ([71067a0](https://github.com/MegafonWebLab/megafon-ui/commit/71067a05e01631b8cfefc9cee30407905f1d5a37))


### Features

* **pagination:** add new component ([cf5897f](https://github.com/MegafonWebLab/megafon-ui/commit/cf5897f4beabed37f770ec82afd6666283be73f1))
* **radiobutton:** added className and classes for inner elements ([e75f523](https://github.com/MegafonWebLab/megafon-ui/commit/e75f523c66d0c6597f00f67fc6d70d553ac886b9))


### BREAKING CHANGES

* **constants:** change mobile small start value





# [2.0.0-beta.146](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.145...@megafon/ui-core@2.0.0-beta.146) (2021-07-05)


### Bug Fixes

* **carousel:** turn off swiping on pagination ([caec9be](https://github.com/MegafonWebLab/megafon-ui/commit/caec9bef833893abd36821b407e6ad323d0669ff))





# [2.0.0-beta.145](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.144...@megafon/ui-core@2.0.0-beta.145) (2021-06-28)


### Bug Fixes

* **notification:** fix style ([d891e56](https://github.com/MegafonWebLab/megafon-ui/commit/d891e56b67be216a516a7b2ba761048c441a7e3b))


### Features

* **carousel:** add new prop threshold ([a9b429c](https://github.com/MegafonWebLab/megafon-ui/commit/a9b429c33c741a509654c1fc0fa5fd275a90d802))





# [2.0.0-beta.144](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.143...@megafon/ui-core@2.0.0-beta.144) (2021-06-23)


### Bug Fixes

* **tooltip:** add new prop fallbackPlacements ([b98ee5c](https://github.com/MegafonWebLab/megafon-ui/commit/b98ee5c6a76c32746590908e6fd39b25b9dbd816))





# [2.0.0-beta.143](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.142...@megafon/ui-core@2.0.0-beta.143) (2021-06-22)


### Bug Fixes

* **carousel:** fix opacity transition bug in Safari 13 ([62d066c](https://github.com/MegafonWebLab/megafon-ui/commit/62d066ceb255f3db4de2352a7a9ef90b06d058da))
* **notification:** fix style ([9198668](https://github.com/MegafonWebLab/megafon-ui/commit/9198668ba1a4263fcfbfb207dc80d2d25d036378))





# [2.0.0-beta.142](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.141...@megafon/ui-core@2.0.0-beta.142) (2021-06-18)


### Features

* **search:** expand classes for Search component ([d6ceb3b](https://github.com/MegafonWebLab/megafon-ui/commit/d6ceb3b0507edc49802ef3134a3274a25094c74e))





# [2.0.0-beta.141](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.140...@megafon/ui-core@2.0.0-beta.141) (2021-06-10)


### Features

* **select:** add new type to view in item ([453f375](https://github.com/MegafonWebLab/megafon-ui/commit/453f3753e46cc2b0fd56287635b8b0918bec56f6))





# [2.0.0-beta.140](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.139...@megafon/ui-core@2.0.0-beta.140) (2021-06-09)


### Features

* **accordion:** add 'title' to classes ([dc7cc28](https://github.com/MegafonWebLab/megafon-ui/commit/dc7cc28551693f97c57f0e852c0621ebd2af5677))
* **carusel:** add ref ([b1b2889](https://github.com/MegafonWebLab/megafon-ui/commit/b1b28893dc27d9aa03033c9bc8577c60d85922a7))





# [2.0.0-beta.139](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.138...@megafon/ui-core@2.0.0-beta.139) (2021-06-08)


### Bug Fixes

* **textlink:** add rel prop ([0773a15](https://github.com/MegafonWebLab/megafon-ui/commit/0773a15a973fcec43910da1dbdb3129bf1da7a4a))





# [2.0.0-beta.138](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.137...@megafon/ui-core@2.0.0-beta.138) (2021-06-08)


### Features

* **accordion:** add dataAttrs prop ([3bbbd42](https://github.com/MegafonWebLab/megafon-ui/commit/3bbbd42c4eb7849ec2e5ad847e1d330b9bbe13e3))





# [2.0.0-beta.137](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.136...@megafon/ui-core@2.0.0-beta.137) (2021-06-04)


### Bug Fixes

* **convert:** added support for boolean props ([37fba6e](https://github.com/MegafonWebLab/megafon-ui/commit/37fba6e495fa00d58eaa615f492575256773c3a9))





# [2.0.0-beta.136](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.135...@megafon/ui-core@2.0.0-beta.136) (2021-06-04)


### Bug Fixes

* **notification:** fix content alignmtent in container ([8236e8e](https://github.com/MegafonWebLab/megafon-ui/commit/8236e8e03bb5c0344c2438cb48026ee51aeb5a0a))





# [2.0.0-beta.135](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.134...@megafon/ui-core@2.0.0-beta.135) (2021-06-03)


### Bug Fixes

* **tooltip:** update prop classes ([18f7a32](https://github.com/MegafonWebLab/megafon-ui/commit/18f7a32849af2fa04cb889478912f2ff0524b813))


### Features

* **search:** add new prop classes for Seach component ([e06ba5c](https://github.com/MegafonWebLab/megafon-ui/commit/e06ba5c4fd6d7de6c2cda6632f9e2f976b8d712c))





# [2.0.0-beta.134](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.133...@megafon/ui-core@2.0.0-beta.134) (2021-06-03)


### Bug Fixes

* **tooltip:** add new prop classes ([a10780f](https://github.com/MegafonWebLab/megafon-ui/commit/a10780f3b2865f051c187d4e189eb13ab42eb39d))





# [2.0.0-beta.133](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.132...@megafon/ui-core@2.0.0-beta.133) (2021-06-02)


### Features

* **notification:** replaced content property with childs ([a2f3b61](https://github.com/MegafonWebLab/megafon-ui/commit/a2f3b612b40fca247821612ccd8f2ff482f8e8ab))


### BREAKING CHANGES

* **notification:** replaced content property with childs





# [2.0.0-beta.132](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.131...@megafon/ui-core@2.0.0-beta.132) (2021-05-25)


### Features

* **carousel:** add dataAttrs prop and new params to onChange handler ([c410621](https://github.com/MegafonWebLab/megafon-ui/commit/c410621b2b0a743cad0729b1b86c5391ff5903f9))





# [2.0.0-beta.131](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.130...@megafon/ui-core@2.0.0-beta.131) (2021-05-25)


### Features

* **notification:** new props and design ([af149bc](https://github.com/MegafonWebLab/megafon-ui/commit/af149bc3ca782495b7407b708708255afc760e0c))


### BREAKING CHANGES

* **notification:** isShort Prop removed, new layout and props added





# [2.0.0-beta.130](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.129...@megafon/ui-core@2.0.0-beta.130) (2021-05-20)


### Bug Fixes

* **search:** update icon ([1aa5b53](https://github.com/MegafonWebLab/megafon-ui/commit/1aa5b53c3faec52b41038cd302bf80b3ff59e75d))





# [2.0.0-beta.129](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.128...@megafon/ui-core@2.0.0-beta.129) (2021-05-20)


### Performance Improvements

* **calendar:** change date-fns imports to descrease build size ([69aaaf9](https://github.com/MegafonWebLab/megafon-ui/commit/69aaaf9467ed78e12848dc2eea4c7553bcb5c219))





# [2.0.0-beta.128](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.127...@megafon/ui-core@2.0.0-beta.128) (2021-05-20)


### Bug Fixes

* **accordion:** fix bottom border styles for last item, fix paddings ([c7a38b9](https://github.com/MegafonWebLab/megafon-ui/commit/c7a38b94b18d6582270d9d343279632063e161f2))
* **tabs:** fixed a bug related to IntersectionObserver during server rendering ([995cee1](https://github.com/MegafonWebLab/megafon-ui/commit/995cee1f82ba6ef8c5d3872dfca44bc462457b71))





# [2.0.0-beta.127](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.126...@megafon/ui-core@2.0.0-beta.127) (2021-05-18)


### Features

* **tabs:** added activeTab class ([b06a4be](https://github.com/MegafonWebLab/megafon-ui/commit/b06a4be9942727daa54fa5ba67159fca2281c17f))





# [2.0.0-beta.126](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.125...@megafon/ui-core@2.0.0-beta.126) (2021-05-13)


### Features

* **button:** added download props ([1d3c489](https://github.com/MegafonWebLab/megafon-ui/commit/1d3c4896f5189d9eb84094e074aa13aab7be09f4))





# [2.0.0-beta.125](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.124...@megafon/ui-core@2.0.0-beta.125) (2021-05-11)


### Bug Fixes

* **tabs:** swipe slider after click on tab ([c8b684d](https://github.com/MegafonWebLab/megafon-ui/commit/c8b684d2139435282bfd290f08591fee35f48357))





# [2.0.0-beta.124](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.123...@megafon/ui-core@2.0.0-beta.124) (2021-05-11)


### Features

* **convert:** change props type and add customProps in TransformConfigItem type ([244f2ab](https://github.com/MegafonWebLab/megafon-ui/commit/244f2ab13797ecaceabac2e50b87f78cbfedd0df))


### BREAKING CHANGES

* **convert:** change props type and add customProps





# [2.0.0-beta.123](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.122...@megafon/ui-core@2.0.0-beta.123) (2021-04-30)


### Features

* **select:** add selectedView in selectItem ([a9f944a](https://github.com/MegafonWebLab/megafon-ui/commit/a9f944a0dc6b29b004b288eaf5136ce1b666d4d6))





# [2.0.0-beta.122](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.121...@megafon/ui-core@2.0.0-beta.122) (2021-04-28)


### Features

* **textfield:** added callback intercepting masked input change ([ec32b99](https://github.com/MegafonWebLab/megafon-ui/commit/ec32b995ff8cf2fc875284d93d93256dda40d9c6))





# [2.0.0-beta.121](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.120...@megafon/ui-core@2.0.0-beta.121) (2021-04-28)


### Features

* **tabs:** added classname for tab ([af9bcf3](https://github.com/MegafonWebLab/megafon-ui/commit/af9bcf3f05c5e2eea5dfcbddc74b81f439d9cceb))





# [2.0.0-beta.120](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.119...@megafon/ui-core@2.0.0-beta.120) (2021-04-28)


### Features

* **accordion:** add isOpenClass props in classes object and rootRef prop ([a92d247](https://github.com/MegafonWebLab/megafon-ui/commit/a92d24724835ebda494630c8c2d453a0e2d51b08))





# [2.0.0-beta.119](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.118...@megafon/ui-core@2.0.0-beta.119) (2021-04-23)


### Features

* **carousel:** added custom slide class, swiper props, fade effect ([8949a0b](https://github.com/MegafonWebLab/megafon-ui/commit/8949a0b7e9139063f5d25d5e754e0240801f8c20))





# [2.0.0-beta.118](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.117...@megafon/ui-core@2.0.0-beta.118) (2021-04-23)


### Features

* **tooltip:** add fade and boundary props and none-padding value ([4f22c29](https://github.com/MegafonWebLab/megafon-ui/commit/4f22c29740122c63a7c74d3e1dff89e65d11ee7e))


### BREAKING CHANGES

* **tooltip:** size props rename to paddings





# [2.0.0-beta.117](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.116...@megafon/ui-core@2.0.0-beta.117) (2021-04-14)


### Bug Fixes

* **package.json:** update swiper to fix error with types ([594cc99](https://github.com/MegafonWebLab/megafon-ui/commit/594cc99af7d9533ac9efca3f8b1ded3cdd5a0433))





# [2.0.0-beta.116](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.115...@megafon/ui-core@2.0.0-beta.116) (2021-04-08)


### Features

* **carousel:** add new custom classes, pagination settings, ref callback ([8a90f46](https://github.com/MegafonWebLab/megafon-ui/commit/8a90f46f29483bdd0969fcbf0a4bdb4b023d43e9))





# [2.0.0-beta.115](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.114...@megafon/ui-core@2.0.0-beta.115) (2021-04-06)


### Features

* **benefitsiconstile, convert, readme:** fix and update render html ([0c08667](https://github.com/MegafonWebLab/megafon-ui/commit/0c086674f666a068e1c4fde4a1a615d26f225512))





# [2.0.0-beta.114](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.113...@megafon/ui-core@2.0.0-beta.114) (2021-04-06)

**Note:** Version bump only for package @megafon/ui-core





# [2.0.0-beta.113](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.112...@megafon/ui-core@2.0.0-beta.113) (2021-04-02)


### Bug Fixes

* **convert:** fix argument type ([b59e964](https://github.com/MegafonWebLab/megafon-ui/commit/b59e964eee26b08d4d16be939e39238154c198c3))





# [2.0.0-beta.112](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.111...@megafon/ui-core@2.0.0-beta.112) (2021-03-26)


### Features

* **select:** add props onOpened and onClosed ([8dd81d5](https://github.com/MegafonWebLab/megafon-ui/commit/8dd81d5ec16e04ecf6cabb5be846152b9fd8aaca))





# [2.0.0-beta.111](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.110...@megafon/ui-core@2.0.0-beta.111) (2021-03-24)

**Note:** Version bump only for package @megafon/ui-core





# [2.0.0-beta.110](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.109...@megafon/ui-core@2.0.0-beta.110) (2021-03-24)


### Features

* **calendar:** changed dates chose behaviour and added hover ([04817ba](https://github.com/MegafonWebLab/megafon-ui/commit/04817bae82c0544ccc663be6c96e80a3b40b90ab))





# [2.0.0-beta.109](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.108...@megafon/ui-core@2.0.0-beta.109) (2021-03-24)

**Note:** Version bump only for package @megafon/ui-core





# [2.0.0-beta.108](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.107...@megafon/ui-core@2.0.0-beta.108) (2021-03-23)


### Bug Fixes

* **tabs:** added coordinate recalculation when changing the window size ([8ea1644](https://github.com/MegafonWebLab/megafon-ui/commit/8ea164429ccb7677fd0e3b4094edb5266e56333c))





# [2.0.0-beta.107](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.106...@megafon/ui-core@2.0.0-beta.107) (2021-03-22)


### Bug Fixes

* **textfield:** increase z-index in icon-box, add right space in password type ([b5284b4](https://github.com/MegafonWebLab/megafon-ui/commit/b5284b40bfe148bcb4aee0a57f7a22406cb298e7))





# [2.0.0-beta.106](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.105...@megafon/ui-core@2.0.0-beta.106) (2021-03-18)


### Features

* **button:** allows to be used as IconButton if icon prop is passed and children prop is not ([9b89105](https://github.com/MegafonWebLab/megafon-ui/commit/9b89105de8455f9ea042005ab62c877a9afa2280))
* **iconbutton:** deleted component ([23e175e](https://github.com/MegafonWebLab/megafon-ui/commit/23e175ebada66903a76db9eef1092f0f0c5edde5))


### BREAKING CHANGES

* **button:** "iconLeft" prop renamed to "icon"
* **iconbutton:** IconButton component was deleted. Use Button with "icon" prop instead





# [2.0.0-beta.105](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.104...@megafon/ui-core@2.0.0-beta.105) (2021-03-18)


### Bug Fixes

* **icons:** added facebook icon with white background ([5d5e1f8](https://github.com/MegafonWebLab/megafon-ui/commit/5d5e1f86fd6e2346e37f5440529162f2501e367f))


### Features

* **icons:** added new Habr icon ([f0716dc](https://github.com/MegafonWebLab/megafon-ui/commit/f0716dc2e135c32674353d8e53616f66c7e1ab16))





# [2.0.0-beta.104](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.103...@megafon/ui-core@2.0.0-beta.104) (2021-03-16)

**Note:** Version bump only for package @megafon/ui-core





# [2.0.0-beta.103](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.102...@megafon/ui-core@2.0.0-beta.103) (2021-03-16)


### Bug Fixes

* **grid:** allow to pass array in children proptype ([0e4cd7d](https://github.com/MegafonWebLab/megafon-ui/commit/0e4cd7dfa969d027c297b34cb1072c305a6bacd5))





# [2.0.0-beta.102](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.101...@megafon/ui-core@2.0.0-beta.102) (2021-03-15)


### Bug Fixes

* **grid:** correct children proptype ([252f55e](https://github.com/MegafonWebLab/megafon-ui/commit/252f55e61996272d5bfbc2edd272feb044f73e81))
* **grid:** rewritten to functional component ([4d153f2](https://github.com/MegafonWebLab/megafon-ui/commit/4d153f25b7e76a91f2e8c49f491eed510a4fc289))
* **gridcolumn:** correct children proptype ([411cce0](https://github.com/MegafonWebLab/megafon-ui/commit/411cce0e280cabd3626dabb9dd3941ade1a3829f))
* **gridcolumn:** rewritten to functional component ([b653163](https://github.com/MegafonWebLab/megafon-ui/commit/b653163f1f4c81dc196d6c53fbf545496b6fb849))





# [2.0.0-beta.101](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.100...@megafon/ui-core@2.0.0-beta.101) (2021-03-11)


### Features

* **icon-button:** pass className prop to root node ([742a4f4](https://github.com/MegafonWebLab/megafon-ui/commit/742a4f44e10ac03f3dc3be3186f5d30f73d1455f))





# [2.0.0-beta.100](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.99...@megafon/ui-core@2.0.0-beta.100) (2021-03-11)

**Note:** Version bump only for package @megafon/ui-core





# [2.0.0-beta.99](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.98...@megafon/ui-core@2.0.0-beta.99) (2021-03-09)


### Bug Fixes

* **counter:** fix btns width in ie ([8dbd525](https://github.com/MegafonWebLab/megafon-ui/commit/8dbd5250d254df8814984cfa1b9d17a2c7b99bfd))





# [2.0.0-beta.98](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.97...@megafon/ui-core@2.0.0-beta.98) (2021-03-05)


### Bug Fixes

* **counter:** counter icons were fixed ([f4ea586](https://github.com/MegafonWebLab/megafon-ui/commit/f4ea586c9a6fe6e37d5e8b424e28a539f482ba9b))
* **icons:** added removing of element after copying it ([c763b42](https://github.com/MegafonWebLab/megafon-ui/commit/c763b426230f0b0d1b55b8da0fdd676d4518b7a8))





# [2.0.0-beta.97](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.96...@megafon/ui-core@2.0.0-beta.97) (2021-03-04)


### Features

* **convert:** add classname prop to returned component ([c76162a](https://github.com/MegafonWebLab/megafon-ui/commit/c76162a8b06a57025fe50019b5fa1b5ac3dceeb9))





# [2.0.0-beta.96](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.95...@megafon/ui-core@2.0.0-beta.96) (2021-03-01)


### Bug Fixes

* **button:** button text move to top by 1px ([a4a9aee](https://github.com/MegafonWebLab/megafon-ui/commit/a4a9aee2e3eb68655cd79228b29ff2ff349b4481))





# [2.0.0-beta.95](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.94...@megafon/ui-core@2.0.0-beta.95) (2021-02-26)


### Bug Fixes

* **button:** fix text vertical align ([fb9b9bb](https://github.com/MegafonWebLab/megafon-ui/commit/fb9b9bb09d6c4e257c65af4c6ccaf39987867638))





# [2.0.0-beta.94](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.93...@megafon/ui-core@2.0.0-beta.94) (2021-02-26)

**Note:** Version bump only for package @megafon/ui-core





# [2.0.0-beta.93](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.92...@megafon/ui-core@2.0.0-beta.93) (2021-02-25)


### Features

* **accordion:** add className prop ([1c00fda](https://github.com/MegafonWebLab/megafon-ui/commit/1c00fda68089edfd0fccfdc3167d54ce1aadaf81))
* **carousel:** add className prop ([3db96c5](https://github.com/MegafonWebLab/megafon-ui/commit/3db96c5b79289f38229b333572afc2fb2bf73ab5))
* **contentarea:** add className prop ([3a255be](https://github.com/MegafonWebLab/megafon-ui/commit/3a255be03ad366b2fc982c8b49084eb8503b7162))
* **counter:** add className prop ([eec3790](https://github.com/MegafonWebLab/megafon-ui/commit/eec3790217695543b1bf482aec4e9a9196925eed))
* **tabs:** add className prop ([863ebeb](https://github.com/MegafonWebLab/megafon-ui/commit/863ebebc0f4a3334d4983c2e0d1e173107404739))





# [2.0.0-beta.92](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.91...@megafon/ui-core@2.0.0-beta.92) (2021-02-19)


### Bug Fixes

* **radiobutton:** add props inputRef ([461ce6c](https://github.com/MegafonWebLab/megafon-ui/commit/461ce6cbf1369088ef5b6fc1ac4eefe2e70446a5))





# [2.0.0-beta.91](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.90...@megafon/ui-core@2.0.0-beta.91) (2021-02-12)


### Bug Fixes

* **textfield:** number value in typings ([9bd5799](https://github.com/MegafonWebLab/megafon-ui/commit/9bd5799b18aa0997136ae1a0a9b51f804065e1d6))





# [2.0.0-beta.90](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.89...@megafon/ui-core@2.0.0-beta.90) (2021-02-10)


### Features

* **carousel:** add noSwipingSelector prop ([2f96991](https://github.com/MegafonWebLab/megafon-ui/commit/2f96991516fbc25935966b2200a9624b1ed27240))





# [2.0.0-beta.89](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.88...@megafon/ui-core@2.0.0-beta.89) (2021-02-10)


### Features

* **accordion:** add hasVerticalPaddings prop ([74ecad8](https://github.com/MegafonWebLab/megafon-ui/commit/74ecad8ee48f14676ad9cd3a93e512d3d11f6afa))





# [2.0.0-beta.88](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.87...@megafon/ui-core@2.0.0-beta.88) (2021-02-09)


### Bug Fixes

* **link:** one more type for children ([b21a946](https://github.com/MegafonWebLab/megafon-ui/commit/b21a9468e534dc366e776e6ca1951ab40213f652))
* **textlink:** one more type for children ([e235712](https://github.com/MegafonWebLab/megafon-ui/commit/e235712436216cf88917d8297e4233e65a3c2f5a))





# [2.0.0-beta.87](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.86...@megafon/ui-core@2.0.0-beta.87) (2021-02-09)


### Bug Fixes

* **convert:** typographic config is defined by the component ([fbac681](https://github.com/MegafonWebLab/megafon-ui/commit/fbac6810730cb4352568c20120374e7c374a9c23))





# [2.0.0-beta.86](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.85...@megafon/ui-core@2.0.0-beta.86) (2021-02-09)


### Features

* **counter:** edits added ([90e829a](https://github.com/MegafonWebLab/megafon-ui/commit/90e829aac312f2fad8c1124c8126b663568ac55e))


### BREAKING CHANGES

* **counter:** СlassName prop was deleted. Added new prop for custom class names.





# [2.0.0-beta.85](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.84...@megafon/ui-core@2.0.0-beta.85) (2021-02-08)


### Bug Fixes

* **icons:** added icons with merged path for Gag, Metro ([a2cb6ed](https://github.com/MegafonWebLab/megafon-ui/commit/a2cb6edd2a2a6c92415e51f909306227782719d3))


### Features

* **icons:** added plus, minus icons ([51c4bbe](https://github.com/MegafonWebLab/megafon-ui/commit/51c4bbe38fe1452394e5fef7b18b10d792e3faa3))


### BREAKING CHANGES

* **icons:** Metro_32 icon will be larger, new icon has less padding from wrapper to shape





# [2.0.0-beta.84](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.83...@megafon/ui-core@2.0.0-beta.84) (2021-02-02)


### Bug Fixes

* **icons:** returned old icon attach-file ([28fe5e1](https://github.com/MegafonWebLab/megafon-ui/commit/28fe5e1827a23b86159976bf46e223e707c3f3d4))


### BREAKING CHANGES

* **icons:** returned old icon attach-file





# [2.0.0-beta.83](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.82...@megafon/ui-core@2.0.0-beta.83) (2021-01-29)


### Features

* **textfield:** added controlled state for component ([15cca94](https://github.com/MegafonWebLab/megafon-ui/commit/15cca945c8888612eccb5609b0b412c0b37c219e))





# [2.0.0-beta.82](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.81...@megafon/ui-core@2.0.0-beta.82) (2021-01-29)


### Bug Fixes

* **tabs:** fix sticky tabs z-index ([931e538](https://github.com/MegafonWebLab/megafon-ui/commit/931e53813df35cfb2a18936e454d5cabff903ef4))





# [2.0.0-beta.81](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.80...@megafon/ui-core@2.0.0-beta.81) (2021-01-29)

**Note:** Version bump only for package @megafon/ui-core





# [2.0.0-beta.80](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.79...@megafon/ui-core@2.0.0-beta.80) (2021-01-28)


### Features

* **content area:** added classes prop, added new disable indents range ([f43480e](https://github.com/MegafonWebLab/megafon-ui/commit/f43480e7438178c683c42335e5c2e992b7169709))


### BREAKING CHANGES

* **content area:** className prop was deleted. Added new prop for custom class names.





# [2.0.0-beta.79](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.78...@megafon/ui-core@2.0.0-beta.79) (2021-01-22)


### Bug Fixes

* **textfield:** change textfield height by styleguide ([f0f69a9](https://github.com/MegafonWebLab/megafon-ui/commit/f0f69a9ed7baba63176510d3197b1d99ee01586e))





# [2.0.0-beta.78](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.77...@megafon/ui-core@2.0.0-beta.78) (2021-01-22)


### Bug Fixes

* **listitem:** remove extra margin ([e8bb642](https://github.com/MegafonWebLab/megafon-ui/commit/e8bb64213521fe9f2aac188f93127555ebf36e5d))





# [2.0.0-beta.77](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.76...@megafon/ui-core@2.0.0-beta.77) (2021-01-22)


### Bug Fixes

* **icons:** correct cancel icons, new size for plus icon, icon panel view ([20c597d](https://github.com/MegafonWebLab/megafon-ui/commit/20c597d7468b2b4bd52073644b28691445360b6c))





# [2.0.0-beta.76](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.75...@megafon/ui-core@2.0.0-beta.76) (2021-01-14)

**Note:** Version bump only for package @megafon/ui-core





# [2.0.0-beta.75](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.74...@megafon/ui-core@2.0.0-beta.75) (2021-01-13)

**Note:** Version bump only for package @megafon/ui-core





# [2.0.0-beta.74](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.73...@megafon/ui-core@2.0.0-beta.74) (2021-01-12)


### Bug Fixes

* **carousel:** update carousel component ([090681c](https://github.com/MegafonWebLab/megafon-ui/commit/090681ce607a4d8342d9710a18306d89ab5c0f08))





# [2.0.0-beta.73](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.72...@megafon/ui-core@2.0.0-beta.73) (2021-01-11)


### Bug Fixes

* **calendar:** added date mock for disabled dates test ([fc6df26](https://github.com/MegafonWebLab/megafon-ui/commit/fc6df268f8272152e3b073806160606a09046f6a))


### Features

* **utils:** add wrapper around htmr to cut forbidden tags and attrs ([71248da](https://github.com/MegafonWebLab/megafon-ui/commit/71248dabfed0f58a290bf087d10b8d5b994bf568))





# [2.0.0-beta.72](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.71...@megafon/ui-core@2.0.0-beta.72) (2020-12-25)


### Features

* **link:** added download attribute prop ([6234ee3](https://github.com/MegafonWebLab/megafon-ui/commit/6234ee358dbe93635b6eabac8572449d734f8775))
* **textlink:** added download attribute prop ([c962e20](https://github.com/MegafonWebLab/megafon-ui/commit/c962e205dfa8f3be96c92776536cb99877e8961e))





# [2.0.0-beta.71](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.70...@megafon/ui-core@2.0.0-beta.71) (2020-12-24)

**Note:** Version bump only for package @megafon/ui-core





# [2.0.0-beta.70](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.69...@megafon/ui-core@2.0.0-beta.70) (2020-12-22)


### Bug Fixes

* **textfield:** deleted declared cursor ([10311f9](https://github.com/MegafonWebLab/megafon-ui/commit/10311f9f8460073f34cdc6dcdcc5d8d32df07a5a))





# [2.0.0-beta.69](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.68...@megafon/ui-core@2.0.0-beta.69) (2020-12-18)


### Bug Fixes

* **carousel:** fixed swiper bug with slidesPerView auto on different resolutions ([fbe13d2](https://github.com/MegafonWebLab/megafon-ui/commit/fbe13d28c55fd3faaf154efd3299d8cec2fa4a1b))





# [2.0.0-beta.68](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.67...@megafon/ui-core@2.0.0-beta.68) (2020-12-17)


### Bug Fixes

* **preloader:** added fixed delay for rendering ([16a03e1](https://github.com/MegafonWebLab/megafon-ui/commit/16a03e163bf878078fa9291f621b100ea89db7b4))





# [2.0.0-beta.67](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.66...@megafon/ui-core@2.0.0-beta.67) (2020-12-17)


### Bug Fixes

* **banner:** fix remarks ([9c8d186](https://github.com/MegafonWebLab/megafon-ui/commit/9c8d186c22c1f63d9daf8e1d01ed3657c065681f))
* **carousel:** fix remarks ([9bafdb9](https://github.com/MegafonWebLab/megafon-ui/commit/9bafdb955f8a58bb0c1eb976eef25b09a7888479))
* **tabs:** fix remarks ([f61639d](https://github.com/MegafonWebLab/megafon-ui/commit/f61639decbb014611ecc4b64148ce35630ca6aee))


### BREAKING CHANGES

* **tabs:** move className and innerIndentsClass props to classes object
* **carousel:** move className and innerIndentsClass props to classes object





# [2.0.0-beta.66](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.65...@megafon/ui-core@2.0.0-beta.66) (2020-12-17)

**Note:** Version bump only for package @megafon/ui-core





# [2.0.0-beta.65](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.64...@megafon/ui-core@2.0.0-beta.65) (2020-12-16)


### Bug Fixes

* **tabs:** fix shadow transparent in safari ([a3308fc](https://github.com/MegafonWebLab/megafon-ui/commit/a3308fc7592be1dce7a428a513fc0779c07a6c9a))





# [2.0.0-beta.64](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.63...@megafon/ui-core@2.0.0-beta.64) (2020-12-15)


### Features

* **calendar:** changed onChange prop behavior ([1ef345f](https://github.com/MegafonWebLab/megafon-ui/commit/1ef345fe0575e560c45ae4735bf2c9ff863c9f82))


### BREAKING CHANGES

* **calendar:** made onChange callback to call only on manual dates change





# [2.0.0-beta.63](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.62...@megafon/ui-core@2.0.0-beta.63) (2020-12-15)


### Features

* **icons:** added new Copy icon ([de45029](https://github.com/MegafonWebLab/megafon-ui/commit/de4502903dcaeada613e3390b4d0ed9b9f237875))





# [2.0.0-beta.62](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.61...@megafon/ui-core@2.0.0-beta.62) (2020-12-11)


### Bug Fixes

* **search:** rewrite inner callback after onChange props changed ([9954f5e](https://github.com/MegafonWebLab/megafon-ui/commit/9954f5eb2f8d56bc3991c697b5d84dcd030cfd06))





# [2.0.0-beta.61](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.60...@megafon/ui-core@2.0.0-beta.61) (2020-12-10)

**Note:** Version bump only for package @megafon/ui-core





# [2.0.0-beta.60](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.59...@megafon/ui-core@2.0.0-beta.60) (2020-12-07)


### Code Refactoring

* **component - dropdownsociallist and producttalerest, folder - productcard:** remove component ([574e074](https://github.com/MegafonWebLab/megafon-ui/commit/574e074537cd2d9dcde5b3cffbbc8145d33aea49))


### BREAKING CHANGES

* **component - dropdownsociallist and producttalerest, folder - productcard:** destruction of public components





# [2.0.0-beta.59](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.58...@megafon/ui-core@2.0.0-beta.59) (2020-12-04)


### Bug Fixes

* **select:** add new keys to prop classes ([2a632f0](https://github.com/MegafonWebLab/megafon-ui/commit/2a632f02145514ce594728358770ccc2ea6b8d41))





# [2.0.0-beta.58](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.57...@megafon/ui-core@2.0.0-beta.58) (2020-12-04)


### Bug Fixes

* **checkbox:** fix onChange type ([ec7cab6](https://github.com/MegafonWebLab/megafon-ui/commit/ec7cab6b72bf2b84559e85c725f0e796e3ceb8b2))





# [2.0.0-beta.57](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.56...@megafon/ui-core@2.0.0-beta.57) (2020-12-04)

**Note:** Version bump only for package @megafon/ui-core





# [2.0.0-beta.56](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.55...@megafon/ui-core@2.0.0-beta.56) (2020-12-03)


### Bug Fixes

* **calendar:** minor style fixes and disabled possibility to give blocked date in props ([993aeaf](https://github.com/MegafonWebLab/megafon-ui/commit/993aeaf866b2b0232686127d2a0e4356b9c91264))
* **tooltip:** changed click event to mousedown so ref wont change at the moment of contains check ([be2c328](https://github.com/MegafonWebLab/megafon-ui/commit/be2c328c9152b146dac47f624892b4d1a49d7da5))





# [2.0.0-beta.55](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.54...@megafon/ui-core@2.0.0-beta.55) (2020-12-01)


### Bug Fixes

* **counter:** default props refactoring, block class changed ([9b5c80f](https://github.com/MegafonWebLab/megafon-ui/commit/9b5c80f85190610641874eb1f88decbe358a818b))





# [2.0.0-beta.54](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.53...@megafon/ui-core@2.0.0-beta.54) (2020-12-01)


### Features

* **component:** added rel attribute to button component ([21fa921](https://github.com/MegafonWebLab/megafon-ui/commit/21fa92144df2d2c2e084121355160e4f1c5aa863))





# [2.0.0-beta.53](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.52...@megafon/ui-core@2.0.0-beta.53) (2020-11-30)


### Features

* **button:** add new button property ([713b6fe](https://github.com/MegafonWebLab/megafon-ui/commit/713b6fee5206847851063596d1a8d07337d610e1))
* **button:** fix props order ([a6d3091](https://github.com/MegafonWebLab/megafon-ui/commit/a6d3091e5ff25be683cd4b690bc9630e7b42222a))
* **button:** fix proptypes order ([98f6d37](https://github.com/MegafonWebLab/megafon-ui/commit/98f6d3737145e8b5f3219f9e0c7a3730799c6e21))





# [2.0.0-beta.52](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.51...@megafon/ui-core@2.0.0-beta.52) (2020-11-27)


### Bug Fixes

* **textfield:** added fixes and symbol counter, removed textarea autoheight increase after resize ([3bbdf7a](https://github.com/MegafonWebLab/megafon-ui/commit/3bbdf7a8bdc193b8a5455e7107453d851b6cc90a))


### Features

* **textfield:** added textarea flexible functional, symbol limit view ([d378b8b](https://github.com/MegafonWebLab/megafon-ui/commit/d378b8be96a20940102598007a94f07288dbc898))


### BREAKING CHANGES

* **textfield:** added prop symbolCounter, replaced prop multiline to textarea with fixed and
flexible views





# [2.0.0-beta.51](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.50...@megafon/ui-core@2.0.0-beta.51) (2020-11-25)


### Bug Fixes

* **calendar:** changed date transform pattern for month ([8fc7933](https://github.com/MegafonWebLab/megafon-ui/commit/8fc79336235ecfdfc72a491cda336b0af40505b9))





# [2.0.0-beta.50](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.49...@megafon/ui-core@2.0.0-beta.50) (2020-11-25)


### Bug Fixes

* **breakpoints:** import files from constants is fixed ([8e3baa5](https://github.com/MegafonWebLab/megafon-ui/commit/8e3baa55eed164c3732d59bac8da76bd04a39dfb))





# [2.0.0-beta.49](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.48...@megafon/ui-core@2.0.0-beta.49) (2020-11-25)


### Bug Fixes

* **select:** default font weight added ([126389a](https://github.com/MegafonWebLab/megafon-ui/commit/126389a85b937e7eea42440de0cbd311d3710d62))





# [2.0.0-beta.48](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.47...@megafon/ui-core@2.0.0-beta.48) (2020-11-24)


### Bug Fixes

* **calendar:** added effect to change state if props changed ([a7ec076](https://github.com/MegafonWebLab/megafon-ui/commit/a7ec0762f0521898838871b6698d6408ca2a55d2))





# [2.0.0-beta.47](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.46...@megafon/ui-core@2.0.0-beta.47) (2020-11-23)


### Bug Fixes

* **carousel:** fix arrows align ([6b648c1](https://github.com/MegafonWebLab/megafon-ui/commit/6b648c1dda947213eaae35ecf8f0421229d27eb7))





# [2.0.0-beta.46](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.45...@megafon/ui-core@2.0.0-beta.46) (2020-11-23)


### Features

* **tabs:** add new component ([5d9c6bc](https://github.com/MegafonWebLab/megafon-ui/commit/5d9c6bcd8a9951dda44f646e005e48329a99fba9))





# [2.0.0-beta.45](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.44...@megafon/ui-core@2.0.0-beta.45) (2020-11-23)


### Code Refactoring

* **carousel:** full rework component ([90e7d97](https://github.com/MegafonWebLab/megafon-ui/commit/90e7d97e46c7677213ecdb483a75ecb677e5f3c8))


### Features

* **carousel:** add opacity animation ([f548f11](https://github.com/MegafonWebLab/megafon-ui/commit/f548f1108225a5c10b36163c5c6855e437b93939))
* **contentarea:** add new prop disableIndents ([2a9ff72](https://github.com/MegafonWebLab/megafon-ui/commit/2a9ff72d4b4988287cf6ba0390d6816ceda3bbb0))


### BREAKING CHANGES

* **contentarea:** remove innerPadding and mobileInnerPadding props
* **carousel:** full changed api, logic and dependencies





# [2.0.0-beta.44](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.43...@megafon/ui-core@2.0.0-beta.44) (2020-11-20)


### Features

* **banner:** add new component ([a4b2c12](https://github.com/MegafonWebLab/megafon-ui/commit/a4b2c125f7ed54a67e9ea57928681e0a76e53ab2))





# [2.0.0-beta.43](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.42...@megafon/ui-core@2.0.0-beta.43) (2020-11-20)


### Features

* **select:** add ability to update items state after transfer of new items to props ([b78eed4](https://github.com/MegafonWebLab/megafon-ui/commit/b78eed48ce354248ad94284d595879a7722144e4))





# [2.0.0-beta.42](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.41...@megafon/ui-core@2.0.0-beta.42) (2020-11-20)


### Bug Fixes

* **calendar:** fixes when parent has z-index, and elements with -1 value of z-index is dropped out ([d068539](https://github.com/MegafonWebLab/megafon-ui/commit/d068539cc327dc2bea896071b127bb97f5f7972a))
* **calendar:** handleChange property renamed to onChange for better consistency ([4e753c8](https://github.com/MegafonWebLab/megafon-ui/commit/4e753c8b59cca1ce9a44f68375dde06ed4c3f209))


### BREAKING CHANGES

* **calendar:** use onChange property to pass callback function instead of handleChange





# [2.0.0-beta.41](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.40...@megafon/ui-core@2.0.0-beta.41) (2020-11-19)


### Features

* **calendar:** added new Calendar component ([22108ce](https://github.com/MegafonWebLab/megafon-ui/commit/22108ce73e833ecfa7aadde95931fa0b8b9af0d5))





# [2.0.0-beta.40](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.39...@megafon/ui-core@2.0.0-beta.40) (2020-11-18)


### Bug Fixes

* **search:** prevent placeholder selection, when double-click on control element ([0607fc8](https://github.com/MegafonWebLab/megafon-ui/commit/0607fc81a4422830ef80930cf236e19dba64a3a5))





# [2.0.0-beta.39](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.38...@megafon/ui-core@2.0.0-beta.39) (2020-11-16)


### Bug Fixes

* **tooltip:** don't show tooltip when it's not in viewport ([4a42df3](https://github.com/MegafonWebLab/megafon-ui/commit/4a42df32f88abc4df2dcc995d50cec031012a3f1))





# [2.0.0-beta.38](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.37...@megafon/ui-core@2.0.0-beta.38) (2020-11-10)


### Features

* **contentarea:** add box-sizing to avoid redefinition by global site styles ([e747072](https://github.com/MegafonWebLab/megafon-ui/commit/e7470728536fa8ffc0119fe86d870566cec03f01))


### BREAKING CHANGES

* **contentarea:** container width can change if site sets border-box globally for all elements





# [2.0.0-beta.37](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.36...@megafon/ui-core@2.0.0-beta.37) (2020-11-09)


### Bug Fixes

* **button:** added preloader in button instead of spinner ([fdc29c7](https://github.com/MegafonWebLab/megafon-ui/commit/fdc29c73ac4bf9fbe57a0dc197e82e539e021771))
* **preloader:** added different resolutions ([0969158](https://github.com/MegafonWebLab/megafon-ui/commit/0969158729985b2954cd0dee5ccd6ca41fb545c1))


### BREAKING CHANGES

* **button:** renamed prop showSpinner to showLoader
* **preloader:** added different sizes except one





# [2.0.0-beta.36](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.35...@megafon/ui-core@2.0.0-beta.36) (2020-11-06)

**Note:** Version bump only for package @megafon/ui-core





# [2.0.0-beta.35](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.34...@megafon/ui-core@2.0.0-beta.35) (2020-11-03)


### Bug Fixes

* **tile:** added data attributes prop ([321ea34](https://github.com/MegafonWebLab/megafon-ui/commit/321ea34d916ced836a4a8a9df08082d5b6634242))


### Features

* **select:** tests and functional extensions ([2ed549b](https://github.com/MegafonWebLab/megafon-ui/commit/2ed549b2de35b4230f8ea1251f940555794f560b))





# [2.0.0-beta.34](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.33...@megafon/ui-core@2.0.0-beta.34) (2020-11-03)


### Bug Fixes

* **grid column:** add types according renderHtml returned type ([b338acd](https://github.com/MegafonWebLab/megafon-ui/commit/b338acd6c9d77b7d006915c4d3ec1171d920fc4b))





# [2.0.0-beta.33](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.32...@megafon/ui-core@2.0.0-beta.33) (2020-11-02)


### Bug Fixes

* **bubblehint:** delete component ([2872b9b](https://github.com/MegafonWebLab/megafon-ui/commit/2872b9b39cd32811c6378c09c23d43abd5ca3dbc))
* **dropdownsociallist:** replaced BubbleHint with Tooltip ([96a0a38](https://github.com/MegafonWebLab/megafon-ui/commit/96a0a38001f91b0a6ae42e3f3964065beaddd11f))


### Features

* **tooltip:** new Tooltip component with ref trigger element ([46efee7](https://github.com/MegafonWebLab/megafon-ui/commit/46efee792a1ae1c7fa056ea20846250ec556be4c))


### BREAKING CHANGES

* **bubblehint:** BubbleHint component has been removed. Use new Tooltip component instead





# [2.0.0-beta.32](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.31...@megafon/ui-core@2.0.0-beta.32) (2020-11-02)

**Note:** Version bump only for package @megafon/ui-core





# [2.0.0-beta.31](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.30...@megafon/ui-core@2.0.0-beta.31) (2020-11-02)


### Bug Fixes

* **base styles:** edit media queries ([e7a22db](https://github.com/MegafonWebLab/megafon-ui/commit/e7a22dbf98835c163fb77bd1974c8f92d1acf0bd))
* **grid:** added custom classname prop ([66e9536](https://github.com/MegafonWebLab/megafon-ui/commit/66e953696e74b7648f83b11a72c51ea93d9ff8f4))
* **icons:** new Cancel svg files with merged path, for all icon sizes ([9d4cf8d](https://github.com/MegafonWebLab/megafon-ui/commit/9d4cf8d85d4c5c24da7b6e7dc159630a4f930034))





# [2.0.0-beta.30](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.29...@megafon/ui-core@2.0.0-beta.30) (2020-11-01)

**Note:** Version bump only for package @megafon/ui-core





# [2.0.0-beta.29](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.28...@megafon/ui-core@2.0.0-beta.29) (2020-10-30)

**Note:** Version bump only for package @megafon/ui-core





# [2.0.0-beta.28](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.27...@megafon/ui-core@2.0.0-beta.28) (2020-10-30)

**Note:** Version bump only for package @megafon/ui-core





# [2.0.0-beta.27](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.26...@megafon/ui-core@2.0.0-beta.27) (2020-10-29)


### Bug Fixes

* **build:** remove icon property from svgr config ([812bc9f](https://github.com/MegafonWebLab/megafon-ui/commit/812bc9fbbea617edbd56e28b6618654876229924))





# [2.0.0-beta.26](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.25...@megafon/ui-core@2.0.0-beta.26) (2020-10-29)


### Bug Fixes

* **tile:** edit text decoration on hover ([bb5c694](https://github.com/MegafonWebLab/megafon-ui/commit/bb5c694413564f8ec05f1b1c0d5f625efd410e8d))





# [2.0.0-beta.25](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.24...@megafon/ui-core@2.0.0-beta.25) (2020-10-26)

**Note:** Version bump only for package @megafon/ui-core





# [2.0.0-beta.24](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.23...@megafon/ui-core@2.0.0-beta.24) (2020-10-12)


### Features

* **textfield:** added inputmode for input ([5762d99](https://github.com/MegafonWebLab/megafon-ui/commit/5762d9996261e23bb9342d435a0562993f648e03))





# [2.0.0-beta.23](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.22...@megafon/ui-core@2.0.0-beta.23) (2020-10-02)


### Bug Fixes

* **text filed:** separate input params for react input mask ([de6f00e](https://github.com/MegafonWebLab/megafon-ui/commit/de6f00ef3af5fff01b8e2f8fc983b89d7d8a956a))





# [2.0.0-beta.22](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.21...@megafon/ui-core@2.0.0-beta.22) (2020-10-01)


### Bug Fixes

* **icons:** add new checked_16 icon with normal path ([314fbf1](https://github.com/MegafonWebLab/megafon-ui/commit/314fbf17b14db8070d7795cb91ad7ac4744f17bd))





# [2.0.0-beta.21](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.20...@megafon/ui-core@2.0.0-beta.21) (2020-09-29)


### Features

* **search:** add className prop ([0502a00](https://github.com/MegafonWebLab/megafon-ui/commit/0502a0098f005f70fb678b9b3c59f726e05ad297))





# [2.0.0-beta.20](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.19...@megafon/ui-core@2.0.0-beta.20) (2020-09-25)


### Bug Fixes

* **select:** increased z-index ([13c1ae5](https://github.com/MegafonWebLab/megafon-ui/commit/13c1ae518ee102119fba2c55c728b038cf163526))





# [2.0.0-beta.19](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.18...@megafon/ui-core@2.0.0-beta.19) (2020-09-25)


### Features

* **search:** added Search component ([69ed181](https://github.com/MegafonWebLab/megafon-ui/commit/69ed181093ac94e476b28cf4f02055fc00076862))





# [2.0.0-beta.18](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.17...@megafon/ui-core@2.0.0-beta.18) (2020-09-24)

**Note:** Version bump only for package @megafon/ui-core





# [2.0.0-beta.17](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.16...@megafon/ui-core@2.0.0-beta.17) (2020-09-23)


### Bug Fixes

* **build:** add usage param for polyfills ([a26b725](https://github.com/MegafonWebLab/megafon-ui/commit/a26b7253b2f38b6984df7dabf61aee86f9a43ce0))





# [2.0.0-beta.16](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.15...@megafon/ui-core@2.0.0-beta.16) (2020-09-23)

**Note:** Version bump only for package @megafon/ui-core





# [2.0.0-beta.15](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.14...@megafon/ui-core@2.0.0-beta.15) (2020-09-23)


### Bug Fixes

* **notification:** changed enum to object literal ([2b3f77c](https://github.com/MegafonWebLab/megafon-ui/commit/2b3f77c3575754626a88b6f431fb45e6c80b27a3))
* **select:** changed enum to object literal ([2873aeb](https://github.com/MegafonWebLab/megafon-ui/commit/2873aeb013beca7068c5062afaf7d8c50d495bcf))
* **tile:** changed enum to object literal ([3d55209](https://github.com/MegafonWebLab/megafon-ui/commit/3d55209bedffe8240607f7ff47edcf1f8c34158b))





# [2.0.0-beta.14](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.13...@megafon/ui-core@2.0.0-beta.14) (2020-09-23)


### Features

* **textlink:** add rel prop ([cb2dd84](https://github.com/MegafonWebLab/megafon-ui/commit/cb2dd841740285631cae9238d5a2c0e28107dc7e))





# [2.0.0-beta.13](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.12...@megafon/ui-core@2.0.0-beta.13) (2020-09-21)


### Features

* **link:** add rel prop ([b3e08f9](https://github.com/MegafonWebLab/megafon-ui/commit/b3e08f96f90b7f008020f8701fb07d851b07ca69))





# [2.0.0-beta.12](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.11...@megafon/ui-core@2.0.0-beta.12) (2020-09-17)


### Bug Fixes

* **select:** fix keys generation ([7ff4fa8](https://github.com/MegafonWebLab/megafon-ui/commit/7ff4fa82ad5300f10c99fa1c77799efacfca261f))





# [2.0.0-beta.11](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.10...@megafon/ui-core@2.0.0-beta.11) (2020-09-17)


### Bug Fixes

* **select:** edit item value prop type ([78d667d](https://github.com/MegafonWebLab/megafon-ui/commit/78d667df26d32e0159abb4a7d4d16bb2be0bdbc3))


### Features

* **checkbox:** add data attrs prop ([5d66a67](https://github.com/MegafonWebLab/megafon-ui/commit/5d66a67bb33ce487dfb2e9ffe4663c921734997a))





# [2.0.0-beta.10](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.9...@megafon/ui-core@2.0.0-beta.10) (2020-09-16)


### Bug Fixes

* **icons:** update icons ([19dccd3](https://github.com/MegafonWebLab/megafon-ui/commit/19dccd3d8160667f2f3c4e2e6b0713422ccf6fba))





# [2.0.0-beta.9](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.8...@megafon/ui-core@2.0.0-beta.9) (2020-09-16)


### Features

* **iconbutton:** mFRU-7874 ([35f1330](https://github.com/MegafonWebLab/megafon-ui/commit/35f133068e1337856409bd5cd40d8abd7f346c90))





# [2.0.0-beta.8](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.7...@megafon/ui-core@2.0.0-beta.8) (2020-09-14)


### Bug Fixes

* **tile:** fixed notes ([79ed5ec](https://github.com/MegafonWebLab/megafon-ui/commit/79ed5ec7179888bff5c4cff9e871162e943184da))


### Features

* **tile:** added new component ([4efc047](https://github.com/MegafonWebLab/megafon-ui/commit/4efc0479bc748013e1ce50a78d07cc08cd2e2007))





# [2.0.0-beta.7](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.6...@megafon/ui-core@2.0.0-beta.7) (2020-09-11)


### Bug Fixes

* **textfield:** increase zIndex icon with onClick handler ([f169dd5](https://github.com/MegafonWebLab/megafon-ui/commit/f169dd5c1200193868ddfbd637e8ff3aeb90e904))





# [2.0.0-beta.6](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.5...@megafon/ui-core@2.0.0-beta.6) (2020-09-10)


### Bug Fixes

* export interfaces ([275c2e1](https://github.com/MegafonWebLab/megafon-ui/commit/275c2e1f94ea69f7a29e4b3590504dd2def32ac1))





# [2.0.0-beta.5](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.4...@megafon/ui-core@2.0.0-beta.5) (2020-09-09)


### Bug Fixes

* **textfield:** fix Verification type ([2911a94](https://github.com/MegafonWebLab/megafon-ui/commit/2911a9447126a3d24206a995e456884badfac7d6))





# [2.0.0-beta.4](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.3...@megafon/ui-core@2.0.0-beta.4) (2020-09-07)


### Bug Fixes

* **select:** add data attrs prop ([554a173](https://github.com/MegafonWebLab/megafon-ui/commit/554a17388009f52a335273729343b938d952848a))





# [2.0.0-beta.3](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.2...@megafon/ui-core@2.0.0-beta.3) (2020-09-01)


### Bug Fixes

* add data attributes prop ([8f38c20](https://github.com/MegafonWebLab/megafon-ui/commit/8f38c2045f9bf7c4829946edf2071be6fe6a07df))





# [2.0.0-beta.2](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.1...@megafon/ui-core@2.0.0-beta.2) (2020-08-31)


### Bug Fixes

* **textfield:** new prop classes ([d66340f](https://github.com/MegafonWebLab/megafon-ui/commit/d66340fbb4f1242b61e988c566efccc75ac066ca))





# [2.0.0-beta.1](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@2.0.0-beta.0...@megafon/ui-core@2.0.0-beta.1) (2020-08-27)


### Bug Fixes

* **textfield:** fix placeholder in ie ([603bf8f](https://github.com/MegafonWebLab/megafon-ui/commit/603bf8f14e5cee27c6fcca6ac28bb696d5ee54c4))





# [2.0.0-beta.0](https://github.com/MegafonWebLab/megafon-ui/compare/@megafon/ui-core@1.4.0...@megafon/ui-core@2.0.0-beta.0) (2020-08-26)

### BREAKING CHANGES

- **styles:**
    - changed classname prefix for beta
- **Notification**
    - added new component
- **Carousel**
    - removed touchStart and touchMove events
    - removed touch-action for slick-list
    - added pinch-zoom touch action for slick-track
    - fixed bug with first click on
    item after swipe
- **List**
    - added list-style rules
- **Colors**
    - added documentation for guide colors
    - deleted Mandarin color, added border only for white color
- **BubbleHint**
    - synchronized colors according to the guide
- **Button**
    - synchronized colors according to the guide
- **CarouselArrow**
    - synchronized colors according to the guide
- **Checkbox**
    - synchronized colors according to the guide
- **DropdownSocialList**
    - synchronized colors according to the guide
- **Select**
    - added new functional
    - synchronized colors according to the guide
- **SelectItem**
    - added new functional
    - synchronized colors according to the guide
- **TextField**
    - synchronized colors according to the guide
    - add focus in input after click on clear icon
    - add vertical resize to textarea
    - fix password placeholder
    - update documentation
    - fixed placeholder for ie11
- **TextLink**
    - synchronized colors according to the guide
- **Icons**
    - synchronized colors according to the guide
- **ProductCardInfo**
    - synchronized colors according to the guide
- **ProductCardTotal**
    - synchronized colors according to the guide
- **ProductCardWrapper**
    - synchronized colors according to the guide
- **ProductCardSwitcher**
    - synchronized colors according to the guide
- **ProductCardTile**
    - synchronized colors according to the guide
- **ProductCardTileCashback**
    - synchronized colors according to the guide
- **ProductCardTileHint**
    - synchronized colors according to the guide
- **ProductCardTileOptions**
    - synchronized colors according to the guide
- **ProductCardTileRest**
    - synchronized colors according to the guide
- **RadioButton**
    - added new component
- **Counter**
    - added new component
    - synchronized colors according to the guide
- **Preloader**
    - added new component
    - fixed tslint errors
- **Header**
    - correct header css for style guide, delete h6 props
    - updated documentation
    - synchronized colors according to the guide
    - add hAlign prop width default value 'inherit'
    - fix children type
- **cn**
    - add variability to add arguments
    - rename `cn` to `cnCreate`
    - allow use undefined in array of custom classes
    - fix bug with extra space for empty string in array of custom classes
- **Switcher**
    - added new component
    - added examples and description in .mdx
    - added tests
    - synchronized colors according to the guide
- **Carousel**
    - add onSwipe callback
    - fix touch events
    - synchronized colors according to the guide
- **ContentArea**
    - add basic colors for `outerBackgroundColor` and `innerBackgroundColor`
    - changed the parameter name from `lg` in the `innerPadding` property to `default`
    - synchronized colors according to the guide
- **Accordion**
    - add Accordion component
    - fixed title style, text padding, border-bottom in opened accordion
- **Paragraph**
    - update with a new guide
    - update test
    - add inherit color
- **Grid**
    - fix children type
    - add left to hAlight prop
- **GridColumn**
    - fix children type
    - rename offset props to leftOffset
    - add rightOffset props

## Release 1.4.1
- **Carousel**
    - update classes prop
- **Checkbox**
    - checkbox with small label taken out as a separate example

## Release 1.4.0
- **Button**
    - add font-color for hover button type
- **GridColumn**
    - add offset props
- **ContentArea**
    - `mobileInnerPadding` and `className` properties added
- **Paragraph**
    - line-height in mixin for small font fixed according to the guide

## Release 1.3.4
- **Carousel**
    - add classes props for flexible styling of the component

## Release 1.3.3
- **Carousel**
    - remove margin beetween slides in landing theme

## Release 1.3.2
- **Carousel**
    - fix slick slide padding for lk themed carousel

## Release 1.3.1
- **Carousel**
    - added top and bottom padding for overflow slide content

## Release 1.3.0
- **GridColumn**
    - add `order` property for all screens

## Release 1.2.0
- **Carousel**
    - `hasPaddingBetweenSlides` property added (zero padding between slides)
    - fix showcase slider padding

## Release 1.1.0
- **Carousel**
    - new prop `onBeforeChange` added

## Release 1.0.21
- **GridColumn**
    - add box-sizing: border-box in less
    - fix gutters width and height for mobile devices
- **Button**
    - fixed disabled state for tag a (block onClick calls, cancel following link, change color)
    - fixed display target attribute for tag button
    - fixed display type attribute for tag a
    - added tests
    - added usage example for disabled, href, target

## Release 1.0.20
- **Icons**
    - update basic icons

## Release 1.0.19
- **package.json**
    - updated version, publish patch fix

## Release 1.0.18
- **Carousel**
    - fix slick-track height for "lk" theme
    - fix slick-list height for "lk" theme

## Release 1.0.17
- **Carousel**
    - new theme `lk` created

## Release 1.0.16
- **Select**
    - import fix
- **Textarea**
    - import fix
- **TextField**
    - import fix
- **InputLabel**
    - import fix

## Release 1.0.15
- **Carousel**
    - fix slick-track `z-index`
    - `overflow: hidden` added for slick-list

## Release 1.0.14
- **Select**
    - `label` and `onCustomIconClick` props added
- **Textarea**
    - `label` prop added
- **TextField**
    - `label` prop added
- **InputLabel**
    - component added

## Release 1.0.13
- **Checkbox**
    - added new component
    - added examples and description in .mdx
    - added tests
    - replaced property size with fontSize
    - fix hover with touch events detector
- **detectTouch**
    - fixed return undefined
- **Select**
    - fixed hover with touch events detector
- **Textarea**
    - fixed hover with touch events detector
- **TextField**
    - fixed hover with touch events detector
- **package.json**
    - updated deep-equal module

## Release 1.0.12
- **Paragraph**
    - edit styles according to the guide
    - add `default` value for `marginAll` prop
- **Header**
    - edit styles according to the guide

## Release 1.0.11
- **Button**
    - few values of properties `passiveColor` and `disabledColor` was deprecated
    - new values for properties `passiveColor` and `disabledColor` was added

## Release 1.0.10
- **ContentArea**
    - fixed typing in test case file
- **Select**
    - fix hover with touch events detector
    - fixed examples
- **Textarea**
    - fix hover with touch events detector
- **TextField**
    - fix hover with touch events detector
    - fixed and added examples
    - fixed password type component
    - removed clear and reveal icons for Edge

## Release 1.0.9
- **ContentArea**
    - added new component
    - added tests

## Release 1.0.8
- **Carousel**
    - fixed bug with lost position

## Release 1.0.7
- **Grid**
    - add examples and descriprion in .mdx
- **GridColumn**
    - change description for props
- **Select**
    - add disabled mod
- **TextField**
    - add styles and icon for input type="password"
- **BubbleHint**
    - changed styles in accordance with the requirements of the guide

## Release 1.0.6
- **Grid**
    - add examples in .mdx
    - fixed value for prop 'hAlign'
    - added tests
- **GridColumn**
    - fixed types for props
    - added tests

## Release 1.0.5
- **GridColumn**
    - fixed empty array for prop 'wide'

## Release 1.0.4
- **Carousel**
    - fix 'pointer-events' for disabled arrow

## Release 1.0.3
- **Grid**
    - add new component
    - add typescript
- **GridColumn**
    - add new component
    - add typescript

## Release 1.0.2
- **Carousel**
    - fix bottom padding in less
