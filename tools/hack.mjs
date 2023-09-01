import { readFile, writeFile } from 'node:fs/promises'

const encoding = 'utf8';
(async() => {
    const patchedTargetPath = './node_modules/ink/package.json'

    // eslint-disable-next-line no-console
    console.log(`\x1b[0;33mHacking "${patchedTargetPath}"...\x1b[0m`)

    const patchSchemeList = {
        types: 'build/',
    }

    const config = JSON.parse(await readFile(patchedTargetPath, { encoding }))

    for (const key in patchSchemeList) {
        // @ts-ignore
        !config[key] && (config[key] = patchSchemeList[key])
    }

    writeFile(patchedTargetPath, JSON.stringify(config, null, '  '), {
        encoding,
    })
})();
(async() => {
    const patchedTargetPath = './node_modules/pngjs/lib/png.js'

    // eslint-disable-next-line no-console
    console.log(`\x1b[0;33mHacking "${patchedTargetPath}"...\x1b[0m`)

    const patchSchemeList = {
        'let PNG = (exports.PNG = function (options) {':
            'function PNG(options) {',
        '});': '}',
    }

    let code = await readFile(patchedTargetPath, { encoding })

    for (const key in patchSchemeList) {
        // @ts-ignore
        code = code.replace(key, patchSchemeList[key])
    }

    writeFile(patchedTargetPath, `${code}\nexports.PNG = PNG`, { encoding })
})()

// eslint-disable-next-line no-console
console.log('\x1b[0;32mComplete!\x1b[0m')