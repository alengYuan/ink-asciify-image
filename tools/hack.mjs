import { readFile, writeFile } from 'node:fs/promises'

const patchedTargetPath = './node_modules/ink/package.json'
const encoding = 'utf8'

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

writeFile(patchedTargetPath, JSON.stringify(config, null, '  '), { encoding })

// eslint-disable-next-line no-console
console.log('\x1b[0;32mComplete!\x1b[0m')