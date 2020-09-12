import React from 'react';
import {View, Dimensions, ActivityIndicator} from 'react-native';
import _ from 'lodash';
import WebView from 'react-native-webview';
import {connect} from 'react-redux';
import {Colors} from '../../theme';
import {updateKlineBool} from '../../redux/actions/kline.actions';
// const myHtmlFile = require("../../../android/app/src/main/assets/tchart.html");

class TradeChart extends React.PureComponent {
  constructor(props) {
    super(props);
    // this.update= false
    this.width = this.props.width;
    this.getdata = this.getdata.bind(this);
    this.state = {
      load: false,
    };
  }
  componentDidMount() {
    this.width = this.props.width;
    setTimeout(() => {
      this.setState({load: true});
    }, 1000);

    this.getdata();
  }
  getdata = () => {
    let arr = this.props.klineQ;
    if (this.props.kline.length > 0) {
      arr = this.props.klineQ.concat(this.props.kline);
      this.props.updateKlineBool(true);
    }
    if (this.webview)
      this.webview.postMessage(
        JSON.stringify({
          update: this.props.kline.length > 0,
          width: this.props.width,
          height: this.props.height,
          klineData: arr.map(el => {
            return {
              time:
                el.params[0].length > 10
                  ? Math.floor(new Date(el.params[0]) / 1000)
                  : el.params[0],
              low: el.params[4],
              high: el.params[3],
              open: el.params[1],
              close: el.params[2],
            };
          }),
        }),
      );
  };
  UNSAFE_componentWillReceiveProps() {
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    // console.log(this.props.kline)
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    this.getdata();

    //  this.update= true
  }

  render() {
    //     if (this.webview) this.webview.postMessage(JSON.stringify(
    //         {
    //             width: Dimensions.get("window").width,
    //             update: this.props.update

    // }));

    if (this.state.load) {
      return (
        <View
          style={{
            flex: 1,
            height: this.props.height ? this.props.height : 200,
            width: this.width,
          }}>
          {this.props.kline.length > 0 ? (
            <WebView
              source={{uri: 'file:///android_asset/tchart.html'}}
              scrollEnabled={false}
              originWhitelist={['*']}
              ref={r => (this.webview = r)}
              injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=1, maximum-scale=1, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
              style={{
                height: '100%',
                width: this.width,
                resizeMode: 'cover',
                flex: 1,
              }}
            />
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator color={Colors.white} size="large" />
            </View>
          )}
        </View>
      );
    } else {
      return null;
    }
  }
}

function mapStateToProps(state) {
  const {klineReducer} = state;
  return {kline: klineReducer.kline, klineQ: klineReducer.klineQ};
}

export default connect(
  mapStateToProps,
  {updateKlineBool},
)(TradeChart);
