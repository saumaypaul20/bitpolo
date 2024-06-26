import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon} from 'native-base';
import {Colors, Images} from '../../theme';
// import { getAuthToken, getInfoAuthToken, getDeviceId } from '../../../utils/apiHeaders.utils'
import {
  emitKlineSubscribeEvent,
  emitKlineUnsubscribeEvent,
} from '../../api/config.ws';
// import TradesLeftCol from '../../../components/TradesLeftCol/TradesLeftCol'
// import TradesRightCol from '../../../components/TradesRightCol/TradesRightCol'
import {getMatchingMarketList} from '../../api/markets.api';
import {splitIt} from '../../utils/converters';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {
  storeCurrencies,
  setActiveTradePair,
} from '../../redux/actions/markets.action';
import {useNavigation} from '@react-navigation/native';
import BPText from '../../common/BPText/BPText';
import TradeChart from '../../components/AreaChart/TradeChart';
import {
  equalityFnIndexPrice,
  equalityFnMarket,
  equalityFnFavs,
} from '../../utils/reduxChecker.utils';
import DepthChart from '../../components/AreaChart/DepthChart';
import TimeComp from '../../components/TimeComp/TimeComp';
import Modal from 'react-native-modal';

const DEV_HEIGHT = Dimensions.get('window').height;
const DEV_WIDTH = Dimensions.get('window').width;

const HeaderComp = () => {
  let index_price = useSelector(
    state => state.marketReducer.index_price,
    equalityFnIndexPrice,
  );
  const activeTradePair = useSelector(
    state => state.marketReducer.activeTradePair,
    shallowEqual,
  );
  const market_data = useSelector(
    state =>
      state.marketReducer.data.filter(i => i.params[0] === activeTradePair),
    equalityFnMarket,
  );
  let found = market_data.find(i => i.params[0] === activeTradePair);
  const activecurrency = useSelector(
    state =>
      state.marketReducer.currencies.find(i => i.value === activeTradePair),
    shallowEqual,
  );

  return found && activecurrency ? (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'stretch',
          paddingHorizontal: 16,
        }}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            paddingRight: 10,
          }}>
          <BPText style={{color: Colors.lightWhite}}>Last Price</BPText>
          <BPText>
            {found?.params[1].l} {`${activecurrency?.b}`}
          </BPText>
        </View>
        <View style={{width: 0.5, backgroundColor: Colors.darkGray}} />
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            paddingLeft: 10,
          }}>
          <BPText style={{color: Colors.lightWhite}}>24H Change</BPText>
          <BPText>
            {found && parseFloat(found?.params[1].cp).toFixed(3)}%
          </BPText>
        </View>
      </View>

      {/* <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'stretch',paddingVertical:10, paddingHorizontal:16, backgroundColor: Colors.darkGray}}>

            <View style={{ flex:1, alignItems:'flex-start'}}>
                <BPText style={{ color: Colors.lightWhite, fontSize:12}}>24H Highest</BPText>
                <BPText style={{fontSize:12}}>{parseFloat(found?.params[1].h).toFixed(3)} {`${activecurrency?.b}`}</BPText>
            </View>
            
            <View style={{ flex:1, alignItems:'center'}}>
                <BPText style={{ color: Colors.lightWhite, fontSize:12}}>24H Lowest</BPText>
                <BPText style={{fontSize:12}}>{parseFloat(found?.params[1].lo).toFixed(3)} {`${activecurrency?.b}`}</BPText>
            </View>
            <View style={{ flex:2,  alignItems:'flex-end'}}>
                <BPText style={{ color: Colors.lightWhite, fontSize:12}}>24H Volume / Value</BPText>
                <BPText style={{fontSize:12}}>{parseFloat(found?.params[1].v).toFixed(3)} {`${activecurrency?.a}`} / {currentMarketPrice()} {`${activecurrency?.b}`}</BPText>
            </View>

        </View> */}
    </View>
  ) : (
    <ActivityIndicator color={Colors.white} size="large" />
  );
};
const MarketPageLandscape = () => {
  // console.log(
  //   'MarketPageLandscape reloads---------------------------------------------',
  // );
  // console.log("trdes reloads---------------------------------------------", id);

  // id++
  // let index_price = useSelector(state => state.marketReducer.index_price, equalityFnIndexPrice)
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const currencies = useSelector(
    state => state.marketReducer.currencies,
    (l, r) => l.payload === r.payload,
  );
  const activeTradePair = useSelector(
    state => state.marketReducer.activeTradePair,
    shallowEqual,
  );

  let favourites = useSelector(
    state => state.marketReducer.favourites,
    equalityFnFavs,
  );
  // alert(JSON.stringify(favourites));
  // const market_data = useSelector(state=> state.marketReducer.data.filter(i=> i.params[0] === activeTradePair), equalityFnMarket)
  // let found = market_data.find(i=> i.params[0] === activeTradePair)

  // // let user = useSelector(state=> state.authReducer.auth_attributes, shallowEqual);
  // console.log("market_data in trades",market_data)
  const [currencyVal] = useState(activeTradePair);
  const [Lcurrencies, setLcurrencies] = useState(currencies);
  const [loading, setloading] = useState(true);
  const [view, setview] = useState(1);
  const [showfavmodal, setfavmodal] = useState(false);

  const callListMarket = async () => {
    let res = await getMatchingMarketList();
    if (res.status) {
      let arr = res.data[1].map(i => {
        let divider = {};
        if (i.match('INR')) {
          divider = splitIt(i, 'INR');
        } else if (i.match('USDT')) {
          divider = splitIt(i, 'USDT');
        }
        let payload = {
          label: `${divider.a} / ${divider.b}`,
          value: i,
          a: divider.a,
          b: divider.b,
        };
        return payload;
      });
      dispatch(storeCurrencies(arr));
      setLcurrencies(arr);

      dispatch(setActiveTradePair(arr[1].value));
      setloading(false);
      // setcurrencies(arr)
    }
  };

  // useEffect(() => {
  //     const unsubscribe = navigation.addListener('focus', () => {
  //         if(activeTradePair){setloading(false)
  //         setTimeout(() => {
  //             //emitDepthSubscribeEvent(currencyVal, activeTradePair)
  //         }, 1000);
  //         emitKlineSubscribeEvent(activeTradePair, currencyVal)}
  //       });

  //       return unsubscribe;
  // }, [navigation])
  // useEffect(() => {
  //     const unsubscribe = navigation.addListener('blur', () => {
  //         setloading(true)
  //       //  dispatch(setActiveTradePair(null))
  //         //setActiveTradePair(null)
  //         setTimeout(() => {

  //             //emitDepthUnsubscribeEvent(currencyVal)
  //         }, 1000);
  //         emitKlineUnsubscribeEvent(currencyVal,60)
  //       });

  //       return unsubscribe;
  // }, [navigation])

  useEffect(() => {
    //emitKlineSubscribeEvent()
    if (!activeTradePair) {
      callListMarket();
    }

    return () => {
      //    alert("trades unmounted")

      emitKlineUnsubscribeEvent(currencyVal);
      //dispatch(setActiveTradePair(null))

      setloading(false);
    };
  }, []);

  useEffect(() => {
    console.log('statt e,mit');
    setTimeout(() => {
      if (!activeTradePair) {
        return;
      }
      setTimeout(() => {
        //emitDepthSubscribeEvent(currencyVal, activeTradePair)
        setloading(false);
      }, 1000);
      emitKlineSubscribeEvent(activeTradePair, currencyVal);
    }, 2000);
  }, [activeTradePair]);

  // const currencies = [{label: 'BTC/USDT', value:'key1'}];
  // if(currencies.length === 0){ return }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primeBG}}>
      <StatusBar hidden />
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.primeBG,
          flexDirection: 'row',
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          {/* <View style={{transform:[{rotate:"90deg"}], width:DEV_HEIGHT,   flexDirection:'row',}}>
                        <TradeChart width={Dimensions.get("window").height} height={ DEV_WIDTH - (DEV_WIDTH*0.2)}/>
                    </View> */}
          <View
            style={{
              transform: [{rotate: '90deg'}],
              width: DEV_HEIGHT,
              flexDirection: 'row',
            }}>
            {!loading && activeTradePair ? (
              view === 1 ? (
                <TradeChart
                  width={Dimensions.get('window').height}
                  height={DEV_WIDTH - DEV_WIDTH * 0.4}
                />
              ) : (
                <View style={{width: Dimensions.get('window').height}}>
                  <DepthChart
                    width={Dimensions.get('window').height}
                    height={DEV_WIDTH - DEV_WIDTH * 0.4}
                  />
                </View>
              )
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator color={Colors.white} size="large" />
              </View>
            )}
          </View>
        </View>
        {/* graphs here */}

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0.1,
            paddingRight: 16,
            borderWidth: 1,
          }}>
          <View
            style={{
              transform: [{rotate: '90deg'}],
              width: DEV_HEIGHT,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: Colors.darkGray2,
            }}>
            <Tab
              label={'PRICE Chart'}
              onPress={() => setview(1)}
              active={view === 1}
            />
            <Tab
              label={'Depth Chart'}
              onPress={() => setview(2)}
              active={view === 2}
            />

            <View
              style={{
                flex: 2,
                alignItems: 'flex-end',
                paddingVertical: 12,
                paddingHorizontal: 16,
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={Images.expand} style={styles.headerIconStyles} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0.1,
            paddingRight: 16,
            borderWidth: 1,
          }}>
          <View
            style={{
              transform: [{rotate: '90deg'}],
              width: DEV_HEIGHT,
              flexDirection: 'row',
            }}>
            <View style={{flex: 0.5}}>
              <View style={styles.headerContainer}>
                <View
                  style={{
                    flex: 0.5,
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '100%',
                  }}>
                  <TouchableOpacity
                    onPress={() => setfavmodal(true)}
                    style={{marginHorizontal: 22}}>
                    <Image
                      source={Images.see_favs}
                      style={styles.headerIconStyles}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderRadius: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {!activeTradePair && Lcurrencies.length == 0 ? (
                    <ActivityIndicator color={Colors.white} />
                  ) : (
                    <BPText>
                      {
                        Lcurrencies?.find(i => i.value === activeTradePair)
                          ?.label
                      }
                    </BPText>
                  )}
                </View>
              </View>
            </View>
            <View style={{flex: 1}}>
              <HeaderComp />
            </View>
            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingHorizontal: 16,
              }}>
              <TimeComp />
            </View>
          </View>
        </View>
      </View>

      <Modal
        isVisible={showfavmodal}
        onBackButtonPress={() => setfavmodal()}
        onBackdropPress={() => setfavmodal()}
        animationOut={'slideOutUp'}
        animationIn={'slideInDown'}
        style={{
          flex: 1,
          margin: 0,
          marginVertical: 16,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}>
        <View
          style={{
            backgroundColor: Colors.darkGray,

            alignSelf: 'stretch',
            transform: [{rotate: '90deg'}],
            height: DEV_WIDTH,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: Colors.darkGray2,
              paddingVertical: 18,
              paddingHorizontal: 18,
            }}>
            <TouchableOpacity>
              <Icon
                name="search"
                type="FontAwesome5"
                style={{color: Colors.white, fontSize: 26}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setfavmodal(false)}>
              <BPText style={{fontSize: 20}}>Cancel</BPText>
            </TouchableOpacity>
          </View>

          <View style={{padding: 10, backgroundColor: Colors.darkGray3}}>
            <BPText>Favourites</BPText>
          </View>
          <View style={{paddingVertical: 10, paddingHorizontal: 18}}>
            {favourites.map((i, index) => (
              <TouchableOpacity
                key={index.toString()}
                onPress={() => {
                  let val = i.stock + i.money;
                  if (val !== activeTradePair) {
                    dispatch(setActiveTradePair(val));
                    setloading(true);
                  }
                  setfavmodal(false);
                }}
                style={{paddingTop: 8}}>
                <BPText style={{fontSize: 18}}>
                  {i.stock}/{i.money}
                </BPText>
              </TouchableOpacity>
            ))}
            {/* <BPText style={{fontSize: 18}}>BDX/ETH</BPText> */}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabTextStyle: {color: Colors.text.lightWhite},
  tabStyle: {backgroundColor: Colors.darkGray3},
  activeTabStyle: {
    backgroundColor: Colors.darkGray3,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },

  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
  },
  headerIconStyles: {width: 22, height: 22},
});

export default MarketPageLandscape;

const Tab = ({label, onPress, active}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={{
        flex: 1,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: active ? Colors.white : 'transparent',
        paddingVertical: 12,
      }}>
      <BPText style={{textTransform: 'uppercase'}}>{label}</BPText>
    </TouchableOpacity>
  );
};
