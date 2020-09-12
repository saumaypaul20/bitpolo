import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ActivityIndicator,
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
import ChevronRight from '../../../../common/ChevronRight/ChevronRight';
import {createAssetAddress, deposit} from '../../../../api/wallet.api';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {
  getAuthToken,
  getInfoAuthToken,
  getDeviceId,
} from '../../../../utils/apiHeaders.utils';
import {convertDate} from '../../../../utils/converters';
import QRCode from 'react-native-qrcode-svg';
import {copyText, imageRenderer} from '../../../../utils/component.utils';
import PickerComp from '../../../../components/PickerComp/PickerComp';
import Modal from 'react-native-modal';
import {addBanks} from '../../../../redux/actions/payments.action';
import {getBankAccounts} from '../../../../api/payments.api';
import {equalityFnBankslist} from '../../../../utils/reduxChecker.utils';
import {useNavigation} from '@react-navigation/native';

let currentTime = new Date();

const getCurrentTime = () => {
  return currentTime.toTimeString().split(' ')[0];
};
const rightEl = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(screenNames.WALLET_HISTORY, {defaultview: 1})
      }>
      <BPText style={{color: Colors.lightWhite, fontSize: 15}}>History</BPText>
    </TouchableOpacity>
  );
};

// const copyAddress =(address) =>{
//     Clipboard.setString(address)
//     Toast.show({
//         text: 'Copied Address!',
//         buttonText: 'Okay'
//       })
// }

const Tab1 = ({address, setView, activecoin, image}) => {
  return (
    <View>
      {/* <SettingsListItem  
                    onPress= {()=> setView(2)}
                    noBorder 
                    label={`${activecoin}`}
                    image = {image}
                    backgroundColor={Colors.darkGray3} 
                    rightElement={<ChevronRight />}/> */}
      <View style={{marginHorizontal: 16}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 20,
          }}>
          <BPText style={{color: Colors.lightWhite}}>
            {activecoin.asset_code} Deposit Address
          </BPText>
          <BPText style={{color: Colors.lightWhite}}>
            {convertDate(new Date(), '-', true)} {getCurrentTime()}
          </BPText>
        </View>

        <BPText
          style={{
            fontSize: 10,
            textAlign: 'center',
            borderWidth: 1,
            borderColor: Colors.lightWhite,
            borderRadius: 4,
            paddingVertical: 14,
          }}>
          {address}
        </BPText>

        <View
          style={{
            alignSelf: 'center',
            padding: 15,
            marginTop: 42,
            borderWidth: 1,
            borderColor: Colors.darkGray,
          }}>
          {/* <Image source={Images.qr} style={{width:140, height:140}}  resizeMode="contain"/> */}

          <View
            style={{alignSelf: 'center', padding: 5, backgroundColor: 'white'}}>
            <QRCode
              value={address}
              size={135}
              backgroundColor="white"
              color="black"
              onError={e => console.log(e)}
            />
          </View>
        </View>

        <Button
          onPress={() => copyText(address, 'Address')}
          transparent
          bordered
          style={{
            flexDirection: 'row',
            borderColor: Colors.lightWhite,
            borderRadius: 6,
            margin: 30,
            alignSelf: 'center',
            paddingVertical: 10,
            paddingHorizontal: 27,
          }}>
          <Image
            source={Images.copy_icon}
            style={{width: 18, height: 18, marginRight: 12}}
            resizeMode="contain"
          />
          <BPText>Copy Address</BPText>
        </Button>

        <WalletEndButtons activecoin={activecoin} type={1} />
      </View>
    </View>
  );
};

const Tab2 = ({setView, activecoin, assetList}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [depositamount, setdepositamount] = useState(null);
  const [impsid, setimpsid] = useState(null);
  const [confirm_impsid, setconfirm_impsid] = useState(null);
  const [remarks, setremarks] = useState(null);
  const [pickerOrderVal, setPickerOrderVal] = useState({
    label: 'Traditional Payment',
    value: 'Traditional Payment',
  });
  const [showModal, setModal] = useState(false);
  const [activeTPM, setTPM] = useState(0);
  const [loading, setloading] = useState(true);
  const [shownote, setshownote] = useState(false);
  const banks = useSelector(state => state.payments.banks, equalityFnBankslist);
  const bank = banks.find(i => i.is_active);
  const balance = useSelector(
    state => state.walletReducer.balance.data['INR'],
    shallowEqual,
  );

  // alert(JSON.stringify(balance))
  // const getBanksList = useCallback(async()=>{
  //     setloading(true)
  //     let res  = await getBankAccounts();
  //     if(res.status){
  //         setloading(false)
  //         dispatch(addBanks(res.data))
  //     }
  // },[])

  useEffect(() => {
    if (banks.length == 0) {
      getBanksList();
    }
  }, []);

  const handleModal = () => {
    setModal(!showModal);
  };

  const onmodasubmit = async () => {
    handleModal();

    let payload = {
      data: {
        attributes: {
          asset: assetList.find(i => i.asset_code === 'INR')._id,
          amount: depositamount,
          type_of_payment_process: pickerOrderVal,
        },
      },
    };

    let res = await deposit(payload);
    if (res.status) {
      //todo
      console.log('dposit res *******', res);
      //alert("res")
      if (pickerOrderVal === 'PaymentGateway') {
        navigation.navigate(screenNames.PAYMENT_WEBVIEW, {
          paymentResult: res.data.data.attributes.result,
        });
      } else if (pickerOrderVal === 'TraditionalPayment') {
        alert(`Amount ${payload.data.attributes.amount} INR is deposited!`);
      }
    } else {
      alert(res.data.data.attributes.message);
    }
  };
  const options = [
    {label: 'Traditional Payment', value: 'TraditionalPayment'},
    // {label: 'Payment Gateway', value: 'PaymentGateway'},
    {label: 'Instant Bank Transfer', value: 'Instant Bank Transfer'},
  ];

  const onTPMchange = val => {
    switch (val) {
      case 0:
        setTPM(0);
        break;
      case 1:
        setTPM(1);
        break;
      case 2:
        setTPM(2);
        break;
      case 3:
        setTPM(3);
        break;
      default:
        setTPM(3);
    }
  };
  const viewRenderer = () => {
    switch (pickerOrderVal) {
      //Tradional Payment
      case 'TraditionalPayment':
        return (
          <>
            <BPText style={{fontSize: 10, marginTop: 16}}>
              {' '}
              For deposit use the following details only
            </BPText>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignSelf: 'stretch',
                marginVertical: 16,
                backgroundColor: Colors.darkGray3,
                paddingVertical: 10,
              }}>
              <BPText style={{fontSize: 10}}>
                For IMPS, NEFT or RTGS use this bank account.
              </BPText>
              <Icon
                type="FontAwesome"
                name="chevron-down"
                style={{color: Colors.white, fontSize: 11, opacity: 0.6}}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignSelf: 'stretch',
              }}>
              <View>
                <BPText style={{fontSize: 10, color: Colors.lightWhite}}>
                  Name
                </BPText>
                <BPText style={{fontSize: 10, color: Colors.lightWhite}}>
                  Bank Name
                </BPText>
                <BPText style={{fontSize: 10, color: Colors.lightWhite}}>
                  Account Number
                </BPText>
                <BPText style={{fontSize: 10, color: Colors.lightWhite}}>
                  IFSC
                </BPText>
                <BPText style={{fontSize: 10, color: Colors.lightWhite}}>
                  Account Type
                </BPText>
              </View>
              <View>
                <BPText style={{fontSize: 10, color: Colors.lightWhite}}>
                  {bank.account_name}
                </BPText>
                <BPText style={{fontSize: 10, color: Colors.lightWhite}}>
                  {bank.label}
                </BPText>
                <BPText style={{fontSize: 10, color: Colors.lightWhite}}>
                  {bank.type_of_account.bank_account.account_number}
                </BPText>
                <BPText style={{fontSize: 10, color: Colors.lightWhite}}>
                  {bank.type_of_account.bank_account.ifsc}
                </BPText>
                <BPText style={{fontSize: 10, color: Colors.lightWhite}}>
                  {bank.type_of_account.bank_account.account_type}
                </BPText>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => copyText(bank.account_name, 'Name')}>
                  <Image
                    source={Images.copy_icon}
                    style={{
                      width: 8,
                      marginVertical: 2,
                      height: 8,
                      marginVertical: 2,
                      marginRight: 12,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => copyText(bank.label, 'Label')}>
                  <Image
                    source={Images.copy_icon}
                    style={{
                      width: 8,
                      marginVertical: 2,
                      height: 8,
                      marginVertical: 2,
                      marginRight: 12,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    copyText(
                      bank.type_of_account.bank_account.account_number,
                      'Account Number',
                    )
                  }>
                  <Image
                    source={Images.copy_icon}
                    style={{
                      width: 8,
                      marginVertical: 2,
                      height: 8,
                      marginVertical: 2,
                      marginRight: 12,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    copyText(bank.type_of_account.bank_account.ifsc, 'IFSC')
                  }>
                  <Image
                    source={Images.copy_icon}
                    style={{
                      width: 8,
                      marginVertical: 2,
                      height: 8,
                      marginVertical: 2,
                      marginRight: 12,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    copyText(
                      bank.type_of_account.bank_account.account_type,
                      'Account Type',
                    )
                  }>
                  <Image
                    source={Images.copy_icon}
                    style={{
                      width: 8,
                      marginVertical: 2,
                      height: 8,
                      marginVertical: 2,
                      marginRight: 12,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{alignSelf: 'center', marginTop: 40}}>
              <BPButton
                label="ADD TRANSFER DETAILS"
                style={{paddingHorizontal: 50}}
                onPress={handleModal}
                disabled={balance.available.balance <= 0}
              />
              <Modal isVisible={showModal} onBackButtonPress={handleModal}>
                <View style={{flex: 1}}>
                  <BPText style={{marginBottom: 5}}>
                    Add transaction details
                  </BPText>
                  <View
                    style={{
                      backgroundColor: Colors.white,
                      marginVertical: 10,
                      marginTop: 5,
                      padding: 16,
                      borderRadius: 14,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        alignSelf: 'stretch',
                        marginBottom: 10,
                      }}>
                      <TouchableOpacity
                        onPress={() => onTPMchange(0)}
                        style={{
                          borderBottomWidth: activeTPM === 0 ? 2 : 0,
                          borderBottomColor: Colors.gray,
                          paddingBottom: 5,
                        }}>
                        <Text style={{opacity: activeTPM === 0 ? 1 : 0.5}}>
                          IMPS
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        disabled
                        onPress={() => onTPMchange(1)}
                        style={{
                          borderBottomWidth: activeTPM === 1 ? 2 : 0,
                          borderBottomColor: Colors.gray,
                          paddingBottom: 5,
                        }}>
                        <Text style={{opacity: activeTPM === 1 ? 1 : 0.5}}>
                          NEFT
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        disabled
                        onPress={() => onTPMchange(2)}
                        style={{
                          borderBottomWidth: activeTPM === 2 ? 2 : 0,
                          borderBottomColor: Colors.gray,
                          paddingBottom: 5,
                        }}>
                        <Text style={{opacity: activeTPM === 2 ? 1 : 0.5}}>
                          RTGS
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        disabled
                        onPress={() => onTPMchange(3)}
                        style={{
                          borderBottomWidth: activeTPM === 3 ? 2 : 0,
                          borderBottomColor: Colors.gray,
                          paddingBottom: 5,
                        }}>
                        <Text style={{opacity: activeTPM === 3 ? 1 : 0.5}}>
                          UPI
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        borderColor: Colors.gray,
                        borderWidth: 1,
                        marginTop: 8,
                        paddingHorizontal: 16,
                      }}>
                      <TextInput
                        underlineColorAndroid="transparent"
                        placeholder="Deposit amount"
                        placeholderTextColor={Colors.gray}
                        value={depositamount}
                        onChangeText={t => setdepositamount(t)}
                        style={{color: Colors.gray}}
                        keyboardType="number-pad"
                      />
                    </View>
                    <View
                      style={{
                        borderColor: Colors.gray,
                        borderWidth: 1,
                        marginTop: 8,
                        paddingHorizontal: 16,
                      }}>
                      <TextInput
                        underlineColorAndroid="transparent"
                        placeholder="IMPS Reference ID"
                        placeholderTextColor={Colors.gray}
                        value={impsid}
                        onChangeText={t => setimpsid(t)}
                        style={{color: Colors.gray}}
                        secureTextEntry
                      />
                    </View>
                    <View
                      style={{
                        borderColor: Colors.gray,
                        borderWidth: 1,
                        marginTop: 8,
                        paddingHorizontal: 16,
                      }}>
                      <TextInput
                        underlineColorAndroid="transparent"
                        placeholder="Confirm IMPS Reference ID"
                        placeholderTextColor={Colors.gray}
                        value={confirm_impsid}
                        onChangeText={t => setconfirm_impsid(t)}
                        style={{color: Colors.gray}}
                      />
                    </View>
                    <View
                      style={{
                        borderColor: Colors.gray,
                        borderWidth: 1,
                        marginTop: 8,
                        paddingHorizontal: 16,
                      }}>
                      <TextInput
                        underlineColorAndroid="transparent"
                        placeholder="Remarks"
                        placeholderTextColor={Colors.gray}
                        value={remarks}
                        onChangeText={t => setremarks(t)}
                        style={{color: Colors.gray}}
                      />
                    </View>

                    <View
                      style={{
                        alignSelf: 'stretch',
                        marginTop: 40,
                        marginBottom: 10,
                      }}>
                      <BPButton
                        onPress={() => onmodasubmit()}
                        label="Submit"
                        style={{paddingHorizontal: 60}}
                        backgroundColor={Colors.darkGray}
                        textColor={Colors.white}
                        style={{borderRadius: 0}}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </>
        );
      // Payment Gatweway
      case 'PaymentGateway':
        return (
          <>
            <View
              style={{
                borderColor: Colors.lightWhite,
                borderRadius: 6,
                borderWidth: 1,
                marginTop: 8,
                paddingHorizontal: 16,
              }}>
              <Input
                placeholder="Enter the amount"
                placeholderTextColor={Colors.lightWhite}
                value={depositamount}
                onChangeText={t => setdepositamount(t)}
                style={{color: Colors.white}}
                keyboardType="number-pad"
              />
            </View>

            <View style={{marginTop: 16}}>
              <View style={{alignSelf: 'center', marginTop: 44}}>
                <BPButton
                  disabled={
                    depositamount?.length == 0 ||
                    !depositamount ||
                    depositamount <= 0
                  }
                  label="Deposit"
                  style={{paddingHorizontal: 60}}
                  onPress={() => onmodasubmit()}
                />
              </View>
            </View>
          </>
        );
      case 'Instant Bank Transfer':
        return (
          <>
            <BPText style={{fontSize: 10, marginTop: 16}}>
              {' '}
              For deposit use the following details only
            </BPText>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignSelf: 'stretch',
                marginVertical: 16,
                backgroundColor: Colors.darkGray3,
                paddingVertical: 10,
              }}>
              <BPText style={{fontSize: 10}}>
                For IMPS, NEFT or RTGS use the bank account.
              </BPText>
              <Icon
                type="FontAwesome"
                name="chevron-down"
                style={{color: Colors.white, fontSize: 11, opacity: 0.6}}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignSelf: 'stretch',
              }}>
              <View>
                <BPText style={{fontSize: 10, color: Colors.lightWhite}}>
                  Name
                </BPText>
                <BPText style={{fontSize: 10, color: Colors.lightWhite}}>
                  Bank Name
                </BPText>
                <BPText style={{fontSize: 10, color: Colors.lightWhite}}>
                  Account Number
                </BPText>
                <BPText style={{fontSize: 10, color: Colors.lightWhite}}>
                  IFSC
                </BPText>
                <BPText style={{fontSize: 10, color: Colors.lightWhite}}>
                  Account Type
                </BPText>
              </View>
              <View>
                <BPText style={{fontSize: 10, color: Colors.lightWhite}}>
                  {bank.account_name}
                </BPText>
                <BPText style={{fontSize: 10, color: Colors.lightWhite}}>
                  {bank.label}
                </BPText>
                <BPText style={{fontSize: 10, color: Colors.lightWhite}}>
                  {bank.type_of_account.bank_account.account_number}
                </BPText>
                <BPText style={{fontSize: 10, color: Colors.lightWhite}}>
                  {bank.type_of_account.bank_account.ifsc}
                </BPText>
                <BPText style={{fontSize: 10, color: Colors.lightWhite}}>
                  {bank.type_of_account.bank_account.account_type}
                </BPText>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => copyText(bank.account_name, 'Name')}>
                  <Image
                    source={Images.copy_icon}
                    style={{
                      width: 8,
                      marginVertical: 2,
                      height: 8,
                      marginVertical: 2,
                      marginRight: 12,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => copyText(bank.label, 'Label')}>
                  <Image
                    source={Images.copy_icon}
                    style={{
                      width: 8,
                      marginVertical: 2,
                      height: 8,
                      marginVertical: 2,
                      marginRight: 12,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    copyText(
                      bank.type_of_account.bank_account.account_number,
                      'Account Number',
                    )
                  }>
                  <Image
                    source={Images.copy_icon}
                    style={{
                      width: 8,
                      marginVertical: 2,
                      height: 8,
                      marginVertical: 2,
                      marginRight: 12,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    copyText(bank.type_of_account.bank_account.ifsc, 'IFSC')
                  }>
                  <Image
                    source={Images.copy_icon}
                    style={{
                      width: 8,
                      marginVertical: 2,
                      height: 8,
                      marginVertical: 2,
                      marginRight: 12,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    copyText(
                      bank.type_of_account.bank_account.account_type,
                      'Account Type',
                    )
                  }>
                  <Image
                    source={Images.copy_icon}
                    style={{
                      width: 8,
                      marginVertical: 2,
                      height: 8,
                      marginVertical: 2,
                      marginRight: 12,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <View>
      {/* <SettingsListItem  
                onPress= {()=> setView(1)}
                noBorder 
                label={"INR (Rupee)"}
                image = {Images.rupee_icon}
                backgroundColor={Colors.darkGray3} 
                rightElement={<ChevronRight />}/> */}

      <View style={{marginHorizontal: 16}}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'stretch',
            justifyContent: 'space-between',
            marginVertical: 27,
          }}>
          <View>
            <BPText style={{fontSize: 10, color: Colors.lightWhite}}>
              Available Balance
            </BPText>
            <BPText style={{fontSize: 12, color: Colors.white}}>
              {balance.available.balance.toFixed(2)} INR
            </BPText>
          </View>
          <View style={{alignItems: 'center'}}>
            <BPText style={{fontSize: 10, color: Colors.lightWhite}}>
              In Order
            </BPText>
            <BPText style={{fontSize: 12, color: Colors.white}}>
              {balance.available.balance.toFixed(2)} INR
            </BPText>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <BPText style={{fontSize: 10, color: Colors.lightWhite}}>
              Total Balance
            </BPText>
            <BPText style={{fontSize: 12, color: Colors.white}}>
              {balance.available.balance.toFixed(2)} INR
            </BPText>
          </View>
        </View>

        <BPText style={{fontFamily: Fonts.FONT_MEDIUM}}>
          INR Deposit Details
        </BPText>

        <View
          style={{
            alignSelf: 'stretch',
            borderWidth: 1,
            borderColor: Colors.lightWhite,
            marginTop: 10,
            borderRadius: 5,
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

        {banks.length > 0 && viewRenderer()}

        <View style={{marginTop: 16, alignSelf: 'center'}}>
          {/* <WalletEndNotes notes={[
                                "Minimum deposit 10 INR.",
                                "Maximum deposit 1 lakh per transaction."
                            ]}/> */}
          {pickerOrderVal == 'TraditionalPayment' && (
            <BPButtonSmall
              label="Please Note"
              image={Images.bell_icon}
              image_size={12}
              noBorder
              labelStyle={{fontSize: 12}}
              onPress={() => setshownote(true)}
            />
          )}

          <Modal
            isVisible={shownote}
            onBackButtonPress={() => setshownote(false)}
            onBackdropPress={() => setshownote(false)}
            style={{
              margin: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{backgroundColor: Colors.white, padding: 20}}>
              <BPText style={{color: Colors.primeBG}}>
                {'\u2022'} All deposits made between 9AM to 10PM will be
                processed within one hour. Deposits made outside the specified
                time will be processed in the next day.
              </BPText>
              <BPText style={{color: Colors.primeBG}}>
                {'\u2022'} While making a bank transfer, ensure that you provide
                the payment reference ID. Deposits without reference ID will not
                be credited to your BitPolo account.
              </BPText>
              <BPText style={{color: Colors.primeBG}}>
                {'\u2022'} You can deposit a maximum of 50 Lakhs per day.
              </BPText>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

let Deposit = () => {
  const [activeView, setView] = useState(1);
  const [activecoin, setactivecoin] = useState('BTC');
  const [address, setaddress] = useState(null);
  const [pickerOrderVal, setPickerOrderVal] = useState({
    label: 'BTC',
    value: 'BTC',
  });
  const [showItems, setshowItems] = useState(false);
  const assetList = useSelector(state => state.walletReducer.assets);
  console.log('assetlist', assetList);

  const callcreateassetaddress = useCallback(
    async coin => {
      try {
        let toPassHeader = {
          Authorization: getAuthToken(),
          info: getInfoAuthToken(),
          device: getDeviceId(),
        };

        let body = {
          data: {
            attributes: {
              asset: assetList.find(item => {
                if (item.asset_code === coin) {
                  return item._id;
                }
              }),
            },
          },
        };
        console.log('body', body);

        let createdaddressres = await createAssetAddress(body, toPassHeader);
        if (createdaddressres.status) {
          console.log('createdaddressres', createdaddressres);
          setaddress(createdaddressres.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [address],
  );

  const changeCoin = coin => {
    let item = assetList.find(i => i.asset_code === coin);
    setactivecoin(item);
    generateAddress(coin);
  };

  const setActiveView = coin => {
    setaddress('');
    if (coin !== 'INR') {
      setView(1);
    } else {
      setView(2);
    }
    setshowItems(false);
    // generateAddress(coin)

    changeCoin(coin);
  };

  useEffect(() => {
    if (assetList.length > 0) {
      let coin = assetList[0];
      setActiveView(coin.asset_code);
      callcreateassetaddress(coin);
    }
    return () => {
      setaddress('');
    };
  }, []);

  const generateAddress = item => {
    //setPickerOrderVal(item)
    callcreateassetaddress(item);
  };

  const tabRenderer = useCallback(
    () =>
      activeView === 1 ? (
        <Tab1
          address={address}
          activecoin={activecoin}
          setView={v => setView(v)}
        />
      ) : (
        <Tab2
          assetList={assetList}
          activecoin={activecoin}
          setView={v => setView(v)}
        />
      ),
    [address, activeView, setactivecoin],
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Root>
        <Container style={{flex: 1, backgroundColor: Colors.primeBG}}>
          {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
          <Toolbar
            enableBackButton
            title={screenNames.DEPOSIT}
            rightElement={rightEl()}
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
                             onPress={()=>{setActiveView(item.asset_code)}}
                             marginRight={3}
                             />
                         }
                     })  
                    }
                        
                    </View> */}

                {activecoin && (
                  <SettingsListItem
                    onPress={() => setshowItems(!showItems)}
                    noBorder
                    label={`${activecoin.asset_code} (${
                      activecoin.asset_name
                    })`}
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
                <View style={{alignSelf: 'stretch', marginTop: 24}}>
                  {activeView === 1 && address ? (
                    tabRenderer()
                  ) : activeView === 2 ? (
                    tabRenderer()
                  ) : (
                    <ActivityIndicator color={Colors.white} size="large" />
                  )}
                </View>
              </View>
            </View>
          </Content>
        </Container>
      </Root>
    </SafeAreaView>
  );
};
Deposit = React.memo(Deposit);
export default Deposit;
