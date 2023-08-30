import { runAsWorker } from 'synckit'
import { asciifyImage } from '../../utils/image.js'

runAsWorker(asciifyImage)