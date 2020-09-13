import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {Colors} from '../../../theme';
import BPText from '../../../common/BPText/BPText';
import {useSelector, shallowEqual} from 'react-redux';
import {
  emitMarketDealsEvent,
  emitMarketDealsUnsubscribeEvent,
} from '../../../api/config.ws';
import {equalityFnDepths} from '../../../utils/reduxChecker.utils';
import _ from 'lodash';
import {convertTime} from '../../../utils/converters';

const ListItem = ({item, type}) => {
  console.log('liostitem deals', item);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        paddingHorizontal: 32,
        borderBottomColor: Colors.darkGray,
        paddingVertical: 2,
        borderBottomWidth: 1,
      }}>
      <View style={{flex: 1, alignItems: 'flex-start'}}>
        <BPText style={{fontSize: 12}}>{convertTime(item.t)}</BPText>
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <BPText
          style={{
            color: type === 1 ? Colors.lightGreen : Colors.red,
            fontSize: 12,
          }}>
          {item.p}
        </BPText>
      </View>

      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <BPText style={{fontSize: 12}}>{item.a}</BPText>
      </View>
    </View>
  );
};

const renderItem = ({item}) => (
  <ListItem
    item={item.params[1][0]}
    type={item.params[1][0].s === 'buy' ? 2 : 1}
  />
);

const MarketTradesBottom = () => {
  const [nowpair, setnowpair] = useState(null);
  const activeTradePair = useSelector(
    state => state.marketReducer.activeTradePair,
    shallowEqual,
  );
  const deals = useSelector(
    state => state.dealsReducer.deals,
    equalityFnDepths,
  );

  useEffect(() => {
    if (activeTradePair) {
      emitMarketDealsEvent(activeTradePair, nowpair);
      setnowpair(activeTradePair);
    }

    return () => {
      emitMarketDealsUnsubscribeEvent([nowpair]);
      emitMarketDealsUnsubscribeEvent([activeTradePair]);
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          backgroundColor: Colors.darkGray3,
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 5,
            paddingHorizontal: 13,
          }}>
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <BPText style={{fontSize: 12, color: Colors.lightWhite}}>
              Time
            </BPText>
          </View>

          <View style={{flex: 1, alignItems: 'center'}}>
            <BPText style={{fontSize: 12, color: Colors.lightWhite}}>
              Price
            </BPText>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <BPText style={{fontSize: 12, color: Colors.lightWhite}}>
              Amount
            </BPText>
          </View>
        </View>
      </View>

      <View style={{flex: 1}}>
        {deals?.length > 0 && (
          <FlatList
            data={_.orderBy(
              deals,
              function(e) {
                return e.params[1][0].t;
              },
              ['desc'],
            )}
            renderItem={renderItem}
            //Setting the number of column

            keyExtractor={(item, index) => index.toString()}
          />
        )}
        {/* <ListItem type={1}/>
                              <ListItem type={2}/>
                              <ListItem type={2}/>
                              <ListItem type={1}/>
                              <ListItem type={2}/> */}
      </View>
    </View>
  );
};

export default MarketTradesBottom;
