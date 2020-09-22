import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Container} from 'native-base';
import Toolbar from '../../../../components/Toolbar/Toolbar';
import {Colors} from '../../../../theme';
import BPText from '../../../../common/BPText/BPText';
import {
  getDepositTransactions,
  getWithdrawTransactions,
} from '../../../../api/wallet.api';
import {convertDate, convertTime} from '../../../../utils/converters';
import {useSelector, shallowEqual} from 'react-redux';
import {imageRenderer} from '../../../../utils/component.utils';
import SettingsListItem from '../../../../common/SettingsListItem/SettingsListItem';
import ChevronRight from '../../../../common/ChevronRight/ChevronRight';

const ListItem = ({item, index}) => {
  const getStatus = () => {
    switch (item.status) {
      case '1':
        return (
          <Text
            style={{
              backgroundColor: Colors.white,
              color: Colors.lightGreen,
              paddingHorizontal: 5,
              fontSize: 10,
              paddingVertical: 2,
            }}>
            Pending
          </Text>
        );
      case '3':
        return (
          <Text
            style={{
              backgroundColor: Colors.white,
              color: Colors.red,
              paddingHorizontal: 5,
              fontSize: 10,
              paddingVertical: 2,
            }}>
            Failed
          </Text>
        );
      case '2':
        return (
          <Text
            style={{
              backgroundColor: Colors.white,
              color: Colors.lightGreen,
              paddingHorizontal: 5,
              fontSize: 10,
              paddingVertical: 2,
            }}>
            Processed
          </Text>
        );
      default:
        return null;
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        marginVertical: 10,
        borderTopColor: Colors.lightWhite,
        borderTopWidth: index == 0 ? 0 : 0.5,
        paddingTop: index == 0 ? 0 : 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'stretch',
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 3,
              alignItems: 'center',
            }}>
            <BPText>{item.asset.asset_code}</BPText>
            <Text
              style={{
                backgroundColor:
                  item.transaction_type == 'Deposit'
                    ? Colors.lightGreen
                    : Colors.red,
                color: Colors.white,
                marginHorizontal: 5,
                paddingHorizontal: 5,
                fontSize: 10,
              }}>
              {item.transaction_type}
            </Text>
            {/* <Text style={{backgroundColor: Colors.lightGreen, color: Colors.white, marginHorizontal:5, paddingHorizontal:10}}>BUY</Text> */}
          </View>

          <BPText style={{fontSize: 10, color: Colors.lightWhite}}>
            {convertTime(item.date)} {convertDate(item.date, '-')}
          </BPText>
        </View>
        <View>{getStatus()}</View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'stretch',
          marginTop: 10,
        }}>
        <View style={{alignItems: 'flex-start', flex: 1}}>
          <BPText numberOfLines={1} style={{fontSize: 10}}>
            {item.type_of_payment_process ? item.type_of_payment_process : '--'}
          </BPText>
          <BPText style={{fontSize: 8, color: Colors.lightWhite}}>
            Payment Type
          </BPText>
        </View>
        <View style={{alignItems: 'center', flex: 1}}>
          <BPText numberOfLines={1} style={{fontSize: 10}}>
            {item.final_amount}
          </BPText>
          <BPText style={{fontSize: 8, color: Colors.lightWhite}}>
            Amount
          </BPText>
        </View>
        <View style={{alignItems: 'flex-end', flex: 1}}>
          <BPText selectable numberOfLines={1} style={{fontSize: 10}}>
            {item.tx_hash ? item.tx_hash : '--'}
          </BPText>
          <BPText style={{fontSize: 8, color: Colors.lightWhite}}>
            Transaction ID
          </BPText>
        </View>
      </View>
    </View>
  );
};
const WalletHistory = props => {
  const {defaultview, coin} = props.route.params;
  const assetList = useSelector(
    state => state.walletReducer.assets,
    shallowEqual,
  );
  const [filters, setfilters] = useState([{asset_code: 'ALL'}]);

  const [showItems, setshowItems] = useState(false);
  // const [activecoin, setactivecoin] = useState();
  const [filteritem, setfilteritem] = useState('ALL');
  const [view, setview] = useState(defaultview);
  const [deposits, setdeposits] = useState([]);
  const [withdraws, setwithdraws] = useState([]);
  const getDeposits = async () => {
    let res = await getDepositTransactions();

    if (res.status) {
      let arr = res.data.data.attributes.data;
      arr.reverse();
      let fin = arr.map(i => {
        i.transaction_type = 'Deposit';
        return i;
      });
      setdeposits(fin);
    }
  };
  const getWithdraws = async () => {
    let res = await getWithdrawTransactions();

    if (res.status) {
      let arr = res.data.data.attributes.data;
      arr.reverse();
      let fin = arr.map(i => {
        i.transaction_type = 'Withdraw';
        return i;
      });
      setwithdraws(fin);
    }
  };

  useEffect(() => {
    setdeposits([]);
    setwithdraws([]);
    if (view === 1) {
      getDeposits();
    } else {
      getWithdraws();
    }
  }, [view]);

  useEffect(() => {
    if (filters.length === 1) {
      let nwfilters = filters.concat(assetList);

      setfilters(nwfilters);
    }
  }, [assetList]);

  useEffect(() => {
    if (coin) {
      setfilteritem(coin);
    }
  }, []);
  const renderLabel = useCallback(() => {
    let isfilter = filters.find(i => i.asset_code === filteritem);
    if (isfilter) {
      if (isfilter.asset_name) {
        return `${isfilter.asset_code} - ${isfilter.asset_name}`;
      } else {
        return `${isfilter.asset_code}`;
      }
    } else {
      return 'ALL';
    }
  }, [filteritem]);

  const renderArr = arr => {
    let arrtodisplay = arr;
    if (filteritem !== 'ALL') {
      arrtodisplay = arrtodisplay.filter(i => i.asset.asset_code == filteritem);
    }
    return arrtodisplay;
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primeBG}}>
      <Container style={{flex: 1, backgroundColor: Colors.primeBG}}>
        {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
        <Toolbar enableBackButton title="History" />
        {/* <Content contentContainerStyle={{ flexGrow: 1 }}> */}
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignSelf: 'stretch',
            marginHorizontal: 16,
          }}>
          <SettingsListItem
            onPress={() => setshowItems(!showItems)}
            noBorder
            label={renderLabel()}
            // image={imageRenderer(activecoin.asset_code)}
            backgroundColor={Colors.darkGray}
            rightElement={
              !showItems ? (
                <ChevronRight arrow="down" />
              ) : (
                <ChevronRight arrow="up" />
              )
            }
          />

          {showItems && filters.length > 0 && (
            <View style={{marginTop: 5}}>
              {filters.map(i => {
                let p = {label: i.asset_code, value: i.asset_code};
                // return <TouchableOpacity style={{marginHorizontal:16, paddingVertical:10, marginHorizontal:32}} onPress={()=> setActiveView(i.asset_code)}><BPText>{i.asset_code}</BPText></TouchableOpacity>
                return (
                  <SettingsListItem
                    key={i.asset_code}
                    onPress={() => {
                      setfilteritem(i.asset_code);
                      setshowItems(!showItems);
                    }}
                    backgroundColor={Colors.darkGray}
                    label={`${i.asset_code}${i.asset_name ? '- ' : ''}${
                      i.asset_name ? i.asset_name : ''
                    }`}
                    // image={imageRenderer(i.asset_code)}
                    noBorder
                  />
                );
              })}
            </View>
          )}

          <View style={{flexDirection: 'row', alignSelf: 'stretch'}}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setview(1)}
              style={{
                borderBottomColor: Colors.white,
                borderBottomWidth: view === 1 ? 1 : 0,
                flex: 1,
                alignItems: 'center',
                paddingVertical: 12,
                backgroundColor: view == 1 ? Colors.darkGray3 : 'transparent',
              }}>
              <BPText>Deposits</BPText>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setview(2)}
              style={{
                borderBottomColor: Colors.white,
                borderBottomWidth: view === 2 ? 1 : 0,
                flex: 1,
                alignItems: 'center',
                paddingVertical: 12,
                backgroundColor: view == 2 ? Colors.darkGray3 : 'transparent',
              }}>
              <BPText>Withdraw</BPText>
            </TouchableOpacity>
          </View>

          {/* <SettingsListItem label={view === 1? 'Deposit': 'Withdraw'}
                            onPress={()=> {
                            view === 1? setview(2) : setview(1)
                            }}
                            backgroundColor={Colors.darkGray3}
                            rightElement={<ChevronRight/>}
                            paddingHorizontal={0}
                            noBorder
                    /> */}

          {deposits.length + withdraws.length === 0 && (
            <ActivityIndicator
              color={Colors.white}
              size="large"
              style={{marginTop: 20}}
            />
          )}

          {view === 1 && (
            <FlatList
              data={renderArr(deposits)}
              renderItem={({item, index}) => (
                <ListItem item={item} index={index} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
          {view === 2 && (
            <FlatList
              data={renderArr(withdraws)}
              renderItem={({item, index}) => (
                <ListItem item={item} index={index} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
        {/* </Content> */}
      </Container>
    </SafeAreaView>
  );
};

export default WalletHistory;
