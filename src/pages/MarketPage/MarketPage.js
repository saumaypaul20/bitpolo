import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Container, Icon} from 'native-base';
import {Colors, Images} from '../../theme';
import PickerComp from '../../components/PickerComp/PickerComp';
// import { getAuthToken, getInfoAuthToken, getDeviceId } from '../../../utils/apiHeaders.utils'
import {
  emitDepthSubscribeEvent,
  emitDepthUnsubscribeEvent,
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
  modifyFavs,
} from '../../redux/actions/markets.action';
import {addDepthSubs} from '../../redux/actions/depthSubs.action';
import store from '../../redux/store';
import {useNavigation} from '@react-navigation/native';
import {screenNames} from '../../routes/screenNames/screenNames';
import BPText from '../../common/BPText/BPText';
import TradeChart from '../../components/AreaChart/TradeChart';
import MarketBottom from '../../components/MarketBottom/MarketBottom';
import {addKlineData, emptyKlineData} from '../../redux/actions/kline.actions';
import {
  equalityFnIndexPrice,
  equalityFnMarket,
  equalityFnFavs,
} from '../../utils/reduxChecker.utils';
import DepthChart from '../../components/AreaChart/DepthChart';
import {setordertab} from '../../redux/actions/ordertab.actions';
import {updateFavCoin, addFavCoin} from '../../api/users.api';
import {getDeviceId} from 'react-native-device-info';
import {getInfoAuthToken, getAuthToken} from '../../utils/apiHeaders.utils';
import Modal from 'react-native-modal';
import ChevronRight from '../../common/ChevronRight/ChevronRight';
const currentMarketPrice = (found, index_price) => {
  // let found = market_data;
  // console.log(
  //   'currentMarketPrice**********************************************************',
  // );
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
        {`${
          found?.divider.b === 'USDT'
            ? (
                parseFloat(found?.params[1]?.l) *
                index_price.find(i => i.asset === 'USDT').amount
              ).toFixed(2)
            : (
                parseFloat(found?.params[1]?.l) /
                index_price.find(i => i.asset === 'USDT').amount
              ).toFixed(2)
        }`}
      </BPText>
    );
  }
};

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
  const found = market_data[0];
  const activecurrency = useSelector(
    state =>
      state.marketReducer.currencies.find(i => i.value === activeTradePair),
    shallowEqual,
  );

  return found && activecurrency ? (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'stretch',
          paddingHorizontal: 16,
          borderTopColor: Colors.darkGray,
          borderTopWidth: 0.5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            paddingVertical: 10,
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
            paddingVertical: 10,
            paddingLeft: 10,
          }}>
          <BPText style={{color: Colors.lightWhite}}>24H Change</BPText>
          <BPText>
            {found && parseFloat(found?.params[1].cp).toFixed(2)}%
          </BPText>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'stretch',
          paddingVertical: 10,
          paddingHorizontal: 16,
          backgroundColor: Colors.darkGray,
        }}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <BPText style={{color: Colors.lightWhite, fontSize: 12}}>
            24H Highest
          </BPText>
          <BPText style={{fontSize: 12}}>
            {parseFloat(found?.params[1].h).toFixed(2)} {`${activecurrency?.b}`}
          </BPText>
        </View>

        <View style={{flex: 1, alignItems: 'center'}}>
          <BPText style={{color: Colors.lightWhite, fontSize: 12}}>
            24H Lowest
          </BPText>
          <BPText style={{fontSize: 12}}>
            {parseFloat(found?.params[1].lo).toFixed(2)}{' '}
            {`${activecurrency?.b}`}
          </BPText>
        </View>
        <View style={{flex: 2, alignItems: 'flex-end'}}>
          <BPText style={{color: Colors.lightWhite, fontSize: 12}}>
            24H Volume / Value
          </BPText>
          <BPText style={{fontSize: 12}}>
            {parseFloat(found?.params[1].v).toFixed(3)} {`${activecurrency?.a}`}{' '}
            / {currentMarketPrice(found, index_price)} {`${activecurrency?.b}`}
          </BPText>
        </View>
      </View>
    </>
  ) : (
    <ActivityIndicator color={Colors.white} size="large" />
  );
};

// const Tab = ({onPress, label, active}) => {
//   return (
//     <TouchableOpacity
//       onPress={() => onPress()}
//       style={{
//         padding: 5,
//         borderBottomWidth: active ? 1 : 0,
//         borderBottomColor: Colors.white,
//       }}>
//       <BPText>{label}</BPText>
//     </TouchableOpacity>
//   );
// };

const callAddFavCoin = async item => {
  let payload = {lang: 'en', data: {attributes: {market: item}}};
  let headers = {
    Authorizaton: getAuthToken(),
    info: getInfoAuthToken(),
    device: getDeviceId(),
  };
  let res = await addFavCoin(payload, headers);
  if (res.status) {
    console.log(res.data);
  }
};

const callDeleteFavCoin = async item => {
  let payload = {lang: 'en', data: {attributes: {market: item}}};
  let res = await updateFavCoin(payload);
  if (res.status) {
    console.log(res.data);
  }
};

const setFav = (item, favourites) => {
  let state = store.getState();

  let market_list = state.marketReducer.market_list;
  //   if (market_list.length === 0) {
  //     return;
  //   }
  //   alert(JSON.stringify(market_list));
  if (favourites.find(i => i.name == item)) {
    onDeleteClick(item, favourites);
  } else {
    let itemRes = market_list.find(i => i.name === item);
    let newData = favourites.concat([itemRes]);
    console.log('onstart click data', newData);
    store.dispatch(modifyFavs(newData));
    callAddFavCoin(itemRes.name);
  }
};

const onDeleteClick = (item, favourites) => {
  // let state = store.getState();
  // let favourites = state.marketReducer.favourites;

  let newData = favourites.filter(i => i.name !== item);
  store.dispatch(modifyFavs(newData));
  callDeleteFavCoin(item);
};

const isFavourite = (item, favs) => {
  if (favs.length > 0 && favs.find(i => i.name === item)) {
    return (
      <Image
        source={Images.star_active}
        style={{width: 19, height: 19}}
        resizeMode="contain"
      />
    );
  } else
    return (
      <Image
        source={Images.star_icon}
        style={{width: 19, height: 19}}
        resizeMode="contain"
      />
    );
};

const MarketPage = () => {
  // console.log(
  //   'MarketPage reloads---------------------------------------------',
  // );

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

  const [currencyVal, setCurrency] = useState(activeTradePair);
  const [Lcurrencies, setLcurrencies] = useState(currencies);
  const [loading, setloading] = useState(true);
  const [view, setview] = useState(1);
  const [tab, settab] = useState(1);
  const [showcurrencies, setshowcurrencies] = useState(false);
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
      let favs = res.data[0][0]['USDT']
        .concat(res.data[0][1]['INR'])
        .filter(i => i.is_favourite);
      // console.log(
      //   'FAVSFAVSFAVSFAVSFAVSFAVSFAVSFAVSFAVSFAVSFAVSFAVSFAVSFAVSFAVSFAVSFAVSFAVSFAVSFAVSFAVSFAVS',
      //   favs,
      // );
      dispatch(modifyFavs(favs));
      dispatch(storeCurrencies(arr));
      setLcurrencies(arr);

      dispatch(setActiveTradePair(arr[1].value));
      setloading(false);
      // setcurrencies(arr)
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (activeTradePair) {
        setloading(false);
        setTimeout(() => {
          //emitDepthSubscribeEvent(currencyVal, activeTradePair)
        }, 1000);
        emitKlineSubscribeEvent(activeTradePair, currencyVal);
      }
    });

    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setloading(true);
      //  dispatch(setActiveTradePair(null))
      //setActiveTradePair(null)
      setTimeout(() => {
        //emitDepthUnsubscribeEvent(currencyVal)
      }, 1000);
      emitKlineUnsubscribeEvent(currencyVal, 60);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    //emitKlineSubscribeEvent()

    callListMarket();

    return () => {
      //    alert("trades unmounted")

      emitKlineUnsubscribeEvent(activeTradePair);
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

  const handleCurrencyView = () => {
    setshowcurrencies(!showcurrencies);
  };

  const oncurrencyselect = val => {
    if (val === activeTradePair) {
      setshowcurrencies(false);
      return;
    }
    // setloading(true);
    // dispatch(addDepthSubs(null));
    // setCurrency(activeTradePair);
    // dispatch(setordertabprice(0));
    // dispatch(setordertabamount(0));
    // dispatch(setActiveTradePair(val));
    // dispatch(clearDepthData());
    // emitDepthUnsubscribeEvent(currencyVal);
    // emitUnsubMarketListEvent([val]);
    // emitDepthSubscribeEvent(val);
    // setshowcurrencies(false);
    // setTimeout(() => {
    //   //emitUnsubMarketListEvent([currencyVal])
    //   setloading(false);
    // }, 1000);

    setloading(true);
    //dispatch(addDepthSubs(null));
    setCurrency(activeTradePair);
    dispatch(emptyKlineData());
    dispatch(setActiveTradePair(val));
    setshowcurrencies(false);
    // emptyKlineData()
    setTimeout(() => {
      setloading(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primeBG}}>
      <Container style={{flex: 1, backgroundColor: Colors.primeBG}}>
        {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
        {/* <Toolbar backgroundColor={Colors.darkGray2} title={"Exchange"}/> */}
        {/* <Content contentContainerStyle={{ flexGrow: 1 }}>
                
            </Content> */}
        <FlatList
          data={['1']}
          nestedScrollEnabled
          style={{width: '100%', marginBottom: 60}}
          keyExtractor={data => data}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <View
                style={{flex: 0.5, borderRadius: 4, alignSelf: 'flex-start'}}>
                {!activeTradePair && Lcurrencies.length == 0 ? (
                  <ActivityIndicator color={Colors.white} />
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Icon
                        name="arrow-back"
                        style={{fontSize: 20, color: Colors.white}}
                      />
                    </TouchableOpacity>

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
                          marginTop: 90,
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
                {/* <TouchableOpacity style={{marginHorizontal: 22}}>
                  <Image
                    source={Images.see_favs}
                    style={styles.headerIconStyles}
                  />
                </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => setFav(activeTradePair, favourites)}>
                  {isFavourite(activeTradePair, favourites)}
                </TouchableOpacity>
              </View>
            </View>
          }
          renderItem={() => {
            return (
              <View
                style={{justifyContent: 'flex-start', alignItems: 'center'}}>
                <HeaderComp />

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'stretch',

                    backgroundColor: Colors.darkGray2,
                    flex: 1,
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
                      flex: 1,
                      alignItems: 'flex-end',
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(screenNames.MARKET_PAGE_LANDSCAPE)
                      }>
                      <Image
                        source={Images.expand}
                        style={styles.headerIconStyles}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* ---------------------------------- */}

                {/* {(Lcurrencies.length == 0 || !found || !loading) ?  
                                <ActivityIndicator color={Colors.white} size="large" style={{marginTop:50}}/>
                            :
                                <View style={{flex:1, flexDirection:'row', alignSelf:'stretch'}}>
                                    {activeTradePair && <TradesLeftCol />}
                                    {activeTradePair && <TradesRightCol /> }
                                </View>} */}

                {/* {-----------------------------} */}

                <View style={{height: 300}}>
                  {!loading && activeTradePair ? (
                    view === 1 ? (
                      <TradeChart
                        height={300}
                        width={Dimensions.get('window').width}
                      />
                    ) : (
                      <View style={{width: Dimensions.get('window').width}}>
                        <DepthChart height={300} />
                      </View>
                    )
                  ) : (
                    <ActivityIndicator color={Colors.white} size="large" />
                  )}
                </View>
                <View style={{alignSelf: 'stretch', flex: 1}}>
                  <View
                    style={{
                      backgroundColor: Colors.darkGray,
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                    }}>
                    <Tab
                      textTransform
                      onPress={() => settab(1)}
                      label="Book"
                      active={tab === 1}
                    />

                    <Tab
                      textTransform
                      onPress={() => settab(2)}
                      label="Market Trades"
                      active={tab === 2}
                    />
                    <View style={{flex: 2}} />
                  </View>
                  {!loading &&
                    activeTradePair &&
                    (tab === 1 ? <MarketBottom /> : null)}
                </View>
              </View>
            );
          }}
          stickyHeaderIndices={[0]}
        />

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            padding: 16,
            backgroundColor: Colors.darkGray,
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            alignSelf: 'stretch',
            width: '100%',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <ColoredButton
              label="Buy"
              bgColor={Colors.lightGreen}
              onPress={() => {
                dispatch(setordertab(2));
                navigation.goBack();
              }}
            />
            <ColoredButton
              label="Sell"
              onPress={() => {
                dispatch(setordertab(1));
                navigation.goBack();
              }}
            />
          </View>
        </View>
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

export default MarketPage;

const Tab = ({label, onPress, active, textTransform}) => {
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
      <BPText style={{textTransform: !textTransform ? 'uppercase' : 'none'}}>
        {label}
      </BPText>
    </TouchableOpacity>
  );
};

const ColoredButton = ({onPress, label, bgColor = Colors.red}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={{
        backgroundColor: bgColor,
        paddingHorizontal: 30,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <BPText style={{fontSize: 16, textTransform: 'uppercase'}}>
        {label}
      </BPText>
    </TouchableOpacity>
  );
};
