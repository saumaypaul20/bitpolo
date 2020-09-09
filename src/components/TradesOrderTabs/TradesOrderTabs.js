import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Colors, Images, Fonts} from '../../theme';
import BPText from '../../common/BPText/BPText';
import PickerComp from '../PickerComp/PickerComp';
import InputCounter from '../InputCounter/InputCounter';
import Spacer from '../../common/Spacer/Spacer';
import BPButton from '../../common/BPButton/BPButton';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {splitIt} from '../../utils/converters';
import {getMatchingMarketList} from '../../api/markets.api';
import {cos} from 'react-native-reanimated';
import {
  getAuthToken,
  getInfoAuthToken,
  getDeviceId,
} from '../../utils/apiHeaders.utils';
import {getAsset, getWalletBalance} from '../../api/wallet.api';
import {
  fetchedWalletBalance,
  fetchedWalletAssets,
} from '../../redux/actions/wallet.actions';
import {orderPut} from '../../api/orders.api';
import {
  setordertab,
  setordertabprice,
  setordertabtotal,
  setordertabamount,
} from '../../redux/actions/ordertab.actions';
const divideIt = i => {
  let divider = {};
  if (i.match('INR')) {
    divider = splitIt(i, 'INR');
  } else if (i.match('USDT')) {
    divider = splitIt(i, 'USDT');
  }
  return divider;
};
const Tab = ({label, onPress, active, type}) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: Colors.white,
        borderBottomWidth: active === type ? 1 : 0,
        paddingVertical: 10,
      }}
      onPress={() => onPress()}>
      <BPText style={{marginHorizontal: 10}}>{label}</BPText>
    </TouchableOpacity>
  );
};

const TradesOrderTabs = () => {
  //alert("ordertabs")
  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer.auth_attributes);
  const currentordertab = useSelector(state => state.ordertab.tab);
  const currentprice = useSelector(state => state.ordertab.price);
  const currentamount = useSelector(state => state.ordertab.amount);
  const currenttotal = useSelector(state => state.ordertab.total);
  // const [tab, settab] = useState(2);
  const [inramount, setinramount] = useState(0);
  const [cryptoamount, setcryptoamount] = useState(0);
  const [total, settotal] = useState(0);
  const [range, setrange] = useState(null);
  const [tradeDetail, setTradeDetail] = useState(null);
  const [parts] = useState([25, 50, 75, 100]);
  const [pickerOrderVal, setPickerOrderVal] = useState({
    label: 'Limit Order',
    value: 'limit',
  });
  const orderItems = [
    {label: 'Limit Order', value: 'limit'},
    {label: 'Market Order', value: 'market'},
  ];
  const activeTradePair = useSelector(
    state => state.marketReducer.activeTradePair,
    shallowEqual,
  );

  const balance = useSelector(
    state => state.walletReducer.balance?.data[divideIt(activeTradePair).b],
    shallowEqual,
  );

  // const currencies = useSelector(state => state.marketReducer.currencies.find(i => i.value === activeTradePair), shallowEqual)

  const market_data = useSelector(
    state =>
      state.marketReducer.data.find(i => i.params[0] === activeTradePair),
    shallowEqual,
  );

  const getMatchingMarket = async () => {
    let res = await getMatchingMarketList();
    //console.log("getMatchingMarketList", JSON.stringify(res));
    if (res.status) {
      res.data[0].map((i, value) => {
        console.log('getMatchingMarketList', i, value);
        console.log('getMatchingMarketList', Object.keys(i));
        let tt = Object.keys(i)[0];
        console.log(
          'getMatchingMarketList',
          i[tt].filter(key => key.name == activeTradePair)[0],
        );
        if (i[tt].filter(key => key.name == activeTradePair).length > 0) {
          console.log(
            'getMatchingMarketList1',
            i[tt].filter(key => key.name == activeTradePair),
          );
          setTradeDetail(i[tt].filter(key => key.name == activeTradePair)[0]);
        }
      });
    }
  };

  useEffect(() => {
    getMatchingMarket();
  }, [activeTradePair]);

  useEffect(() => {
    if (market_data && currentprice === 0) {
      if (tradeDetail) {
        setPrice(
          parseFloat(market_data.params[1].l).toFixed(tradeDetail?.money_prec),
        );
      }
    }
  }, [tradeDetail, market_data]);

  const setTotal = t => {
    settotal(t.toString());
    dispatch(setordertabtotal(t.toString()));
  };

  const isDisabled = () => {
    if (
      parseFloat(currenttotal) === 0 ||
      parseFloat(currentamount) === 0 ||
      parseFloat(currenttotal) === 0 ||
      parseFloat(currenttotal) < tradeDetail?.min_amount
    ) {
      return true;
    }
    return false;
  };
  const onsubmit = async () => {
    let payload = {
      data: {
        attributes: {
          market: activeTradePair,
          side: currentordertab,
          amount: currenttotal,
          pride: currentprice,
          takerFeeRate: user.attributes.taker_fee,
          source: 'Bitpolo source',
        },
      },
    };

    let api = 'put-limit';
    if (pickerOrderVal !== 'limit') {
      api = 'put-market';
    }

    let res = await orderPut(payload, api);
    if (res.status) {
      console.log(res.data);
      alert('Success!');
      //setcryptoamount(0)
    } else {
      alert(res.data.data.attributes.message);
    }
  };
  const setPrice = t => {
    let amt = currentamount ? currentamount : 0;
    setinramount(t);
    dispatch(setordertabprice(t));
    setTotal(parseFloat(t * amt).toFixed(tradeDetail?.money_prec));
    dispatch(
      setordertabtotal(parseFloat(t * amt).toFixed(tradeDetail?.money_prec)),
    );
  };
  const changeAmount = (t, type) => {
    //console.log("changeAmount", t, type, parseFloat(t))
    if (type == 'inramount') {
      let amt = parseFloat(t);
      //console.log("changeAmount", amt)
      setinramount(amt);
      dispatch(setordertabprice(amt));
      let tt = amt * currentamount;
      //console.log("changeAmount", tt)
      setTotal(tt);
    } else if (type == 'cryptoamount') {
      // let crpt = parseFloat(t).toFixed(tradeDetail?.stock_prec)
      let crpt = parseFloat(t);
      setcryptoamount(t);
      dispatch(setordertabamount(t));
      // let nt = (t * inramount).toFixed(tradeDetail?.money_prec)
      let nt = t * currentprice;
      setTotal(nt);
    } else if (type == 'total') {
      //console.log("total", (parseFloat(t) / inramount).toFixed(tradeDetail?.money_prec))
      // let nt = Number(t)
      setTotal(t);
      let c = t / parseFloat(currentprice);
      c = parseFloat(c);
      // alert(c);
      setcryptoamount(c);
      dispatch(setordertabamount(c.toFixed(tradeDetail?.stock_prec)));
    }
  };

  const letItBlur = t => {
    if (t) setTotal(t.toFixed(tradeDetail?.money_prec));
  };

  const onIncreaseINR = () => {
    let amt = currentprice ? currentprice : 0;
    setinramount(
      (parseFloat(amt) + 1 / Math.pow(10, tradeDetail?.money_prec))
        .toFixed(tradeDetail?.money_prec)
        .toString(),
    );

    dispatch(
      setordertabprice(
        (parseFloat(amt) + 1 / Math.pow(10, tradeDetail?.money_prec))
          .toFixed(tradeDetail?.money_prec)
          .toString(),
      ),
    );
    let nt = (currentamount * currentprice).toFixed(tradeDetail?.money_prec);
    setTotal(nt);
  };
  const onDecreaseINR = () => {
    if (currentprice == 0) {
      return;
    }
    let amt = currentprice ? currentprice : 0;
    setinramount(
      (parseFloat(amt) - 1 / Math.pow(10, tradeDetail?.money_prec))
        .toFixed(tradeDetail?.money_prec)
        .toString(),
    );
    dispatch(
      setordertabprice(
        (parseFloat(amt) - 1 / Math.pow(10, tradeDetail?.money_prec))
          .toFixed(tradeDetail?.money_prec)
          .toString(),
      ),
    );

    let nt = (currentamount * currentprice).toFixed(tradeDetail?.money_prec);
    setTotal(nt);
  };
  const onIncreaseCRYPTO = () => {
    let amt = currentamount ? currentamount : 0;
    setcryptoamount(
      (parseFloat(amt) + 1 / Math.pow(10, tradeDetail?.stock_prec))
        .toFixed(tradeDetail?.stock_prec)
        .toString(),
    );

    dispatch(
      setordertabamount(
        (parseFloat(amt) + 1 / Math.pow(10, tradeDetail?.stock_prec))
          .toFixed(tradeDetail?.stock_prec)
          .toString(),
      ),
    );
    let nt = (currentamount * currentprice).toFixed(tradeDetail?.money_prec);
    setTotal(nt);
  };
  const onDecreaseCRYPTO = () => {
    if (currentamount == 0) {
      return;
    }
    let amt = currentamount ? currentamount : 0;
    setcryptoamount(
      (parseFloat(amt) - 1 / Math.pow(10, tradeDetail?.stock_prec))
        .toFixed(tradeDetail?.stock_prec)
        .toString(),
    );
    dispatch(
      setordertabamount(
        (parseFloat(amt) + 1 / Math.pow(10, tradeDetail?.stock_prec))
          .toFixed(tradeDetail?.stock_prec)
          .toString(),
      ),
    );
    let nt = (currentamount * currentprice).toFixed(tradeDetail?.money_prec);
    setTotal(nt);
  };
  const onIncreaseTOTAL = () => {
    let amt = currenttotal ? currenttotal : 0;
    settotal(
      (parseFloat(amt) + 1 / Math.pow(10, tradeDetail?.stock_prec))
        .toFixed(tradeDetail?.stock_prec)
        .toString(),
    );
    dispatch(
      setordertabtotal(
        (parseFloat(amt) + 1 / Math.pow(10, tradeDetail?.stock_prec))
          .toFixed(tradeDetail?.stock_prec)
          .toString(),
      ),
    );
  };
  const onDecreaseTOTAL = () => {
    if (currenttotal === 0) {
      return;
    }
    let amt = currenttotal ? currenttotal : 0;
    settotal(
      (parseFloat(amt) - 1 / Math.pow(10, tradeDetail?.stock_prec))
        .toFixed(tradeDetail?.stock_prec)
        .toString(),
    );
    dispatch(
      setordertabtotal(
        (parseFloat(amt) - 1 / Math.pow(10, tradeDetail?.stock_prec))
          .toFixed(tradeDetail?.stock_prec)
          .toString(),
      ),
    );
  };

  const getWalletAsset = useCallback(async () => {
    let toPassHeader = {
      Authorization: getAuthToken(),
      info: getInfoAuthToken(),
      device: getDeviceId(),
    };
    let assetsResult = await getAsset(toPassHeader);
    if (assetsResult.status) {
      let balanceResult = await getWalletBalance(toPassHeader);

      if (balanceResult.status) {
        dispatch(fetchedWalletBalance(balanceResult.data));
        dispatch(fetchedWalletAssets(assetsResult.data));
        // getBanksList()
      }
    }
  }, []);

  useEffect(() => {
    getWalletAsset();
  }, []);

  return !tradeDetail && !market_data ? (
    <View
      style={{
        minHeight: 200,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator color={Colors.white} size="large" />
    </View>
  ) : (
    <View>
      <View
        style={{
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: Colors.darkGray2,
          alignSelf: 'stretch',
          flexDirection: 'row',
        }}>
        <Tab
          label="Buy"
          active={currentordertab}
          type={2}
          onPress={() => dispatch(setordertab(2))}
        />
        <Tab
          label="Sell"
          active={currentordertab}
          type={1}
          onPress={() => dispatch(setordertab(1))}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'stretch',
          justifyContent: 'flex-end',
          paddingVertical: 15,
          alignItems: 'center',
        }}>
        <View style={{flex: 0.6, borderRadius: 4, alignSelf: 'flex-start'}}>
          <PickerComp
            items={orderItems}
            pickerVal={pickerOrderVal}
            setPickerVal={setPickerOrderVal}
            chevronPositionTop={3}
            height={20}
            scale={0.8}
            color={Colors.white}
          />
        </View>
      </View>

      <View style={{marginRight: 16, marginLeft: 3}}>
        <InputCounter
          label={'Amount in INR'}
          disabled={false}
          onInputChange={t => dispatch(setordertabprice(t))}
          validate={() => changeAmount(currentprice, 'inramount')}
          input={currentprice}
          onIncrease={onIncreaseINR}
          onDecrease={onDecreaseINR}
        />

        <Spacer space={8} />
        {pickerOrderVal == 'market' ? (
          currentordertab === 2 ? (
            <>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {/* <BPText style={{opacity:0.5, fontFamily: Fonts.FONT_MEDIUM}}>Total (BDX)</BPText> */}
                {/* <InputCounter label={`Total (${divideIt(activeTradePair).b})`} validate={(t) => setTotal(t)} input={total}  /> */}
                <InputCounter
                  onInputChange={t => dispatch(setordertabtotal(t))}
                  validate={() => changeAmount(currenttotal, 'total')}
                  input={currenttotal}
                  onIncrease={onIncreaseTOTAL}
                  onDecrease={onDecreaseTOTAL}
                />
              </View>
            </>
          ) : (
            <>
              <InputCounter
                label={`Amount  ${divideIt(activeTradePair).a}`}
                onInputChange={t => dispatch(setordertabamount(t))}
                validate={() => changeAmount(currentamount, 'cryptoamount')}
                input={currentamount}
                onIncrease={onIncreaseCRYPTO}
                onDecrease={onDecreaseCRYPTO}
              />
            </>
          )
        ) : (
          <InputCounter
            label={`Amount  ${divideIt(activeTradePair).a}`}
            onInputChange={t => dispatch(setordertabamount(t))}
            validate={() => changeAmount(currentamount, 'cryptoamount')}
            input={currentamount}
            onIncrease={onIncreaseCRYPTO}
            onDecrease={onDecreaseCRYPTO}
          />
        )}
        <Spacer space={4} />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: 4,
            opacity: 0.5,
          }}>
          {parts.map((i, index) => {
            return (
              <TouchableOpacity
                key={index.toString()}
                onPress={() => setrange(i)}>
                <BPText
                  style={[
                    styles.percentages,
                    {opacity: range === i ? 1 : 0.7},
                  ]}>
                  {i}%
                </BPText>
              </TouchableOpacity>
            );
          })}
        </View>

        <Spacer space={17} />
        {pickerOrderVal == 'limit' ? (
          <>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.darkGray3,
                flexDirection: 'row',
              }}>
              <View style={{flex: 1}}>
                <BPText style={{opacity: 0.5, fontFamily: Fonts.FONT_MEDIUM}}>
                  Total
                </BPText>
              </View>
              <View style={{flex: 3}}>
                <InputCounter
                  onInputChange={t => dispatch(setordertabtotal(t))}
                  validate={() => changeAmount(currenttotal, 'total')}
                  input={currenttotal}
                />
              </View>

              <View style={{flex: 1}}>
                <BPText style={{opacity: 0.5, fontFamily: Fonts.FONT_MEDIUM}}>
                  {divideIt(activeTradePair).b}
                </BPText>
              </View>
            </View>
          </>
        ) : null}

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 8,
          }}>
          <BPText style={{opacity: 0.4, color: Colors.white}}>Min</BPText>
          <BPText style={{opacity: 0.4, color: Colors.white}}>
            {tradeDetail?.min_amount || '0'}
          </BPText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <BPText style={{opacity: 0.5, fontFamily: Fonts.FONT_MEDIUM}}>
            Avbl
          </BPText>
          <BPText style={{opacity: 0.5, fontFamily: Fonts.FONT_MEDIUM}}>
            {`${balance?.available.balance.toFixed(2)}`}{' '}
            {divideIt(activeTradePair).b}
          </BPText>
        </View>

        <Spacer space={8} />

        <View style={{alignSelf: 'stretch'}}>
          <BPButton
            backgroundColor={
              currentordertab === 2 ? Colors.lightGreen : Colors.red
            }
            textColor={Colors.white}
            label={currentordertab === 2 ? 'Buy' : 'Sell'}
            width="auto"
            onPress={() => onsubmit()}
            disabled={isDisabled()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  percentages: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.white,
    color: Colors.white,
    borderRadius: 1,
    padding: 6,
    textAlign: 'center',
  },
});

export default TradesOrderTabs;
