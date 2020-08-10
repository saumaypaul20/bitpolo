import React from 'react';
import {
    StyleSheet,
    WebView,
    Text,
    View,
    Button
} from 'react-native';
import HighchartsReactNative from '@highcharts/highcharts-react-native'
import { Colors } from '../../theme';

export default class TradeViewChart extends React.Component {
    constructor(props) {
        super(props);
        console.log("******")
        console.log("json", this.props.data)
        console.log("*****")
        this.chartOptions = {
        
     
      rangeSelector: {
        selected: 1
    },

    isStock:true,
    title: {
        text: 'AAPL Stock Price'
    },
    responsive: {
        rules: [{
            condition: {
                maxWidth: 200
            },
            chartOptions: {
                chart: {
                    height: 300
                },
                subtitle: {
                    text: null
                },
                navigator: {
                    enabled: false
                }
            }
        }]
    },
    series: [{
        type: 'candlestick',
        name: 'AAPL Stock Price',
        data: this.props.data,
        dataGrouping: {
            units: [
                [
                    'week', // unit name
                    [1] // allowed multiples
                ], [
                    'month',
                    [1, 2, 3, 4, 6]
                ]
            ]
        }
    }],
              credits: false
        }
        this.state = {
            data: this.props.data,
            chartOptions: this.chartOptions
        };
    }

    chartUpdate() {
        this.setState({
          chartOptions: { ...this.chartOptions,
          series: [{
            name: 'AAPL',
            type: 'candlestick',
            data: this.props.data,
            tooltip: {
              valueDecimals: 2
            }
          }]}
        });
    } 

    // UNSAFE_componentWillReceiveProps(props){
    //     this.chartUpdate()
    // }
    render() {
        return (
            <View style={{ backgroundColor: Colors.primeBG}}>
                { <HighchartsReactNative
                    styles={styles.container}
                    options={this.state.chartOptions}
                    modules={['accessibility,draggable-points']}
                />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primeBG,
        justifyContent:'space-evenly',
 
        height:230,
        width:200
    }
});