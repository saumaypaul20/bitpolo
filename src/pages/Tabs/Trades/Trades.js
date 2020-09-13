import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Container} from 'native-base';
import Toolbar from '../../../components/Toolbar/Toolbar';
import {Colors, Images} from '../../../theme';
import {
  emitDepthSubscribeEvent,
  emitDepthUnsubscribeEvent,
  emitUnsubMarketListEvent,
} from '../../../api/config.ws';
import TradesLeftCol from '../../../components/TradesLeftCol/TradesLeftCol';
import TradesRightCol from '../../../components/TradesRightCol/TradesRightCol';
import {getMatchingMarketList, getIndexPrice} from '../../../api/markets.api';
import {splitIt} from '../../../utils/converters';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {
  storeCurrencies,
  setActiveTradePair,
  storeIndexPrice,
  modifyFavs,
} from '../../../redux/actions/markets.action';
import {
  addDepthSubs,
  clearDepthData,
} from '../../../redux/actions/depthSubs.action';
import {useNavigation} from '@react-navigation/native';
import {screenNames} from '../../../routes/screenNames/screenNames';
import BPText from '../../../common/BPText/BPText';
import ChevronRight from '../../../common/ChevronRight/ChevronRight';
import Modal from 'react-native-modal';
import {equalityFnIndexPrice} from '../../../utils/reduxChecker.utils';
import {
  setordertabprice,
  setordertabamount,
} from '../../../redux/actions/ordertab.actions';
// import {  } from 'react-native-gesture-handler'

const Trades = () => {
  // console.log('trdes reloads---------------------------------------------');

  // id++

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currencies = useSelector(state => state.marketReducer.currencies);
  const activeTradePair = useSelector(
    state => state.marketReducer.activeTradePair,
    shallowEqual,
  );
  const market_data = useSelector(
    state =>
      state.marketReducer.data.some(i => i.params[0] === activeTradePair),
    shallowEqual,
  );
  // let found = market_data.find(i=> i.params[0] === activeTradePair)
  // // let user = useSelector(state=> state.authReducer.auth_attributes, shallowEqual);
  // console.log("market_data in trades",market_data)
  const [currencyVal, setCurrency] = useState(activeTradePair);
  const [Lcurrencies, setLcurrencies] = useState(currencies);
  const [loading, setloading] = useState(true);
  const [showcurrencies, setshowcurrencies] = useState(false);
  let index_price = useSelector(
    state => state.marketReducer.index_price,
    equalityFnIndexPrice,
  );

  const callIndexPriceGetter = async () => {
    let resIndexPrice = await getIndexPrice();
    if (resIndexPrice.status) {
      dispatch(storeIndexPrice(resIndexPrice.data));
    }
  };
  if (!index_price) {
    callIndexPriceGetter();
  }
  const callListMarket = async () => {
    let res = await getMatchingMarketList();
    if (res.status) {
      // console.log(
      //   'favfavsfavfavsfavfavsfavfavsfavfavsfavfavsfavfavsfavfavsfavfavsfavfavsfavfavsfavfavsfavfavs',
      //   res.data,
      // );
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
      let favs = res.data[0][0]['USDT']
        .concat(res.data[0][1]['INR'])
        .filter(i => i.is_favourite);

      dispatch(modifyFavs(favs));
      dispatch(storeCurrencies(arr));
      setLcurrencies(arr);
      setloading(false);
      dispatch(setActiveTradePair(arr[1].value));
      emitDepthSubscribeEvent(arr[1].value);
      // setcurrencies(arr)
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (activeTradePair) {
        emitDepthSubscribeEvent(currencyVal, activeTradePair);
      }
    });

    return unsubscribe;
  }, [navigation]);

  // useEffect(()=>{

  //     setloading(true);
  //     setTimeout(() => {
  //         setloading(false)
  //     }, 1000);
  // },[currencyVal])
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      //alert("blur")
      setloading(true);
      // setLcurrencies([]);
      //  dispatch(setActiveTradePair(null))
      //+setActiveTradePair(null)
      //emitDepthUnsubscribeEvent(currencyVal)
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setloading(true);
    dispatch(setActiveTradePair(null));
    // emitDepthSubscribeEvent()
    callListMarket();

    return () => {
      //    alert("trades unmounted")

      //dispatch(setActiveTradePair(null))
      // alert('unmounted');
      // alert(activeTradePair);
      setloading(true);
      // alert(activeTradePair);

      emitUnsubMarketListEvent([activeTradePair]);
      emitDepthUnsubscribeEvent(activeTradePair);
      dispatch(setActiveTradePair(null));
    };
  }, []);

  useEffect(() => {
    console.log('statt e,mit');
    setTimeout(() => {
      if (!activeTradePair) {
        return;
      }
      emitDepthSubscribeEvent(currencyVal, activeTradePair);
    }, 2000);

    return () => {
      // alert(pair);

      emitUnsubMarketListEvent([activeTradePair]);
      emitDepthUnsubscribeEvent(activeTradePair);
    };
  }, [activeTradePair]);

  // useEffect(() => {
  //   if (market_data) {
  //     setloading(false);
  //   } else {
  //     setloading(true);
  //   }
  // }, [market_data]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('blur', () => {
  //     let pair = currencyVal;
  //     if (!currencyVal) {
  //       pair = activeTradePair;
  //     }
  //     alert(pair);

  //     emitUnsubMarketListEvent([pair]);
  //     emitDepthUnsubscribeEvent(pair);
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  const handleCurrencyView = () => {
    setshowcurrencies(!showcurrencies);
  };

  const oncurrencyselect = val => {
    if (val === activeTradePair) {
      setshowcurrencies(false);
      return;
    }
    setloading(true);
    dispatch(addDepthSubs(null));
    setCurrency(activeTradePair);
    dispatch(setordertabprice(0));
    dispatch(setordertabamount(0));
    dispatch(setActiveTradePair(val));
    dispatch(clearDepthData());
    emitDepthUnsubscribeEvent(currencyVal);
    emitUnsubMarketListEvent([val]);
    emitDepthSubscribeEvent(val);
    setshowcurrencies(false);
    setTimeout(() => {
      //emitUnsubMarketListEvent([currencyVal])
      setloading(false);
    }, 1000);
  };
  // const currencies = [{label: 'BTC/USDT', value:'key1'}];
  // if(currencies.length === 0){ return }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primeBG}}>
      <Container style={{flex: 1, backgroundColor: Colors.primeBG}}>
        {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
        <Toolbar backgroundColor={Colors.darkGray2} title={'Exchange'} />
        {/* <Content contentContainerStyle={{ flexGrow: 1 }}>
                
            </Content> */}

        <FlatList
          data={['1']}
          nestedScrollEnabled
          style={{width: '100%'}}
          keyExtractor={data => data}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <View style={{borderRadius: 4, alignSelf: 'flex-start'}}>
                {!activeTradePair || Lcurrencies.length == 0 ? (
                  <ActivityIndicator color={Colors.white} />
                ) : (
                  <View style={{backgroundColor: Colors.darkGray2}}>
                    <TouchableOpacity
                      onPress={() => handleCurrencyView()}
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <BPText style={{marginRight: 10}}>
                        {
                          Lcurrencies?.find(i => i.value === activeTradePair)
                            ?.label
                        }
                      </BPText>
                      <ChevronRight arrow={showcurrencies ? 'up' : 'down'} />
                    </TouchableOpacity>

                    <Modal
                      isVisible={showcurrencies}
                      backdropOpacity={0}
                      onBackButtonPress={() => handleCurrencyView()}
                      onBackdropPress={() => handleCurrencyView()}
                      style={{
                        justifyContent: 'flex-start',
                        marginTop: 100,
                        marginHorizontal: 0,
                      }}>
                      <View style={{backgroundColor: Colors.darkGray2}}>
                        {Lcurrencies.map((i, index) => {
                          return (
                            <TouchableOpacity
                              key={index.toString()}
                              style={{
                                paddingHorizontal: 20,
                                paddingVertical: 15,
                                borderTopColor: Colors.darkGray,
                                borderTopWidth: index !== 0 ? 1 : 0,
                              }}
                              onPress={() => oncurrencyselect(i.value)}>
                              <BPText>{i.label}</BPText>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </Modal>
                  </View>
                )}
              </View>

              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <TouchableOpacity
                  style={{marginHorizontal: 22}}
                  onPress={() => navigation.navigate(screenNames.MARKET_PAGE)}>
                  <Image
                    source={Images.market_chart_icon}
                    style={styles.headerIconStyles}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(screenNames.MARKET_TRADES)
                  }>
                  <Image
                    source={Images.list_icon}
                    style={styles.headerIconStyles}
                  />
                </TouchableOpacity>
              </View>
            </View>
          }
          renderItem={() => {
            //alert("uyou")
            return (
              <View
                style={{justifyContent: 'flex-start', alignItems: 'center'}}>
                {/* ---------------------------------- */}

                {loading && !market_data ? (
                  <ActivityIndicator
                    color={Colors.white}
                    size="large"
                    style={{marginTop: 50}}
                  />
                ) : (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignSelf: 'stretch',
                    }}>
                    {activeTradePair && <TradesLeftCol />}
                    {activeTradePair && <TradesRightCol />}
                  </View>
                )}

                {/* {-----------------------------} */}
              </View>
            );
          }}
          stickyHeaderIndices={[0]}
        />
      </Container>
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
    backgroundColor: Colors.darkGray2,
    paddingHorizontal: 16,
  },
  headerIconStyles: {width: 22, height: 22},
});

export default Trades;
