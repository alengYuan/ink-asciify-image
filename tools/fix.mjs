import { readFile, writeFile } from 'node:fs/promises'

const patchedTargetPath = './dist/utils/image.js'
const encoding = 'utf8'

// eslint-disable-next-line no-console
console.log(`\x1b[0;33mFixing "${patchedTargetPath}"...\x1b[0m`)

const patchSchemeList = {
    // eslint-disable-next-line no-template-curly-in-string
    '`${__dirname}/../`': '"~/"',
}

let code = await readFile(patchedTargetPath, { encoding })

for (const key in patchSchemeList) {
    // @ts-ignore
    code = code.replace(key, patchSchemeList[key])
}

writeFile(patchedTargetPath, code, { encoding })

// eslint-disable-next-line no-console
console.log('\x1b[0;32mComplete!\x1b[0m')