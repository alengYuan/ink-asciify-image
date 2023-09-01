import { Chalk } from 'chalk'
import configureJimp from '@jimp/custom'
import jpeg from '@jimp/jpeg'
import png from '@jimp/png'
import bmp from '@jimp/bmp'
import resize from '@jimp/plugin-resize'
import { getNumberArray } from './array.js'
import { zero, one, two, three } from './number.js'

const chalk = new Chalk({ level: 3 })
const jimp = configureJimp({
    types: [jpeg, png, bmp],
    plugins: [resize],
})

/**
 * @param {string} url
 * @param {{
 * width:number,
 * height:number,
 * tryCorrectAspectRatio?:boolean,
 * renderInTwoBit?:boolean,
 * }} options
 * @returns {Promise<Array<string>>}
 * @throws {RangeError} Value of "`width`" or "`height`" must be natural number.
 */
export const asciifyImage = async(
    url,
    { width, height, tryCorrectAspectRatio, renderInTwoBit },
) => {
    if (
        !(
            Number.isInteger(width) &&
            width > zero &&
            Number.isInteger(height) &&
            height > zero
        )
    ) {
        throw new RangeError(
            'Value of "width" or "height" must be natural number.',
        )
    }

    const mosaicAssetList =
        // eslint-disable-next-line max-len
        "....''''````^^^^\"\"\",,,,::::;;;;IIIllll!!!!iiii>>><<<<~~~~++++___----????]]]][[[}}}}{{{{1111)))((((||||////tttffffjjjjrrrrxxxnnnnuuuuvvvvccczzzzXXXXYYYYUUUJJJJCCCCLLLLQQQ0000OOOOZZZZmmmwwwwqqqqppppdddbbbbkkkkhhhhaaaoooo****####MMMWWWW&&&&8888%%%BBBB@@@@$$$$"
    const maxAlpha = 255

    const image = await jimp.read(url)
    image.resize(
        width,
        Math.round(height / (tryCorrectAspectRatio ? two : one)),
    )

    /**
     * @type {Array<string>}
     */
    const asciiList = []

    for (const coordinateY of getNumberArray(image.bitmap.height)) {
        let ascii = ''

        for (const coordinateX of getNumberArray(image.bitmap.width)) {
            const {
                r: red,
                g: green,
                b: blue,
                a: alpha,
            } = jimp.intToRGBA(image.getPixelColor(coordinateX, coordinateY))

            ascii = `${ascii}${
                alpha
                    ? renderInTwoBit
                        ? mosaicAssetList[
                            Math.floor(
                                three * alpha /
                                      // eslint-disable-next-line no-mixed-operators
                                      (maxAlpha / red +
                                          // eslint-disable-next-line no-mixed-operators
                                          maxAlpha / green +
                                          // eslint-disable-next-line no-mixed-operators
                                          maxAlpha / blue),
                            )
                        ]
                        : chalk.rgb(red, green, blue)(mosaicAssetList[alpha])
                    : ' '
            }`
        }

        asciiList.push(ascii)
    }

    if (tryCorrectAspectRatio) {
        const filler = ' '.repeat(width)
        const missingLineCount = height - image.bitmap.height

        const topMissingLineCount = Math.round(missingLineCount / two)
        getNumberArray(topMissingLineCount).forEach(() => {
            asciiList.unshift(filler)
        })

        const bottomMissingLineCount = missingLineCount - topMissingLineCount
        getNumberArray(bottomMissingLineCount).forEach(() => {
            asciiList.push(filler)
        })
    }

    return asciiList
}