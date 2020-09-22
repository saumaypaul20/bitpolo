import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Platform,
} from 'react-native';
import BPText from '../../common/BPText/BPText';
import {Images, Colors} from '../../theme';
import BPBarChart from '../BPBarChart/BPBarChart';
import PickerComp from '../PickerComp/PickerComp';
import {useNavigation} from '@react-navigation/native';
import {screenNames} from '../../routes/screenNames/screenNames';
import {emitDepthSubscribeEvent} from '../../api/config.ws';
import {useSelector, shallowEqual} from 'react-redux';
import FlatLists from '../../common/FlatlistComp/FlatList';
import _ from 'lodash';
import {
  equalityFnMarket,
  equalityFnDepths,
  equalityFnIndexPrice,
} from '../../utils/reduxChecker.utils';
let id = 0;

const CurrentMarketPrice = ({activeTradePair}) => {
  const market_data = useSelector(
    state =>
      state.marketReducer.data.filter(i => i.params[0] === activeTradePair),
    equalityFnMarket,
  );
  let found = market_data[0];

  let index_price = useSelector(
    state => state.marketReducer.index_price,
    equalityFnIndexPrice,
  );

  //console.log("ABCD#####", found)
  if (found && index_price) {
    return (
      <BPText
        style={{
          color:
            parseFloat(found.params[1].cp) > -1
              ? Colors.lightGreen
              : Colors.red,
          padding: 5,
        }}>
        {`${parseFloat(found.params[1].l).toFixed(2)}`}{' '}
        <BPText style={{color: Colors.lightWhite, fontSize: 12}}>
          {found?.divider.b === 'USDT'
            ? `₹` +
              (
                parseFloat(found?.params[1]?.l) *
                index_price.find(i => i.asset === 'USDT').amount
              ).toFixed(2)
            : `$` +
              (
                parseFloat(found?.params[1]?.l) /
                index_price.find(i => i.asset === 'USDT').amount
              ).toFixed(2)}
        </BPText>
      </BPText>
    );
  } else {
    return <BPText style={{padding: 5}}>--</BPText>;
  }
};

const TradesLeftCol = () => {
  //   console.log('trades left reload +++++++++++++++++');
  const navigation = useNavigation();

  const asksLength = useSelector(
    state => state.depthSubsReducer.asks.slice(0, 22).length,
    shallowEqual,
  );
  const bidsLength = useSelector(
    state => state.depthSubsReducer.bids.slice(0, 22).length,
    shallowEqual,
  );
  const activeTradePair = useSelector(
    state => state.marketReducer.activeTradePair,
    shallowEqual,
  );

  const currencies = useSelector(
    state =>
      state.marketReducer.currencies.find(i => i.value === activeTradePair),
    shallowEqual,
  );
  const list1 = [
    {label: 'Default', value: '0'},
    {label: 'Sells', value: 'sells'},
    {label: 'Buys', value: 'buys'},
  ];
  const [list1val, setList1Val] = useState(null);
  const [lineNumbers, setlineNumbers] = useState(10);
  const [height, setheight] = useState(245);
  const [activeBPchart, setactiveBPchart] = useState(list1[0]);
  // alert(JSON.stringify(activeBPchart));
  const onBPValChange = val => {
    setList1Val(val);
    // alert(val.value);
    switch (val.value) {
      case '0':
        setlineNumbers(10);
        setheight(245);
        setactiveBPchart(val);
        break;
      default:
        setheight(490);
        setactiveBPchart(val);
        setlineNumbers(20);
        break;
    }
  };

  const OpenOrders = () => {
    navigation.navigate(screenNames.ORDERS);
  };

  // useEffect(() => {
  //   onBPValChange(list1[0]);
  // }, []);

  return (
    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.darkGray2,
          alignSelf: 'stretch',
          paddingVertical: 10,
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
          onPress={() => OpenOrders()}>
          <Image
            source={Images.open_orders_icon}
            style={{width: 20, height: 20}}
          />
          <BPText style={{marginHorizontal: 10}}>Open Orders</BPText>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'stretch',
          justifyContent: 'space-around',
          paddingVertical: 15,
          alignItems: 'center',
        }}>
        <BPText style={{fontSize: 10}}>{`Amount(${currencies?.a})`}</BPText>
        <BPText style={{fontSize: 10}}>{`Price(${currencies?.b})`}</BPText>
      </View>

      {/* Red Chart 1 */}
      {(activeBPchart.value === 'sells' || activeBPchart.value === '0') && (
        <View
          style={{
            height: asksLength === 0 ? height : 'auto',
            alignSelf: 'stretch',
            width: '97%',
          }}>
          {asksLength > 0 ? (
            <AsksList lineNumbers={lineNumbers} />
          ) : (
            <ActivityIndicator size="large" color={Colors.white} />
          )}
        </View>
      )}
      {/* Divider with Value */}
      <View
        style={{
          height: 40,
          alignSelf: 'stretch',
          justifyContent: 'center',
          alignItems: 'center',
          width: '97%',
        }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: Colors.gray,
            borderStyle: 'dashed',
            alignSelf: 'stretch',
            borderRadius: 1,
          }}
        />

        <CurrentMarketPrice activeTradePair={activeTradePair} />

        <View
          style={{
            borderWidth: 1,
            borderColor: Colors.gray,
            borderStyle: 'dashed',
            alignSelf: 'stretch',
            borderRadius: 1,
          }}
        />
      </View>
      {/* Green Chart 1 */}
      {(activeBPchart.value === 'buys' || activeBPchart.value === '0') && (
        <View
          style={{
            height: asksLength === 0 ? height : 'auto',
            alignSelf: 'stretch',
            paddingBottom: 2,
            width: '97%',
          }}>
          {bidsLength > 0 ? (
            <BidsList lineNumbers={lineNumbers} />
          ) : (
            <ActivityIndicator size="large" color={Colors.white} />
          )}
        </View>
      )}
      <View
        style={{
          alignSelf: 'stretch',
          flexDirection: 'row',
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}>
        <View
          style={{
            flex: 1,
            borderRadius: 2,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            alignSelf: 'stretch',
            borderWidth: 1,
            borderColor: Colors.gray,
            opacity: 1,
            padding: 5,
          }}>
          <PickerComp
            items={list1}
            pickerVal={activeBPchart}
            setPickerVal={onBPValChange}
            chevronPositionTop={8}
            chevronPositionRight={0}
            chevronSize={10}
            // height={Platform.OS == 'android' ? 20 : 30}
            width={160}
            scale={0.7}
            color={Platform.OS === 'android' ? Colors.white : Colors.primeBG}
            marginLeft={-20}
            placement={'top'}
          />
        </View>
      </View>
    </View>
  );
};

const BidsList = ({lineNumbers}) => {
  const bids = useSelector(
    state => state.depthSubsReducer.bids,
    equalityFnDepths,
  );
  return bids.length > 0 ? (
    <FlatLists data={bids} lineNumbers={lineNumbers} type={0} />
  ) : (
    <ActivityIndicator
      style={{height: 245, justifyContent: 'center', alignItems: 'center'}}
    />
  );
  // return <BPBarChart data={bids} color={Colors.lightRed} rightTextColor={Colors.red}/>
};

const AsksList = ({lineNumbers}) => {
  const asks = useSelector(
    state => state.depthSubsReducer.asks,
    equalityFnDepths,
  );
  return asks.length > 0 ? (
    <FlatLists data={asks} lineNumbers={lineNumbers} type={1} />
  ) : (
    <ActivityIndicator
      style={{height: 245, justifyContent: 'center', alignItems: 'center'}}
    />
  );
};

export default TradesLeftCol;
