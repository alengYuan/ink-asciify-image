// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Box, Text } from 'ink'
import { useInkAsciifyImage } from './model.js'
import { one } from '../../utils/number.js'

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
export const InkAsciifyImage = props => {
    const { width, height, renderedObject } = useInkAsciifyImage(props)

    return (
        <Box
            width={width}
            height={height}
            flexDirection="column"
            overflow="hidden"
            {...(typeof renderedObject === 'string'
                ? {
                    paddingX: one,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderStyle: 'round',
                    borderColor: 'red',
                    borderDimColor: true,
                }
                : {})}
        >
            {typeof renderedObject === 'string'
                ? <Text color="red" dimColor italic>
                    {renderedObject}
                </Text>
                : renderedObject.map((renderedString, index) =>

                    <Text key={index}>{renderedString}</Text>)
            }
        </Box>
    )
}