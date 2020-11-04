import React, {Component, PureComponent} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {Images, Colors} from '../../theme';
import BPText from '../BPText/BPText';
import _ from 'lodash';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
  setordertabamount,
  setordertabprice,
  setordertab,
} from '../../redux/actions/ordertab.actions';
import {useNavigation} from '@react-navigation/native';
const Card = props => {
  const money_prec = useSelector(
    state => state.ordertab.money_prec,
    shallowEqual,
  );
  const stock_prec = useSelector(
    state => state.ordertab.stock_prec,
    shallowEqual,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(setordertabamount(props.item.a.toFixed(stock_prec)));
        dispatch(setordertabprice(props.item.p.toFixed(money_prec)));
        if (props.type === 1) {
          dispatch(setordertab(2));
        } else {
          dispatch(setordertab(1));
        }

        if (props.inMarketPage) {
          navigation.goBack();
        }
      }}
      style={{
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        marginVertical: 3,
        paddingVertical: 2,
        marginHorizontal: 16,
      }}>
      <BPText
        style={{
          fontSize: 12,
          color: props.type == 1 ? Colors.red : Colors.lightGreen,
        }}>
        {props.item.a.toFixed(stock_prec)}
      </BPText>
      <BPText
        style={{
          fontSize: 12,
          color: props.type == 1 ? Colors.red : Colors.lightGreen,
        }}>
        {props.item.p.toFixed(money_prec)}
      </BPText>
    </TouchableOpacity>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  UNSAFE_componentWillReceiveProps(props) {
    //console.log("componentWillReceiveProps", props)
    if (props.data) {
      if (props.type == 1) {
        this.setState({
          data: _.sortBy(props.data, 'price')
            .slice(props.data.length - props.lineNumbers)
            .reverse(),
        });
      } else {
        this.setState({
          data: _.sortBy(props.data, 'price')
            .slice(props.data.length - props.lineNumbers)
            .reverse(),
        });
      }
    }
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'stretch',
          alignSelf: 'stretch',
        }}>
        {this.state.data.length > 0 ? (
          <FlatList
            contentContainerStyle={{flexGrow: 1}}
            data={this.state.data}
            renderItem={({item}) => (
              <Card
                item={item}
                type={this.props.type}
                inMarketPage={this.props.inMarketPage}
              />
            )}
            //Setting the number of column
            getItemLayout={(data, index) => {
              return {
                index,
                length: 30, // itemHeight is a placeholder for your amount
                offset: index * 30,
                width: '100%',
              };
            }}
            listKey={(item, index) => this.props.type + item.p.toString()}
            keyExtractor={(item, index) => this.props.type + item.p.toString()}
          />
        ) : null}
      </View>
    );
  }
}

export default App;
