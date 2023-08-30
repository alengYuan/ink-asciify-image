import { memo } from 'react'
import { InkAsciifyImage } from './components/InkAsciifyImage/index.js'
export { asciifyImage } from './utils/image.js'

/**
 * @component
 * @type {React.FC<{
 * url:string,
 * width:number,
 * height:number,
 * tryCorrectAspectRatio?:boolean,
 * renderInTwoBit?:boolean,
 * alt?:string,
 * }>}
 */
const InkAsciifyImageWithMemo = memo(InkAsciifyImage)

export default InkAsciifyImageWithMemo