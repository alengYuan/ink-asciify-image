import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

export default {
    input: './src/utils/image.js',
    output: {
        file: './dist/utils/image.js',
        format: 'es',
        sourcemap: true,
    },
    plugins: [
        json(),
        commonjs(),
        nodeResolve({
            exportConditions: ['node'],
            preferBuiltins: true,
        }),
        terser(),
    ],
    onwarn: () =>
        void null,
}