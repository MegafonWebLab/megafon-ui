const packageJson = require('./package.json');
import path from 'path';
import { defineConfig } from 'rollup';
import del from 'rollup-plugin-delete';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonJsResolve from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import compileDts from 'rollup-plugin-dts';
import { DEFAULT_EXTENSIONS } from '@babel/core';

const dist = path.join(__dirname, 'dist');
const distLib = path.join(dist, 'lib');
const distEs = path.join(dist, 'es');
const entry = path.join(__dirname, 'src', 'index.ts');

const extensions = [
    ...DEFAULT_EXTENSIONS,
    '.ts',
    '.tsx'
];

export default defineConfig([
    {
        input: entry,
        output: [
            {
                file: packageJson.typings,
                format: 'es',
            },
        ],
        plugins: [
            del({ targets: dist }),
            compileDts()
        ],
    },
    {
        input: entry,
        output: [
            {
                dir: distLib,
                format: 'cjs',
                exports: 'auto',
                preserveModules: true,
            },
            {
                dir: distEs,
                format: 'es',
                exports: 'auto',
                preserveModules: true,
            }
        ],
        external: [
            ...Object.keys(packageJson.dependencies),
            'react',
            /core-js/,
            /@babel\/runtime/,
        ],
        plugins: [
            nodeResolve({
                extensions,
            }),
            commonJsResolve({
                include: /node_modules/,
            }),
            babel({
                extensions,
                babelHelpers: 'runtime',
                exclude: /node_modules/,
            }),
        ],
    }
]);
