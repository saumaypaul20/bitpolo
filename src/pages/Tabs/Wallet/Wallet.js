import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Image, ActivityIndicator, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toolbar from '../../../components/Toolbar/Toolbar';
import {Content, Button, Container, Switch, Icon} from 'native-base';
import {Images, Colors, Fonts} from '../../../theme';
import BPText from '../../../common/BPText/BPText';
import BPButtonSmall from '../../../common/BPButtonSmall/BPButtonSmall';
import SettingsListItem from '../../../common/SettingsListItem/SettingsListItem';
import {useNavigation} from '@react-navigation/native';
import {screenNames} from '../../../routes/screenNames/screenNames';
import BPSwitch from '../../../common/BPSwitch/BPSwitch';
import {getAsset, getWalletBalance} from '../../../api/wallet.api';
import {
  getAuthToken,
  getInfoAuthToken,
  getDeviceId,
} from '../../../utils/apiHeaders.utils';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {
  fetchedWalletBalance,
  fetchedWalletAssets,
} from '../../../redux/actions/wallet.actions';
import {getBankAccounts} from '../../../api/payments.api';
import {addBanks} from '../../../redux/actions/payments.action';
import {equalityFnIndexPrice} from '../../../utils/reduxChecker.utils';
import {toDecimal} from '../../../utils/converters';
import {imageRenderer} from '../../../utils/component.utils';
import {getIndexPrice} from '../../../api/markets.api';
import {storeIndexPrice} from '../../../redux/actions/markets.action';

import _ from 'lodash';
import {setordertab} from '../../../redux/actions/ordertab.actions';
import BPButton from '../../../common/BPButton/BPButton';
import SignInView from '../../../components/SignInView/SignInView';

const rightEl = val => {
  return <BPText>{val}</BPText>;
};

const Wallet = () => {
  const user = useSelector(
    state => state.authReducer.auth_attributes,
    (l, r) => l.id == r.id,
  );

  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const savedBalance = useSelector(
  //   state => state.walletReducer.balance,
  //   shallowEqual,
  // );
  // const savedAssets = useSelector(
  //   state => state.walletReducer.assets,
  //   shallowEqual,
  // );
  const [isEnabled, setIsEnabled] = useState(false);
  const [assets, setassets] = useState([]);
  const [balance, setbalance] = useState(null);
  const [order, setorder] = useState(false);

  let index_price = useSelector(
    state => state.marketReducer.index_price,
    equalityFnIndexPrice,
  );
  // console.log('index price', index_price);
  const callIndexPriceGetter = async () => {
    let resIndexPrice = await getIndexPrice();
    if (resIndexPrice.status) {
      dispatch(storeIndexPrice(resIndexPrice.data));
    }
  };
  if (!index_price) {
    callIndexPriceGetter();
  }
  // alert(JSON.stringify(index_price))

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const sortByAlpha = () => {
    console.log('soon');
    setorder(!order);
    //  alert(JSON.stringify(assets))
    let arr = _.orderBy(assets, ['asset_name'], [!order ? 'asc' : 'desc']);
    setassets(arr);
  };

  const getWalletAsset = async () => {
    console.log('called getWalletAsset');
    let toPassHeader = {
      Authorization: getAuthToken(),
      info: getInfoAuthToken(),
      device: await getDeviceId(),
    };
    let assetsResult = await getAsset(toPassHeader);
    if (assetsResult.status) {
      let balanceResult = await getWalletBalance(toPassHeader);

      if (balanceResult.status) {
        setbalance(balanceResult.data.data);
        // setassets(assetsResult.data);
        setassets(
          _.orderBy(
            assetsResult.data,
            ['asset_name'],
            [!order ? 'asc' : 'desc'],
          ),
        );
        setorder(!order);

        dispatch(fetchedWalletBalance(balanceResult.data));
        dispatch(fetchedWalletAssets(assetsResult.data));
        getBanksList();
      }
    }
  };

  const getBanksList = async () => {
    // setloading(true)
    console.log('getbankslist');
    let res = await getBankAccounts();
    if (res.status) {
      // setloading(false)
      dispatch(addBanks(res.data));
    }
  };

  useEffect(() => {
    getWalletAsset();
  }, []);

  const totalBTC = useCallback(() => {
    console.log('called totalbrc');
    if (!balance) {
      return;
    }
    let arr = Object.values(balance);
    let res = arr.reduce((acc = 0, cur) => {
      console.log(acc);
      return parseFloat(acc + cur.available?.btc);
    }, 0);
    return res;
  }, [index_price, balance]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primeBG}}>
      <StatusBar
        translucent
        barStyle={Colors.barStyle}
        backgroundColor={Colors.primeBG}
      />
      <Container style={{flex: 1, backgroundColor: Colors.primeBG}}>
        <Content contentContainerStyle={{flexGrow: 1}}>
          {user ? (
            <View style={{flex: 1, justifyContent: 'flex-start'}}>
              {balance && index_price ? (
                <BPText
                  style={{
                    paddingHorizontal: 12,
                    fontSize: 12,
                    paddingVertical: 16,
                    backgroundColor: Colors.darkGray2,
                  }}>
                  Total Value (BTC){' '}
                  <BPText style={{fontFamily: Fonts.FONT_MEDIUM, fontSize: 11}}>
                    {' '}
                    {toDecimal(
                      totalBTC(),
                      Math.pow(
                        10,
                        assets.find(i => i.asset_code === 'BTC')?.precision,
                      ),
                    )}{' '}
                    BTC
                  </BPText>{' '}
                  = ₹{' '}
                  {toDecimal(
                    totalBTC() *
                      index_price.find(i => i.asset === 'BTC').amount,
                    Math.pow(
                      10,
                      assets.find(i => i.asset_code === 'INR')?.precision,
                    ),
                  )}
                </BPText>
              ) : (
                <ActivityIndicator color={Colors.white} size="small" />
              )}

              <View
                style={{
                  backgroundColor: Colors.darkGray3,
                  padding: 16,
                }}>
                <BPText>Estimated value</BPText>

                {balance ? (
                  <BPText
                    style={{
                      fontFamily: Fonts.FONT_MEDIUM,
                      letterSpacing: 1.89,
                      fontSize: 24,
                    }}>
                    {toDecimal(
                      totalBTC(),
                      Math.pow(
                        10,
                        assets.find(i => i.asset_code === 'BTC')?.precision,
                      ),
                    )}{' '}
                    BTC{' '}
                  </BPText>
                ) : (
                  <ActivityIndicator color={Colors.white} size="large" />
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 20,
                  }}>
                  <BPButtonSmall
                    image={Images.deposit_icon}
                    label="Deposit"
                    image_size={20}
                    onPress={() => navigation.navigate(screenNames.DEPOSIT)}
                    disabled={assets.length === 0}
                  />

                  <BPButtonSmall
                    image={Images.withdraw_icon}
                    label="Withdraw"
                    image_size={20}
                    onPress={() => navigation.navigate(screenNames.WITHDRAW)}
                    disabled={assets.length === 0}
                  />
                  <BPButtonSmall
                    image={Images.history_icon}
                    label="History"
                    image_size={13}
                    disabled={assets.length === 0}
                    onPress={() =>
                      navigation.navigate(screenNames.WALLET_HISTORY, {
                        defaultview: 1,
                      })
                    }
                  />
                </View>
              </View>

              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 16,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      alignSelf: 'stretch',
                      paddingVertical: 20,
                    }}>
                    <BPText style={{fontSize: 15}}>Hide Zero Balances </BPText>

                    <BPSwitch
                      isEnabled={isEnabled}
                      onToggleSwitch={toggleSwitch}
                    />
                  </View>

                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    }}>
                    <Button transparent onPress={() => sortByAlpha()}>
                      {/* <Image
                      source={Images.sort_alpha_down_icon}
                      style={{width: 15.5}}
                      resizeMode="contain"
                    /> */}
                      <Icon
                        name={!order ? 'sort-alpha-up' : 'sort-alpha-down'}
                        type="FontAwesome5"
                        style={{color: Colors.lightWhite, fontSize: 20}}
                      />
                    </Button>
                  </View>
                </View>

                <View>
                  {assets.length > 0 &&
                    balance &&
                    assets.map(item => {
                      if (isEnabled) {
                        if (balance[item.asset_code]?.available.balance === 0) {
                          return null;
                        }
                      }
                      return (
                        <SettingsListItem
                          key={item._id}
                          label={`${item.asset_code} (${item.asset_name})`}
                          // image={imageRenderer(item.asset_code, 0)}
                          image={{uri: item.logo_url}}
                          paddingHorizontal={20}
                          borderBottom
                          imageType={0}
                          rightElement={rightEl(
                            balance[item.asset_code]?.available.balance.toFixed(
                              item?.precision,
                            ),
                          )}
                        />
                      );
                    })}

                  {assets.length == 0 && (
                    <ActivityIndicator size="large" color="#fff" />
                  )}
                </View>
              </View>
            </View>
          ) : (
            <SignInView />
          )}
        </Content>
      </Container>
    </SafeAreaView>
  );
};

export default Wallet;
