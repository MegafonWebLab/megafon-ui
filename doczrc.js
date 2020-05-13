export default {
    title: 'MegaFon UI',
    description: 'Megafon React UI Kit',
    base: '/megafon-ui/',
    dest: 'docs',
    typescript: true,
    protocol: 'http',
    ignore: [
        /node_modules/,
        /README.md/,
        /CONTRIBUTING.md/,
        /CHANGELOG.md/,
        /.docz/
    ],
    menu: [
        'Beginning of work',
        'Components',
        'Icons'
    ],
    notUseSpecifiers: true,
    filterComponents: files =>
        files
        .filter(p => p.search('/src') !== -1)
        .filter(p => !/.test|.docz/.test(p))
        .filter(filepath => /[w-]*.(js|jsx|ts|tsx)$/.test(filepath)),
};