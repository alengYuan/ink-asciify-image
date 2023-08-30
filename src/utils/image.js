import { Chalk } from 'chalk'
import jimp from 'jimp/es/index'
import { getNumberArray } from './array.js'
import { zero, one, two, three } from './number.js'

const chalk = new Chalk({ level: 3 })

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
export const asciifyImage = async(url, options) => {
    if (
        !(
            Number.isInteger(options.width) &&
            options.width > zero &&
            Number.isInteger(options.height) &&
            options.height > zero
        )
    ) {
        throw new RangeError(
            'Value of "width" or "height" must be natural number.',
        )
    }

    const mosaicAssetList =
        // eslint-disable-next-line max-len
        "....''''````^^^^\"\"\",,,,::::;;;;IIIllll!!!!iiii>>><<<<~~~~++++___----????]]]][[[}}}}{{{{1111)))((((||||////tttffffjjjjrrrrxxxnnnnuuuuvvvvccczzzzXXXXYYYYUUUJJJJCCCCLLLLQQQ0000OOOOZZZZmmmwwwwqqqqppppdddbbbbkkkkhhhhaaaoooo****####MMMWWWW&&&&8888%%%BBBB@@@@$$$$"

    const image = await jimp.read(url)
    image.resize(
        options.width,
        Math.round(options.height / (options.tryCorrectAspectRatio ? two : one)),
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
                    ? options.renderInTwoBit
                        ? mosaicAssetList[
                            Math.floor(
                                (three /
                                      // eslint-disable-next-line no-mixed-operators
                                      (one / red + one / green + one / blue) *
                                      alpha) **
                                      (one / two),
                            )
                        ]
                        : chalk.rgb(red, green, blue)(mosaicAssetList[alpha])
                    : ' '
            }`
        }

        asciiList.push(ascii)
    }

    if (options.tryCorrectAspectRatio) {
        const filler = ' '.repeat(options.width)
        const missingLineCount = options.height - image.bitmap.height

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