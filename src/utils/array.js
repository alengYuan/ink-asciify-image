import { zero, one } from './number.js'

/**
 * @param {number} length
 * @returns {Array<number>}
 */
export const getNumberArray = length => {
    const array = new Array(length)

    let item = zero
    while (item < length) {
        array[item] = item
        item += one
    }

    return array
}