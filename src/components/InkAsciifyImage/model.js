import { createRequire } from 'node:module'
import { useMemo } from 'react'
import { createSyncFn } from 'synckit'

const require = createRequire(import.meta.url)

/**
 * @type {(url:string,options:{
 * width:number,
 * height:number,
 * tryCorrectAspectRatio?:boolean,
 * renderInTwoBit?:boolean,
 * })=>Array<string>}
 * @throws {RangeError} Value of "`width`" or "`height`" must be natural number.
 */
const asciifyImage = createSyncFn(require.resolve('./worker'))

/**
 * @param {{
 * url:string,
 * width:number,
 * height:number,
 * tryCorrectAspectRatio?:boolean,
 * renderInTwoBit?:boolean,
 * alt?:string,
 * }} props
 */
export const useInkAsciifyImage = ({
    url,
    width,
    height,
    tryCorrectAspectRatio,
    renderInTwoBit,
    alt,
}) => {
    const renderedObject = useMemo(() => {
        try {
            return asciifyImage(url, {
                width,
                height,
                tryCorrectAspectRatio,
                renderInTwoBit,
            })
        } catch (error) {
            return (
                alt ||
                (error instanceof Error
                    ? error.message
                    : 'Image failed to load.')
            )
        }
    }, [url, width, height, tryCorrectAspectRatio, renderInTwoBit, alt])

    return { width, height, renderedObject }
}