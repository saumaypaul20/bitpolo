import React from 'react'
import { View } from 'react-native'
import { StackedBarChart , Grid} from 'react-native-svg-charts'
import { Colors } from '../../theme'
import * as scale from 'd3-scale'
import {Text} from 'react-native-svg'
const BPBarChart = ({data,color, rightTextColor}) => {
    const idata = [
        
        {
            a: 330,
            aam: 22
        },
        {
            apples: 1330,
            aam: 22
        },
        {
            apples: 2330,
            aam: 22
        },
        {
            apples: 3330,
            aam: 22
        },
        {
            apples: 3150,
            aam: 22
        },
        {
            apples: 300,
            aam: 22
        },
        {
            apples: 350,
            aam: 22
        },
        {
            apples: 1330,
            aam: 22
        },
        {
            apples: 2330,
            aam: 22
        },
         
    ]

    const colors = [Colors.transparent, color]
    const keys = ['a', 'p']


        const Labels = ({  x, y, bandwidth, data }) => (
            data.map(({p,a}, index) => (
                <>
                <Text
                    
                    key={ index.toString() }
                    x={  171 }
                    y={ y(index) + (bandwidth / 2) }
                    fontSize={ 10 }
                    textAnchor="end"
                    fill={ rightTextColor }
                    alignmentBaseline={"middle"}
                >
                    {p}
                </Text>
                <Text
                    
                    key={ ((index+1)*20).toString() }
                    x={ x(a) + 22 }
                    y={ y(index) + (bandwidth / 2) }
                    fontSize={ 10 }
                    fill={ Colors.white }
                    alignmentBaseline={ 'middle' }
                >
                    {a}
                </Text>
                </>
            ))
        )


    return (
        <StackedBarChart
            style={{ height: '100%'  }}
            keys={keys}
            spacingInner={0.2}
            valueAccessor={ ({ item, key }) => item[key]}
            numberOfTicks={200}
            
            colors={colors}
            data={data}
            showGrid={false}
            // contentInset={{  bottom: 50 }}
            horizontal
            spacing={0.2}
            gridMin={0}
        >
        <Grid direction={Grid.Direction.VERTICAL}/>
            <Labels />
        </StackedBarChart>
    )
}

export default BPBarChart
