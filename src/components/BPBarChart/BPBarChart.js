import React from 'react'
import { View } from 'react-native'
import { StackedBarChart , Grid} from 'react-native-svg-charts'
import { Colors } from '../../theme'
import * as scale from 'd3-scale'
import {Text} from 'react-native-svg'
const BPBarChart = ({data,color, rightTextColor}) => {
    
    const colors = [ color, Colors.transparent,]
    const keys = ['p', 'a']


        const Labels = ({  x, y, bandwidth, data }) => (
            data.map(({p,a}, index) => (
                <React.Fragment  key={ Math.floor(100000000 + Math.random() * 900000000)}>
                <Text
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
                    x={ 22 }
                    y={ y(index) + (bandwidth / 2) }
                    fontSize={ 10 }
                    fill={ Colors.white }
                    alignmentBaseline={ 'middle' }
                >
                    {a}
                </Text>
                </React.Fragment>
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
