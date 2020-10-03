import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Clipboard,
  Dimensions,
  DeviceEventEmitter,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Container,
  Content,
  Button,
  Icon,
  Toast,
  Root,
  Input,
} from 'native-base';
import Toolbar from '../../../../components/Toolbar/Toolbar';
import {Colors, Images, Fonts} from '../../../../theme';
import {screenNames} from '../../../../routes/screenNames/screenNames';
import BPText from '../../../../common/BPText/BPText';
import BPButtonSmall from '../../../../common/BPButtonSmall/BPButtonSmall';
import SettingsListItem from '../../../../common/SettingsListItem/SettingsListItem';
import BPButton from '../../../../common/BPButton/BPButton';
import WalletEndNotes from '../../../../components/WalletEndNotes/WalletEndNotes';
import WalletEndButtons from '../../../../components/WalletEndButtons/WalletEndButtons';
import Spacer from '../../../../common/Spacer/Spacer';
import {useNavigation} from '@react-navigation/native';
import ChevronRight from '../../../../common/ChevronRight/ChevronRight';
import BPInput from '../../../../common/BPInput/BPInput';
import {useSelector, shallowEqual} from 'react-redux';
import PickerComp from '../../../../components/PickerComp/PickerComp';
import {act} from 'react-test-renderer';
import {equalityFnBankslist} from '../../../../utils/reduxChecker.utils';
import {withdraw, withdrawRequest} from '../../../../api/wallet.api';
import {
  getPublicIP,
  getDeviceId,
  getInfoAuthToken,
  getAuthToken,
} from '../../../../utils/apiHeaders.utils';
import {imageRenderer} from '../../../../utils/component.utils';
import {generateOtp} from '../../../../api/users.api';
import {getMatchingMarketList} from '../../../../api/markets.api';

const Tab1 = ({setView, activecoin, setPaymentId, prec}) => {
  console.log(activecoin);
  const google_auth = useSelector(
    state => state.authReducer.auth_attributes.attributes.google_auth,
    shallowEqual,
  );
  const user_id = useSelector(
    state => state.authReducer.auth_attributes.id,
    shallowEqual,
  );
  const navigation = useNavigation();
  const [withdrawAmount, setWithdrawAmount] = useState(null);
  const [address, setAddress] = useState(null);

  const balance = useSelector(
    state => state.walletReducer.balance.data[activecoin.asset_code],
    shallowEqual,
  );
  // alert(activecoin.asset_code)

  const onsubmit = async () => {
    // alert('i')
    let payload = {
      data: {
        id: user_id,
        attributes: {
          asset: activecoin._id,
          amount: withdrawAmount,
          ip: await getPublicIP(),
          // g2f_code:"122232",
          address: address,
          type_of_transfer_statement: 'standard',
          // remarks:"test remarks"
        },
      },
    };

    if (google_auth) {
      // alert(user_id)
      navigation.navigate(screenNames.GOOGLE_VERIFICATION_CODE, {
        payload: payload,
        id: user_id,
        type: 'withdraw confirmation',
      });
    } else {
      let body1 = {
        lang: 'en',
        data: {
          id: user_id,
          attributes: {type: 'withdraw confirmation'},
        },
      };
      let toPassHeader = {
        Authorization: getAuthToken(),
        info: getInfoAuthToken(),
        device: getDeviceId(),
      };

      let res = await generateOtp(body1, toPassHeader);
      if (res.status) {
        navigation.navigate(screenNames.OTP_SCREEN, {
          payload: payload,
          type: 'withdraw confirmation',
        });
      }
    }
  };
  const isDisabled = (withdrawAmount, balance, address) => {
    //alert( parseFloat(withdrawAmount) > parseFloat(balance.available.balance + balance.freeze.balance ))
    if (!withdrawAmount || !address) {
      return true;
    }
    if (
      parseFloat(withdrawAmount) >
      parseFloat(balance.available.balance + balance.freeze.balance)
    ) {
      return true;
    } else if (parseFloat(withdrawAmount) === 0) {
      return true;
    } else if (parseFloat(withdrawAmount)) {
      return false;
    } else if (address && address?.length > 0) {
      //alert("address ")
      return false;
    }
    return true;
  };

  return (
    <Root>
      <View style={{flex: 1}}>
        <View style={{marginHorizontal: 16}}>
          <WithdrawHeader
            available={`${balance.available.balance.toFixed(prec.fee_prec)} ${
              activecoin.asset_code
            }`}
            order={`${balance.freeze.balance.toFixed(2)} ${
              activecoin.asset_code
            }`}
            total={`${(
              balance.available.balance + balance.freeze.balance
            ).toFixed(2)} ${activecoin.asset_code}`}
          />

          <View style={{paddingVertical: 20}}>
            <BPInput
              label="Withdraw Amount"
              keyboardType={'number-pad'}
              text={withdrawAmount}
              setText={t => setWithdrawAmount(t)}
              rightEl={<BPText>{activecoin.asset_code}</BPText>}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 8,
              }}>
              <BPText style={{fontSize: 12}}>
                Fee: {activecoin.withdrawal_fee} {activecoin.asset_code}
              </BPText>
              <BPText style={{fontSize: 12}}>
                You will Get:{' '}
                {withdrawAmount > 0
                  ? parseFloat(withdrawAmount) - activecoin.withdrawal_fee
                  : 0}{' '}
                {activecoin.asset_code}
              </BPText>
            </View>

            <Spacer space={20} />

            <BPInput
              label="Address"
              text={address}
              setText={t => setAddress(t)}
              rightEl={
                <Image
                  source={Images.small_qr_code_icon}
                  style={{width: 16, height: 16}}
                  resizeMode="contain"
                />
              }
            />

            <Spacer space={20} />

            {/* <BPInput label="Payment id" keyboardType={"number-pad"} text={payment_id} setText={(t)=>setPaymentId(t)}/> */}
          </View>

          <WalletEndButtons activecoin={activecoin} type={2} />

          <View style={{alignSelf: 'center', marginTop: 44}}>
            <BPButton
              label="Submit"
              style={{paddingHorizontal: 60}}
              disabled={isDisabled(withdrawAmount, balance, address)}
              onPress={() => onsubmit()}
            />
          </View>
        </View>
      </View>
    </Root>
  );
};
const Tab2 = ({setView, activecoin}) => {
  const navigation = useNavigation();
  const google_auth = useSelector(
    state => state.authReducer.auth_attributes.attributes.google_auth,
    shallowEqual,
  );
  const user_id = useSelector(
    state => state.authReducer.auth_attributes.id,
    shallowEqual,
  );
  const banks = useSelector(state => state.payments.banks, equalityFnBankslist);
  const [pickerOrderVal, setPickerOrderVal] = useState({
    label: 'Traditional Payment',
    value: 0,
  });
  const [withdrawAmount, setWithdrawAmount] = useState(null);
  const [remarks, setRemarks] = useState(null);
  const balance = useSelector(
    state => state.walletReducer.balance.data['INR'],
    shallowEqual,
  );
  const asset = activecoin._id;
  // console.log("BANKS00000000000000000000000", banks)

  // const options= [
  //     {label: 'Traditional Payment', value: 0},
  //     {label: 'Payment Gateway', value: 1},
  //     {label: 'Instant Bank Transfer', value: 2},
  // ]

  const [options, setoptions] = useState([]);
  useEffect(() => {
    if (banks.length > 0) {
      let arr = [];
      banks.forEach(item => {
        let option = {
          label: `${item.account_name}-${
            item.type_of_account.bank_account.account_number
          }`,
          value: item._id,
        };
        arr.push(option);
      });
      setoptions(arr);
    }
  }, []);

  const isDisabled2 = () => {
    if (!remarks) {
      return true;
    } else if (!withdrawAmount) {
      return true;
    }
    return false;
  };

  const onsubmit = async () => {
    let payload = {
      id: user_id,
      data: {
        attributes: {
          asset: asset,
          amount: withdrawAmount,
          ip: await getPublicIP(),

          type_of_transfer_statement: 'standard',
          remarks: remarks,
        },
      },
    };

    if (google_auth) {
      // alert(user_id)
      navigation.navigate(screenNames.GOOGLE_VERIFICATION_CODE, {
        payload: payload,
        id: user_id,
        type: 'withdraw confirmation',
      });
    } else {
      let body1 = {
        lang: 'en',
        data: {
          id: user.id,
          attributes: {type: 'withdraw confirmation'},
        },
      };
      let toPassHeader = {
        Authorization: getAuthToken(),
        info: getInfoAuthToken(),
        device: getDeviceId(),
      };

      let res = await generateOtp(body1, toPassHeader);
      if (res.status) {
        navigation.navigate(screenNames.OTP_SCREEN, {
          payload: payload,
          type: 'withdraw confirmation',
        });
      }
    }
    // let res =  await withdraw(payload);
    setRemarks(null);
    setWithdrawAmount(null);
  };

  return (
    <View>
      {/* <SettingsListItem  
                onPress= {()=> setView(1)}
                noBorder 
                label={"INR (Rupee)"}
                image = {Images.rupee_icon}
                backgroundColor={Colors.darkGray3} 
                rightElement={<ChevronRight/>}/> */}

      <View style={{marginHorizontal: 16}}>
        <WithdrawHeader
          available={`${balance.available.balance.toFixed(2)} INR`}
          order={`${balance.freeze.balance.toFixed(2)} INR`}
          total={`${(
            balance.available.balance + balance.freeze.balance
          ).toFixed(2)} INR`}
        />

        <Spacer space={30} />
        {banks?.length > 0 ? (
          <View>
            <BPText style={{fontFamily: Fonts.FONT_MEDIUM}}>
              Withdraw to this bank account
            </BPText>

            <View
              style={{
                alignSelf: 'stretch',
                borderWidth: 1,
                borderColor: Colors.lightWhite,
                marginVertical: 10,
                borderRadius: 5,
                height: 50,
                paddingLeft: 10,
                position: 'relative',
                zIndex: 1,
              }}>
              <PickerComp
                items={options}
                pickerVal={pickerOrderVal}
                setPickerVal={setPickerOrderVal}
                chevronPositionTop={16}
                height={50}
                width={Dimensions.get('window').width - 32}
                scale={0.9}
                color={Colors.white}
              />
            </View>

            <BPInput
              label="Withdraw Amount"
              keyboardType={'number-pad'}
              text={withdrawAmount}
              setText={t => setWithdrawAmount(t)}
            />
            <Spacer />
            <BPInput
              label="Remarks"
              text={remarks}
              setText={t => setRemarks(t)}
            />
            <View style={{alignSelf: 'center', marginTop: 44}}>
              <BPButton
                label="Submit"
                style={{paddingHorizontal: 60}}
                onPress={() => onsubmit()}
                disabled={isDisabled2()}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              alignSelf: 'stretch',
              borderColor: Colors.lightWhite,
              borderWidth: 1,
              borderRadius: 4,
              alignItems: 'center',
              padding: 20,
            }}>
            <BPText>Please add your bank detals for INR Withdrawals</BPText>
            <BPButton
              onPress={() =>
                navigation.navigate(screenNames.BANK_ACCOUNT_DETAILS)
              }
              label="My Account"
              style={{
                paddingHorizontal: 30,
                alignSelf: 'center',
                marginTop: 20,
              }}
            />
          </View>
        )}
        <View style={{marginTop: 24}}>
          <WalletEndNotes
            notes={[
              'Withdrawals up to 2 Lakhs made between 9AM to 10PM will be processed within one hour.',
              'Withdrawals made outside the specified time will be processed in the next cycle.s',
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const Withdraw = () => {
  const navigation = useNavigation();
  const [load, setload] = useState(true);
  const [activeView, setView] = useState(1);
  const [activecoin, setactivecoin] = useState({asset_code: 'BTC'});
  const [withdrawAmount, setWithdrawAmount] = useState(null);
  const [address, setAddress] = useState(null);
  const [showItems, setshowItems] = useState(false);
  const [ttdetail, settdetail] = useState({money_prec: 2, stock_prec: 2});
  const [marketlist, setmarketlist] = useState([]);
  const assetList = useSelector(state => state.walletReducer.assets);

  // const address = '14gC4zbkDdfdn6DscjuYqBufndzzfddLQzGViAg5cdfHJ'
  const getMatchingMarket = async () => {
    setload(true);
    // alert('indisde getmatch');
    let res = await getMatchingMarketList();
    // alert(JSON.stringify(res));
    // alert(JSON.stringify(activecoin));
    //console.log("getMatchingMarketList", JSON.stringify(res));
    if (res.status) {
      console.log(res);

      setmarketlist(res.data[0]);
      setload(false);
      // res.data[0].map((i, value) => {
      //   console.log('getMatchingMarketList', i, value);
      //   console.log('getMatchingMarketList objec', Object.keys(i));
      //   let tt = Object.keys(i)[0];
      //   console.log(
      //     'getMatchingMarketList',
      //     i[tt].filter(key => key.money == activecoin.asset_code)[0],
      //   );
      //   if (
      //     i[tt].filter(key => key.money == activecoin.asset_code).length > 0
      //   ) {
      //     // alert('y');
      //     console.log(
      //       'getMatchingMarketList1',
      //       i[tt].filter(key => key.money == activecoin.asset_code),
      //     );
      //     let tdetail = i[tt].filter(
      //       key => key.money == activecoin.asset_code,
      //     )[0];

      //     // alert(JSON.stringify(tdetail));
      //     settdetail(tdetail);
      //   }
      // });
    }
  };

  const changeCoin = coin => {
    let item = assetList.find(i => i.asset_code === coin);
    setactivecoin(item);
  };

  const setActiveView = coin => {
    setload(true);
    setWithdrawAmount(null);
    setAddress(null);
    setshowItems(false);

    changeCoin(coin);
    if (coin !== 'INR') {
      setload(false);
      setView(1);
    } else {
      setload(false);
      setView(2);
    }
  };

  useEffect(() => {
    if (assetList.length > 0) {
      let coin = assetList[0];
      setactivecoin(coin);
      setload(false);
      getMatchingMarket();
    }
  }, []);

  // alert(JSON.stringify(activecoin))

  const tabRenderer = useCallback(
    () =>
      activeView === 1 ? (
        <Tab1
          withdrawAmount={withdrawAmount}
          address={address}
          setView={v => setView(v)}
          activecoin={activecoin}
          setWithdrawAmount={t => setWithdrawAmount(t)}
          setAddress={t => setAddress(t)}
          setPaymentId={r => setPaymentId(r)}
          prec={ttdetail}
        />
      ) : (
        <Tab2 activecoin={activecoin} setView={v => setView(v)} />
      ),
    [activeView, activecoin],
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container style={{flex: 1, backgroundColor: Colors.primeBG}}>
        {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
        <Toolbar
          enableBackButton
          title={screenNames.WITHDRAW}
          rightElement={
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(screenNames.ADDRESS_MANAGEMENT)
              }>
              <BPText style={{fontSize: 12}}>Address Management</BPText>
            </TouchableOpacity>
          }
        />
        <Content contentContainerStyle={{flexGrow: 1}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: 0,
            }}>
            <View style={{alignSelf: 'stretch'}}>
              {/* <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                     { assetList.map((item,index)=>{
                         if(item.asset_code !== "INR"){
                             return <BPButtonSmall 
                             key={index.toString()}
                             label={item.asset_code}  
                             labelStyle={{color: Colors.primeBG}} 
                             backgroundColor={Colors.white}
                             image={{uri:item.logo_url}}
                             image_size={12}
                             onPress={()=>{changeCoin(item.asset_code)}}
                             marginRight={3}
                             />
                         }
                     }

                         
                        )  
                    }
                        
                    </View> */}

              {activecoin?.logo_url && (
                <SettingsListItem
                  onPress={() => setshowItems(!showItems)}
                  noBorder
                  label={`${activecoin.asset_code} (${activecoin.asset_name})`}
                  image={imageRenderer(activecoin.asset_code)}
                  backgroundColor={Colors.darkGray}
                  rightElement={
                    !showItems ? (
                      <ChevronRight />
                    ) : (
                      <ChevronRight arrow="down" />
                    )
                  }
                />
              )}

              {showItems && assetList.length > 0 && (
                <View style={{marginTop: 5}}>
                  {assetList.map(i => {
                    let p = {label: i.asset_code, value: i.asset_code};
                    // return <TouchableOpacity style={{marginHorizontal:16, paddingVertical:10, marginHorizontal:32}} onPress={()=> setActiveView(i.asset_code)}><BPText>{i.asset_code}</BPText></TouchableOpacity>
                    return (
                      <SettingsListItem
                        key={i.asset_code}
                        onPress={() => setActiveView(i.asset_code)}
                        backgroundColor={Colors.darkGray}
                        label={`${i.asset_code} (${i.asset_name})`}
                        image={imageRenderer(i.asset_code)}
                        noBorder
                      />
                    );
                  })}
                </View>
              )}
            </View>

            <View>{!load && tabRenderer()}</View>
          </View>
        </Content>
      </Container>
    </SafeAreaView>
  );
};

// const WithdrawTextInput =({label,text,setText,rightEl}) =>{
//     return(
//         <>
//             <BPText style={{fontFamily: Fonts.FONT_MEDIUM}}>{label}</BPText>
//             <View style={{borderColor: Colors.lightWhite, borderRadius: 6, borderWidth:1, marginTop:8, paddingHorizontal:16, flexDirection:'row', alignItems:'center'}}>
//                 <Input
//                     keyboardType="default"
//                     value={text}
//                     onChangeText ={(t)=> setText(t)}
//                 />
//                {rightEl && <View style={{alignItems:'center', justifyContent:'center', borderLeftWidth:1, borderColor: Colors.lightWhite, position:'absolute', right:0, top:0, bottom:0, padding:14}}>
//                     {rightEl}
//                 </View>}
//             </View>
//         </>
//     )
// }

const WithdrawHeader = ({available, order, total}) => {
  return (
    <>
      <View
        style={{
          alignSelf: 'center',
          justifyContent: 'space-between',
          marginVertical: 20,
        }}>
        <BPText
          style={{color: Colors.lightWhite, fontSize: 12, textAlign: 'center'}}>
          Available Balances
        </BPText>
        <BPText style={{color: Colors.lightWhite}}>{available}</BPText>
      </View>
      <View
        style={{
          borderTopColor: Colors.lightWhite,
          borderTopWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'stretch',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            padding: 8,
            borderColor: Colors.lightWhite,
            borderRightWidth: 0.5,
          }}>
          <BPText>In Order</BPText>
          <BPText>{order}</BPText>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            padding: 8,
            borderColor: Colors.lightWhite,
            borderLeftWidth: 0.5,
          }}>
          <BPText>Total Balance</BPText>
          <BPText>{total}</BPText>
        </View>
      </View>
    </>
  );
};

export default Withdraw;
