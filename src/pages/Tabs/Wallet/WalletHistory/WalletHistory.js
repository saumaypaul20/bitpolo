import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Container, Content, Switch, Button} from 'native-base';
import Toolbar from '../../../../components/Toolbar/Toolbar';
import {Colors} from '../../../../theme';
import BPText from '../../../../common/BPText/BPText';
import {screenNames} from '../../../../routes/screenNames/screenNames';
import BPSwitch from '../../../../common/BPSwitch/BPSwitch';
import {useNavigation} from '@react-navigation/native';
import {
  getDepositTransactions,
  getWithdrawTransactions,
} from '../../../../api/wallet.api';
import {convertDate, convertTime} from '../../../../utils/converters';
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
            <BPText>INR</BPText>
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
            {item.type_of_payment_process}
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
            {item.tx_hash}
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
  const {defaultview} = props.route.params;

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
          {/* 
                     <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>

                        <View style={{ flex:1, flexDirection:'row',justifyContent:'flex-start', alignItems:'flex-start', alignSelf:'stretch', paddingVertical:20}}>
                            <BPText style={{fontSize:15}}>Hide Other Pairs </BPText>

                            <BPSwitch isEnabled={isEnabled} onToggleSwitch={toggleSwitch}/>
                        </View>

                        <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                            <Button style={{backgroundColor: Colors.white, width: 60, height:19, justifyContent:'center', opacity:0.8}}>
                                <BPText style={{color: Colors.darkGray3, fontSize: 12}}>Clear All</BPText>
                            </Button>
                        </View>

                     </View> 

                     <ListItem item/>

                     
                    */}

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
              data={deposits}
              renderItem={({item, index}) => (
                <ListItem item={item} index={index} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
          {view === 2 && (
            <FlatList
              data={withdraws}
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
