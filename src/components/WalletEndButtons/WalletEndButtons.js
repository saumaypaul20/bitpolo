import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Images, Colors} from '../../theme';
import BPButtonSmall from '../../common/BPButtonSmall/BPButtonSmall';
import Modal from 'react-native-modal';
import BPText from '../../common/BPText/BPText';
import {Icon} from 'native-base';
const WalletEndButtons = ({activecoin, type}) => {
  // alert(activecoin.asset_code)
  const [notevisible, setnotevisible] = useState(false);
  const [impvisible, setimpvisible] = useState(false);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <BPButtonSmall
        label="Important"
        image={Images.information_icon}
        image_size={16}
        noBorder
        labelStyle={{fontSize: 12}}
        onPress={() => setimpvisible(true)}
      />
      <BPButtonSmall
        label="Please Note"
        image={Images.bell_icon}
        image_size={12}
        noBorder
        labelStyle={{fontSize: 12}}
        onPress={() => setnotevisible(true)}
      />

      {type === 1 && (
        <>
          <Modal
            isVisible={notevisible}
            onBackButtonPress={() => setnotevisible(false)}
            onBackdropPress={() => setnotevisible(false)}
            style={{
              flex: 1,
              margin: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{backgroundColor: Colors.white, padding: 20}}>
              <TouchableOpacity
                onPress={() => setnotevisible(false)}
                style={{
                  backgroundColor: Colors.white,
                  position: 'absolute',
                  right: -10,
                  top: -10,
                  padding: 5,
                  borderRadius: 50,
                  borderColor: Colors.primeBG,
                  borderWidth: 2,

                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="times"
                  type="FontAwesome5"
                  style={{
                    color: Colors.primeBG,
                    fontSize: 8,
                    paddingHorizontal: 2,
                  }}
                />
              </TouchableOpacity>
              {activecoin.minimum_deposit > 0 && (
                <BPText style={{color: Colors.primeBG}}>
                  {'\u2022'} Minimum deposit {activecoin.minimum_deposit}{' '}
                  {activecoin.asset_code}.
                </BPText>
              )}
              {activecoin.exchange_confirmations && (
                <BPText style={{color: Colors.primeBG}}>
                  {'\u2022'} Once we receive {activecoin.exchange_confirmations}{' '}
                  network confirmations, your coins will be deposited
                  immediately.
                </BPText>
              )}
              <BPText style={{color: Colors.primeBG}}>
                {'\u2022'} You can check the status of your deposit under the
                'Deposit History' page.
              </BPText>
            </View>
          </Modal>

          <Modal
            isVisible={impvisible}
            onBackButtonPress={() => setimpvisible(false)}
            onBackdropPress={() => setimpvisible(false)}
            style={{
              flex: 1,
              margin: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{backgroundColor: Colors.white, padding: 20}}>
              <TouchableOpacity
                onPress={() => setimpvisible(false)}
                style={{
                  backgroundColor: Colors.white,
                  position: 'absolute',
                  right: -10,
                  top: -10,
                  padding: 5,
                  borderRadius: 50,
                  borderColor: Colors.primeBG,
                  borderWidth: 2,

                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="times"
                  type="FontAwesome5"
                  style={{
                    color: Colors.primeBG,
                    fontSize: 8,
                    paddingHorizontal: 2,
                  }}
                />
              </TouchableOpacity>
              <BPText style={{color: Colors.red}}>
                {'\u2022'} This address can accept only {activecoin.asset_code}{' '}
                deposits.
              </BPText>
              <BPText style={{color: Colors.red}}>
                {'\u2022'} If you send any other coin or token to this address,
                your deposits will lost!
              </BPText>
            </View>
          </Modal>
        </>
      )}

      {type === 2 && (
        <>
          <Modal
            isVisible={notevisible}
            onBackButtonPress={() => setnotevisible(false)}
            onBackdropPress={() => setnotevisible(false)}
            style={{
              flex: 1,
              margin: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{backgroundColor: Colors.white, padding: 20}}>
              <TouchableOpacity
                onPress={() => setnotevisible(false)}
                style={{
                  backgroundColor: Colors.white,
                  position: 'absolute',
                  right: -10,
                  top: -10,
                  padding: 5,
                  borderRadius: 50,
                  borderColor: Colors.primeBG,
                  borderWidth: 2,

                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="times"
                  type="FontAwesome5"
                  style={{
                    color: Colors.primeBG,
                    fontSize: 8,
                    paddingHorizontal: 2,
                  }}
                />
              </TouchableOpacity>
              <BPText style={{color: Colors.primeBG}}>
                {'\u2022'} All crypto withdrawals equivalent to 0.1BTC will
                processed automatically.
              </BPText>
              <BPText style={{color: Colors.primeBG}}>
                {'\u2022'} You can check the status of your withdrawal under the
                withdrawal history page.
              </BPText>
            </View>
          </Modal>

          <Modal
            isVisible={impvisible}
            onBackButtonPress={() => setimpvisible(false)}
            onBackdropPress={() => setimpvisible(false)}
            style={{
              flex: 1,
              margin: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{backgroundColor: Colors.white, padding: 20}}>
              <TouchableOpacity
                onPress={() => setimpvisible(false)}
                style={{
                  backgroundColor: Colors.white,
                  position: 'absolute',
                  right: -10,
                  top: -10,
                  padding: 5,
                  borderRadius: 50,
                  borderColor: Colors.primeBG,
                  borderWidth: 2,

                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="times"
                  type="FontAwesome5"
                  style={{
                    color: Colors.primeBG,
                    fontSize: 8,
                    paddingHorizontal: 2,
                  }}
                />
              </TouchableOpacity>
              <BPText style={{color: Colors.red}}>
                Please be advised that we do NOT support withdrawal to ICO, IEO
                or Crowdfund addresses. Coins or tokens you bought by
                withdrawing to such addresses will NOT be credited to your
                BitPolo account.
              </BPText>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

export default WalletEndButtons;
