const fs = require('fs');
const backstop = require('backstopjs');
const glob = require('glob');
const config = require('./backstop');
const command = process.argv[2];

const commands = ['test', 'reference', 'approve'];

if (!commands.includes(command)) {
    return;
}

const scen = { readySelector: '#root' };
const files = glob.sync('src/components/**/*.mdx');

backstop(command, {
    config: {
        ...config,
        scenarios: files.reduce((scenariosList, file) => {
            const mdxText = fs.readFileSync(file, 'utf8')
            const textList = mdxText.split('\n');
            const routeStr = textList.find(text => text.search('route:') !== -1);
            const nameStr = textList.find(text => text.search('name:') !== -1);

            if (!routeStr || !nameStr) {
                return scenariosList;
            }

            const name = nameStr.replace('name:', '').trim();
            const route = routeStr.replace('route:', '').trim();
            const playgroundList = textList.filter(text => text.search(/\<Playground/) !== -1);

            playgroundList.forEach((test, i) => {
                scenariosList = scenariosList.concat({
                    ...scen,
                    label: `${name}-${i}`,
                    url: `http://localhost:3000/megafon-ui${route}`,
                    selectors: [`.${name}-${i}`],
                })
            });

            return scenariosList;
        }, []),
    }
});
