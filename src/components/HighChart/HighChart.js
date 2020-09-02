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

export default class HighChart extends React.Component {
    constructor(props) {
        super(props);
        this.chartOptions = {
            chart: {
                type: 'areaspline',
                zoomType: 'xy',
                backgroundColor: Colors.primeBG,
                borderWidth: 0,
                borderColor: null
              },
              title: null,
              xAxis: {
                minPadding: 0,
                maxPadding: 0,
                 
                title: {
                //   text: 'Price'
                }
              },
              yAxis: [{
                lineWidth:0.5,
                gridLineWidth: 0,
                title: null,
                tickWidth: 1,
                tickLength: 5,
                color:'white',
                tickPosition: 'inside',
                labels: {
                  align: 'left',
                  color:'white',
                 x:8
                }
              }, {
                opposite: true,
                linkedTo: 0,
                lineWidth: 0.5,
                gridLineWidth: 0,
                title: null,
                tickWidth: 0.5,
                tickLength: 5,
                tickPosition: 'inside',
                labels: {
                  align: 'right',
                  x: -8,
                  color:'white',
                }
              }],
              legend: {
                enabled: false
              },
              plotOptions: {
                area: {
                  fillOpacity: 0.2,
                  lineWidth: 1,
                  step: 'center'
                }
              },
              tooltip: {
                headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
                valueDecimals: 2
              },
              series: [{
                name: 'Bids',
                data: this.props.bids,
                color: Colors.lightGreen
              }, {
                name: 'Asks',
                data: this.props.asks,
                color: Colors.red
              }],
              credits: false
        }
        this.state = {
            asks: this.props.asks,
            bids: this.props.bids,
            chartOptions: this.chartOptions
        };
    }

    chartUpdate() {
        this.setState({
          chartOptions: { ...this.chartOptions,
          series: [{
           name: 'Bids',
           data: this.props.bids,
           color: Colors.lightGreen
         }, {
           name: 'Asks',
           data: this.props.asks,
           color: Colors.red
         }]}
        });
    } 

    UNSAFE_componentWillReceiveProps(props){
        this.chartUpdate()
    }
    render() {
        return (
            <View style={{ backgroundColor: Colors.primeBG}}>
                {this.props.bids.length> 0 && this.props.asks.length>0 && <HighchartsReactNative
                    styles={[styles.container, {height: this.props.height? this.props.height: 230}]}
                    options={this.state.chartOptions}
                />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primeBG,
        justifyContent:'space-evenly',
 
         
    }
});