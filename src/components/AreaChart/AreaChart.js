import React from 'react'
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { StyleSheet, View } from 'react-native'
import { Defs, LinearGradient, Stop, ClipPath, Rect } from 'react-native-svg'
import { Colors } from '../../theme'
 
import * as scale from 'd3-scale'

        const data  = [ 50, 10, 40, 95, 85, 35, 53,  24, 50 ]
        const data2 = [ 50, 10, 40, 95, 45, 35, 53,  24, 50 ].reverse()
        const indexToBidClipFrom = data[data.length - 1]
        const idnexToAskClipFrom = data2[0]
    

        const Gradient = ({index, type}) => {
            
            return <Defs key={index}>
                <LinearGradient id={'gradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
                    <Stop offset={'0%'} stopColor={type === 1 ? Colors.lightRed : Colors.lightGreen} stopOpacity={0.5}/>
                    <Stop offset={'100%'} stopColor={ type === 1 ? Colors.lightRed: Colors.lightGreen} stopOpacity={0.5}/>
                </LinearGradient>
            </Defs>
        }

        const Clips = ({ x, width }) => {
            console.log("width,----",width)
            console.log("x----",x)
            console.log("bid width,----",x(data[8]))
            console.log("ask width,----",width - x(data2[0]))
            return(
            <Defs key={ 'clips' }>
                   <ClipPath id={ 'clip-path-bid' } key={ '0' }>
                <Rect x={ 0 } y={ '0' } width={ x(indexToBidClipFrom) } height={ '100%' }/>
            </ClipPath>
            <ClipPath id="clip-path-ask" key={ '1' }>
                <Rect x={ x(idnexToAskClipFrom) } y={ '0' } width={ width - x(idnexToAskClipFrom) } height={ '100%' }/>
            </ClipPath>
            </Defs>
        )}

       const AreaChart2 = ()=>{
        return (
            <View style={ { height: '100%' } }>
                <AreaChart
                    style={ { flex: 1 } }
                    data={ data }
                    svg={{ fill: 'url(#gradient)' ,  clipPath: 'url(#clip-path-ask)',}}
                    contentInset={ { top: 20, bottom: 20 } }
                    curve={ shape.curveLinear }
                     xScale={ scale.scaleLinear }
                >
                    {/* <Grid/> */}
                    <Gradient type={1}/>
                      <Clips/>
                </AreaChart>
                <AreaChart
                    style={ StyleSheet.absoluteFill }
                    data={ data2 }
                    svg={{ fill: 'url(#gradient)' ,  clipPath: 'url(#clip-path-bid)',}}
                    contentInset={ { top: 20, bottom: 20 } }
                    curve={ shape.curveLinear }
                     xScale={ scale.scaleLinear }
                >
                    <Gradient type={2}/>
                      <Clips/>
                    
                </AreaChart>
            </View>
        )
        }
export default AreaChart2