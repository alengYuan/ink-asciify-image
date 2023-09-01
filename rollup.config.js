import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import cjsToMjs from 'rollup-plugin-cjs-es'

export default {
    input: './src/utils/image.js',
    output: {
        file: './dist/utils/image.js',
        format: 'es',
        sourcemap: true,
    },
    plugins: [
        cjsToMjs({
            cache: './buildCache4Regulate',
            nested: true,
        }),
        nodeResolve({
            exportConditions: ['node'],
            preferBuiltins: true,
        }),
        terser(),
    ],
    onwarn: () =>
        void null,
}