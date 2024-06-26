import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Colors, Images} from '../../../theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toolbar from '../../../components/Toolbar/Toolbar';
import {Icon, Tab, Tabs} from 'native-base';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {
  modifyFavs,
  addMarketList,
  setActiveTradePair,
  storeIndexPrice,
} from '../../../redux/actions/markets.action';
import store from '../../../redux/store';
import _ from 'lodash';
import BPText from '../../../common/BPText/BPText';
import {useNavigation} from '@react-navigation/native';
import ListEmpty from '../../../components/ListEmpty/ListEmpty';
import {
  equalityFnMarket,
  equalityFnIndexPrice,
  equalityFnFavs,
} from '../../../utils/reduxChecker.utils';
import {
  emitMarketListEvent,
  emitUnsubMarketListEvent,
} from '../../../api/config.ws';
import {
  getAuthToken,
  getInfoAuthToken,
  getDeviceId,
} from '../../../utils/apiHeaders.utils';
import {getMatchingMarketList, getIndexPrice} from '../../../api/markets.api';
import {addFavCoin, updateFavCoin} from '../../../api/users.api';
import {screenNames} from '../../../routes/screenNames/screenNames';

let count = 0;

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

const onStarClicked = (item, favourites, market_list) => {
  // let state = store.getState();

  // let market_list = state.marketReducer.market_list;
  if (favourites.find(i => i.name == item.params[0])) {
    onDeleteClick(item);
  } else {
    let itemRes = market_list.find(i => i.name === item.params[0]);
    let newData = favourites.concat([itemRes]);
    console.log('onstart click data', newData);
    store.dispatch(modifyFavs(newData));
    callAddFavCoin(itemRes.name);
  }
};

const onDeleteClick = item => {
  let state = store.getState();
  let favourites = state.marketReducer.favourites;

  let newData = favourites.filter(i => i.name !== item.params[0]);
  store.dispatch(modifyFavs(newData));
  callDeleteFavCoin(item.params[0]);
};

let INRView = () => {
  // let focus = navigation.isFocused()
  // console.log('INRView reloads', count);
  // count++;
  let market_data = useSelector(
    state => state.marketReducer.data.filter(i => i.params[0].endsWith('INR')),
    equalityFnMarket,
  );
  // console.log('reloads');
  //   const [renderData, setrenderData]= useState(market_data);
  const [orderDirection, setorderDirection] = useState(true);
  const [orderBY, setorderBY] = useState(false);
  let favourites = useSelector(
    state => state.marketReducer.favourites,
    equalityFnFavs,
  );
  let market_list = useSelector(
    state => state.marketReducer.market_list,
    shallowEqual,
  );
  const onSort = by_action => {
    setorderDirection(!orderDirection);
    setorderBY(by_action);
  };

  const renderData = useMemo(() => {
    // console.log(orderBY);
    // console.log(orderDirection);
    let arr = market_data;
    switch (orderBY) {
      case 'pair':
        arr = _.orderBy(
          market_data,
          ['params[0]'],
          [orderDirection ? 'asc' : 'desc'],
        );

      case 'last-price':
        arr = _.orderBy(
          market_data,
          ['params[1].l'],
          [orderDirection ? 'asc' : 'desc'],
        );

      case '24h-change':
        arr = _.orderBy(
          market_data,
          ['params[1].cp'],
          [orderDirection ? 'asc' : 'desc'],
        );

      default:
        arr = arr;
    }

    return arr;
  }, [orderBY, orderDirection, market_data]);
  // market_data = market_data.filter(i=> i.params[0].endsWith("INR"))
  const renderRowItem = rowData => (
    <ListItem item={rowData.item} index={rowData.index} />
  );
  const renderHiddenRowItem = (rowData, rowMap) => (
    <View
      style={{
        right: 0,
        position: 'absolute',
        top: 0,
        bottom: 0,
        backgroundColor: Colors.darkGray,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 64,
      }}>
      <TouchableOpacity
        onPress={() => {
          onStarClicked(rowData.item, favourites, market_list);
          setTimeout(() => {
            rowMap[rowData.item.id]?.closeRow();
          }, 1000);
        }}>
        {isFavourite(rowData.item, favourites)}
      </TouchableOpacity>
    </View>
  );

  const renderItemLayout = (data, index) => {
    return {
      index,
      length: 30, // itemHeight is a placeholder for your amount
      offset: index * 30,
      width: '100%',
    };
  };

  const onRowOpen = (rowKey, rowMap) => {
    setTimeout(() => {
      rowMap[rowKey]?.closeRow();
    }, 1000);
  };
  return (
    <View style={{backgroundColor: Colors.primeBG, flex: 1}}>
      {market_data.length === 0 ? (
        <ActivityIndicator
          color={Colors.white}
          size="large"
          style={{marginTop: 50}}
        />
      ) : (
        <SwipeListView
          bounces={false}
          useFlatList={true}
          initialNumToRender={5}
          data={renderData}
          style={{flex: 1}}
          renderItem={renderRowItem}
          renderHiddenItem={renderHiddenRowItem}
          onRowOpen={onRowOpen}
          rightOpenValue={-64}
          disableRightSwipe
          stopRightSwipe={-64}
          ListHeaderComponent={homeHeaderComp(onSort)}
          stickyHeaderIndices={[0]}
          keyExtractor={item => item.id}
          getItemLayout={renderItemLayout}
          contentContainerStyle={{flexGrow: 1}}
          //  ListEmptyComponent={<ActivityIndicator color={Colors.white} size="large" />}
        />
      )}
    </View>
  );
};
INRView = React.memo(INRView);

let USDTView = () => {
  // console.log('USDTView reloads', count);
  // count++;
  let market_data = useSelector(
    state => state.marketReducer.data.filter(i => i.params[0].endsWith('USDT')),
    equalityFnMarket,
  );
  const [orderDirection, setorderDirection] = useState(true);
  const [orderBY, setorderBY] = useState(false);
  let favourites = useSelector(
    state => state.marketReducer.favourites,
    equalityFnFavs,
  );
  let market_list = useSelector(
    state => state.marketReducer.market_list,
    shallowEqual,
  );
  // market_data = market_data.filter(i=> i.params[0].endsWith("USDT"))
  // console.log(" USDTViewmarket_data",market_data)
  const onSort = by_action => {
    setorderDirection(!orderDirection);
    setorderBY(by_action);
  };
  const renderData = useMemo(() => {
    let arr = market_data;
    switch (orderBY) {
      case 'pair':
        arr = _.orderBy(
          market_data,
          ['params[0]'],
          [orderDirection ? 'asc' : 'desc'],
        );

      case 'last-price':
        arr = _.orderBy(
          market_data,
          ['params[1].l'],
          [orderDirection ? 'asc' : 'desc'],
        );

      case '24h-change':
        arr = _.orderBy(
          market_data,
          ['params[1].cp'],
          [orderDirection ? 'asc' : 'desc'],
        );

      default:
        arr = arr;
    }

    return arr;
  }, [orderBY, orderDirection, market_data]);

  const renderRowItem = rowData => (
    <ListItem item={rowData.item} index={rowData.index} />
  );
  const renderHiddenRowItem = (rowData, rowMap) => (
    <View
      style={{
        right: 0,
        position: 'absolute',
        top: 0,
        bottom: 0,
        backgroundColor: Colors.darkGray,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 64,
      }}>
      <TouchableOpacity
        onPress={() => {
          onStarClicked(rowData.item, favourites, market_list);
          setTimeout(() => {
            rowMap[rowData.item.id]?.closeRow();
          }, 1000);
        }}>
        {isFavourite(rowData.item, favourites)}
      </TouchableOpacity>
    </View>
  );

  const renderItemLayout = (data, index) => {
    return {
      index,
      length: 30, // itemHeight is a placeholder for your amount
      offset: index * 30,
      width: '100%',
    };
  };

  const onRowOpen = (rowKey, rowMap) => {
    setTimeout(() => {
      rowMap[rowKey]?.closeRow();
    }, 1000);
  };

  return (
    <View style={{backgroundColor: Colors.primeBG, flex: 1}}>
      {market_data.length === 0 ? (
        <ActivityIndicator
          color={Colors.white}
          size="large"
          style={{marginTop: 50}}
        />
      ) : (
        <SwipeListView
          bounces={false}
          useFlatList={true}
          initialNumToRender={2}
          data={renderData}
          style={{flex: 1}}
          renderItem={renderRowItem}
          renderHiddenItem={renderHiddenRowItem}
          onRowOpen={onRowOpen}
          rightOpenValue={-64}
          disableRightSwipe
          stopRightSwipe={-64}
          ListHeaderComponent={homeHeaderComp(onSort)}
          stickyHeaderIndices={[0]}
          keyExtractor={item => item.id}
          contentContainerStyle={{flexGrow: 1}}
          getItemLayout={renderItemLayout}
          // ListEmptyComponent={
          //   <View
          //     style={{
          //       flex: 1,
          //       justifyContent: 'flex-start',
          //       alignItems: 'center',
          //       paddingTop: 50,
          //     }}>
          //     <ActivityIndicator color={Colors.white} size="large" />
          //   </View>
          // }
        />
      )}
    </View>
  );
};

USDTView = React.memo(USDTView);

let FavouritesTab = () => {
  const market_data = useSelector(
    state => state.marketReducer.data,
    equalityFnMarket,
  );
  const favourites = useSelector(
    state => state.marketReducer.favourites,
    equalityFnFavs,
  );

  let favs = favourites.map(i => {
    // let into =false
    for (let j = 0; j < market_data.length; j++) {
      if (market_data[j].params[0] === i.name) {
        return market_data[j];
      }
    }
  });

  const [orderDirection, setorderDirection] = useState(true);
  const [orderBY, setorderBY] = useState(false);
  const onSort = by_action => {
    setorderDirection(!orderDirection);
    setorderBY(by_action);
  };
  const renderData = useMemo(() => {
    let arr = favs;
    switch (orderBY) {
      case 'pair':
        arr = _.orderBy(arr, ['params[0]'], [orderDirection ? 'asc' : 'desc']);

      case 'last-price':
        arr = _.orderBy(
          arr,
          ['params[1].l'],
          [orderDirection ? 'asc' : 'desc'],
        );

      case '24h-change':
        arr = _.orderBy(
          arr,
          ['params[1].cp'],
          [orderDirection ? 'asc' : 'desc'],
        );

      default:
        arr = arr;
    }

    return arr;
  }, [orderBY, orderDirection, favs]);

  const renderHeaderComp = () =>
    favourites.length > 0 ? homeHeaderComp(onSort) : null;

  const renderRowItem = rowData => (
    <ListItem item={rowData.item} index={rowData.index} />
  );
  return (
    <View style={{backgroundColor: Colors.primeBG, flex: 1}}>
      <SwipeListView
        bounces={false}
        useFlatList={true}
        data={renderData}
        initialNumToRender={7}
        renderItem={renderRowItem}
        renderHiddenItem={(rowData, rowMap) => (
          <View
            style={{
              right: 0,
              position: 'absolute',
              top: 0,
              bottom: 0,
              backgroundColor: Colors.lightRed,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: 64,
            }}>
            <TouchableOpacity
              onPress={() => {
                rowMap[rowData.item.id]?.closeRow();
                setTimeout(() => {
                  onDeleteClick(rowData.item);
                }, 500);
              }}>
              <Image
                source={Images.delete_icon}
                style={{width: 14, height: 16}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
        onRowOpen={(rowKey, rowMap) => {
          setTimeout(() => {
            rowMap[rowKey]?.closeRow();
          }, 1000);
        }}
        rightOpenValue={-64}
        disableRightSwipe
        stopRightSwipe={-64}
        ListHeaderComponent={renderHeaderComp}
        stickyHeaderIndices={[0]}
        keyExtractor={item => item?.params[1]?.l}
        contentContainerStyle={{flex: 1}}
        ListEmptyComponent={<ListEmpty />}
        getItemLayout={(data, index) => {
          return {
            index,
            length: 30, // itemHeight is a placeholder for your amount
            offset: index * 30,
            width: '100%',
          };
        }}
      />
    </View>
  );
};

FavouritesTab = React.memo(FavouritesTab);
let ListItem = ({item, index}) => {
  //   console.log("item",item)
  const dispatch = useDispatch();
  const navigation = useNavigation();
  let bool = index % 2 === 0 ? true : false;

  let index_price = useSelector(
    state => state.marketReducer.index_price,
    equalityFnIndexPrice,
  );

  if (!index_price) {
    return <></>;
  }
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        dispatch(setActiveTradePair(item.params[0]));
        navigation.navigate(screenNames.TRADES);
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          paddingVertical: 8,
          backgroundColor: bool ? Colors.primeBG : Colors.darkGray2,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingHorizontal: 30,
          }}>
          <View style={{alignItems: 'flex-start'}}>
            <BPText
              style={{
                fontFamily: 'Inter-Medium',
                fontSize: 12,
                alignItems: 'center',
              }}>
              {item?.divider.a}{' '}
              <BPText
                style={{color: Colors.lightWhite, fontFamily: 'Inter-Bold'}}>
                / {item?.divider.b}
              </BPText>
            </BPText>

            <BPText
              style={{
                fontSize: 10,
                fontFamily: 'Inter-Medium',
                textAlign: 'left',
              }}>
              Vol {parseFloat(item?.params[1]?.v).toFixed(2)}
            </BPText>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingHorizontal: 35,
          }}>
          <BPText style={{fontSize: 12}}>
            {parseFloat(item?.params[1]?.l).toFixed(2)}
          </BPText>
          <BPText style={{fontFamily: 'Inter-Medium', fontSize: 10}}>
            ${' '}
            {item?.divider.b === 'USDT'
              ? (
                  parseFloat(item?.params[1]?.l) *
                  index_price.find(i => i.asset === 'USDT').amount
                ).toFixed(2)
              : (
                  parseFloat(item?.params[1]?.l) /
                  index_price.find(i => i.asset === 'USDT').amount
                ).toFixed(2)}
          </BPText>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            alignSelf: 'center',
            paddingHorizontal: 30,
          }}>
          <Text
            style={{
              color: !item?.params[1]?.cp.match('-')
                ? Colors.text.darkGreen
                : Colors.text.darkRed,
              fontFamily: 'Inter-Medium',
              fontSize: 12,
              backgroundColor: !item?.params[1]?.cp.match('-')
                ? Colors.lightGreen
                : Colors.red,
              padding: 5,
              borderRadius: 3,
            }}>
            {' '}
            {parseFloat(
              item?.params[1]?.cp === 'Infinity' ? 0 : item?.params[1]?.cp,
            ).toFixed(2)}
            %
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
ListItem = React.memo(ListItem);
const homeHeaderComp = onSort => {
  return (
    <View style={{backgroundColor: Colors.primeBG}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          backgroundColor: Colors.darkGray2,
          paddingVertical: 15,
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            onPress={() => onSort('pair')}
            style={{
              color: Colors.white,
              fontFamily: 'Inter-Medium',
              fontSize: 12,
            }}>
            Pair{' '}
            <Icon
              type="FontAwesome"
              name="chevron-down"
              style={{color: '#fff', fontSize: 10, fontWeight: '100'}}
            />{' '}
            <Text style={{color: Colors.text.lightWhite}}>/</Text> Vol{' '}
            <Icon
              type="FontAwesome"
              name="chevron-down"
              style={{color: '#fff', fontSize: 10, fontWeight: '100'}}
            />
          </Text>
        </View>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            onPress={() => onSort('last-price')}
            style={{
              color: Colors.white,
              fontFamily: 'Inter-Regular',
              fontSize: 12,
            }}>
            Last price{' '}
            <Icon
              type="FontAwesome"
              name="sort"
              style={{color: '#fff', fontSize: 12}}
            />
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text
            onPress={() => onSort('24h-change')}
            style={{
              color: Colors.white,
              fontFamily: 'Inter-Medium',
              fontSize: 12,
            }}>
            24h Change{' '}
            <Icon
              type="FontAwesome"
              name="sort"
              style={{color: '#fff', fontSize: 12}}
            />
          </Text>
        </View>
      </View>
    </View>
  );
};

const isFavourite = (item, favs) => {
  if (favs.length > 0 && favs.find(i => i.name === item.params[0])) {
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

let Markets = () => {
  // console.log('Markets reload************************************');
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [view, setview] = useState(1);
  // let focus = navigation.isFocused()
  // const user = useSelector(state=> state.authReducer.auth_attributes);
  const socketConnected = useSelector(
    state => state.marketReducer.socketConnected,
    shallowEqual,
  );
  const [loading, setloading] = useState(true);
  const [marketPairs, setmarketPairs] = useState([]);
  const [, setfavs] = useState([]);
  // console.log("usert",user)

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

  const callgetMarketList = useCallback(async () => {
    try {
      let attr = {
        Authorization: getAuthToken(),
        info: getInfoAuthToken(),
      };
      // let res = await getMarketList(attr)
      let res = await getMatchingMarketList(attr);

      console.log('getmarkets', res);

      if (res.status) {
        let arr = res.data[0][0]['USDT'].concat(res.data[0][1]['INR']);
        let final = arr;
        let favs = arr.filter(i => i.is_favourite);
        console.log('arr', arr);
        console.log('favs', favs);
        console.log('final', final);
        // setfavs(favs)
        dispatch(modifyFavs(favs));
        dispatch(addMarketList(final));
        setmarketPairs(final);
        setSocket(true);
      }
    } catch (e) {
      //  console.log(e)
    }
  }, []);

  useEffect(() => {
    // alert("re_mounted markerts")
    // getMarketPairs()
    // if (!socketConnected) {
    callgetMarketList();
    // }
  }, []);

  useEffect(() => {
    console.log('socketConnected', socketConnected);
    // console.log("foucs", focus)
    if (socket) {
      // if (!socketConnected) {
      emitMarketListEvent(marketPairs.map(i => i.name));
      // }
    }
    // return () => {
    //     if(socket) socket.disconnect()
    // }

    return () => {
      // alert('unmounted home');
      emitUnsubMarketListEvent(marketPairs.map(i => i.name));
    };
  }, [socket, navigation]);

  // useEffect(() => {
  //     const unsubscribe = navigation.addListener('focus', () => {
  //         setloading(false)
  //       });

  //       return unsubscribe;
  // }, [navigation])

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('blur', () => {
  //     setloading(true);
  //     emitUnsubMarketListEvent(marketPairs);
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: Colors.primeBG}}>
        <Toolbar title="Markets" backgroundColor={Colors.darkGray2} hasTabs />

        <View>
          <View
            style={{flexDirection: 'row', backgroundColor: Colors.darkGray2}}>
            <TouchableOpacity
              disabled={view == 0}
              onPress={() => setview(0)}
              style={{
                paddingHorizontal: 15,
                borderBottomWidth: 1,
                borderColor: view === 0 ? Colors.white : 'transparent',
                paddingBottom: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <BPText>Favourites</BPText>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={view == 1}
              onPress={() => setview(1)}
              style={{
                paddingHorizontal: 15,
                borderBottomWidth: 1,
                borderColor: view === 1 ? Colors.white : 'transparent',
                paddingBottom: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <BPText>INR</BPText>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={view == 2}
              onPress={() => setview(2)}
              style={{
                paddingHorizontal: 15,
                borderBottomWidth: 1,
                borderColor: view === 2 ? Colors.white : 'transparent',
                paddingBottom: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <BPText>USDT</BPText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flex: 1}}>
          {view === 0 && <FavouritesTab />}
          {view === 1 && <INRView />}
          {view === 2 && <USDTView />}
        </View>
        {/* { <Tabs locked initialPage={1} tabBarUnderlineStyle={{borderBottomWidth:0,width:'auto', marginHorizontal:-5 }} tabContainerStyle={{paddingRight:'30%', backgroundColor: Colors.darkGray2}} >

                        <Tab  heading="Favourites" 
                        textStyle={{color:Colors.text.lightWhite,}} 
                        tabStyle={{ backgroundColor: Colors.darkGray2, }} 
                        activeTabStyle={{backgroundColor: Colors.darkGray2, borderBottomWidth:1, borderBottomColor:'#fff'}} >
                           <FavouritesTab   />
                        </Tab>
                        
                        <Tab heading="INR" 
                        textStyle={{color:Colors.text.lightWhite,}} 
                        tabStyle={{ backgroundColor: Colors.darkGray2 , }} 
                        activeTabStyle={{backgroundColor: Colors.darkGray2, borderBottomWidth:1, borderBottomColor:'#fff', }} >
                            <INRView   />
                        </Tab>

                        <Tab heading="USDT" 
                        textStyle={{color:Colors.text.lightWhite,}} 
                        tabStyle={{ backgroundColor: Colors.darkGray2 , }} 
                        activeTabStyle={{backgroundColor: Colors.darkGray2, borderBottomWidth:1, borderBottomColor:'#fff', }} >
                            <USDTView   />
                        </Tab>


                    </Tabs>} */}
      </View>
    </SafeAreaView>
  );
};
Markets = React.memo(Markets);
export default Markets;
