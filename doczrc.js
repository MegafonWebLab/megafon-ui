export const defaultNameYamlPlugin = function() {
    return function parse(ast, file) {
        const [first] = ast.children || [];
        if (first && first.type !== 'yaml' ) {
            const clone = [...ast.children];
            ast.children = [{
                type: 'yaml',
                value: "name: ",
                position: {
                    start: { line: 1, column: 1, offset: 0 },
                    end: { line: 3, column: 4, offset: 62 },
                    indent: [ 1, 1, 1, 1 ]
                },
                data: {
                    parsedValue: { name: " " },
                },
            }].concat(clone);
            ast.position.end.line += 3;
        }

        return ast;
    }
}

export default {
    title: 'MegaFon UI',
    description: 'Megafon React UI Kit',
    base: '/EqR2rxoML8',
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
        'Введение',
        'Компоненты',
        'Конструктор',
        'Иконки',
        'Цвета'
    ],
    mdPlugins: [[defaultNameYamlPlugin, { type: 'name' }]],
    notUseSpecifiers: true,
    filterComponents: files =>
        files
        .filter(p => p.search('/src') !== -1)
        .filter(p => !/.test|.docz/.test(p))
        .filter(filepath => /[w-]*.(js|jsx|ts|tsx)$/.test(filepath)),
};
