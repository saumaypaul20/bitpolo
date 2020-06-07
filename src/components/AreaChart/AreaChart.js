import React from 'react'
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { StyleSheet, View } from 'react-native'
import { Defs, LinearGradient, Stop, Text } from 'react-native-svg'
import { Colors } from '../../theme'
class AreaChart2 extends React.PureComponent {

    render() {

        const data  = [ 50, 10, 40, 95, 85, 35, 53,  24, 50, ]
        const data2 = [ 50, 10, 40, 95, 45, 35, 53,  24, 50, ].reverse()


        const Gradient = ({index, type}) => {
            
            return <Defs key={index}>
                <LinearGradient id={'gradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
                    <Stop offset={'0%'} stopColor={type === 1 ? Colors.lightRed : Colors.lightGreen} stopOpacity={0.5}/>
                    <Stop offset={'100%'} stopColor={ type === 1 ? Colors.lightRed: Colors.lightGreen} stopOpacity={0.1}/>
                </LinearGradient>
            </Defs>
        }


        return (
            <View style={ { height: '100%' } }>
                <AreaChart
                    style={ { flex: 1 } }
                    data={ data }
                    svg={{ fill: 'url(#gradient)' }}
                    contentInset={ { top: 20, bottom: 20 } }
                    curve={ shape.curveNatural }
                >
                    <Grid/>
                    <Gradient type={1}/>
                </AreaChart>
                <AreaChart
                    style={ StyleSheet.absoluteFill }
                    data={ data2 }
                    svg={{ fill: 'url(#gradient)' }}
                    contentInset={ { top: 20, bottom: 20 } }
                    curve={ shape.curveNatural }
                >
                    <Gradient type={2}/>
                    
                </AreaChart>
            </View>
        )
    }

}

export default AreaChart2