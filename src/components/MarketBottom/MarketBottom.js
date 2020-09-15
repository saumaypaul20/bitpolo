import React, {useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Colors} from '../../theme';
import {useSelector, shallowEqual} from 'react-redux';
import FlatLists from '../../common/FlatlistComp/FlatList';
import _ from 'lodash';
import {equalityFnDepths} from '../../utils/reduxChecker.utils';

const MarketBottom = () => {
  const [lineNumbers] = useState(10);
  const asksLength = useSelector(
    state => state.depthSubsReducer.asks.slice(0, lineNumbers).length,
    shallowEqual,
  );
  const bidsLength = useSelector(
    state => state.depthSubsReducer.bids.slice(0, lineNumbers).length,
    shallowEqual,
  );

  const [] = useState(null);
  const [] = useState(null);

  return (
    <View style={{flexDirection: 'row', alignSelf: 'stretch', flex: 1}}>
      {/* Red Chart 1 */}
      {
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {asksLength > 0 ? (
            <AsksList lineNumbers={lineNumbers} />
          ) : (
            <View
              style={{
                height: 200,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color={Colors.white} />
            </View>
          )}
        </View>
      }

      {/* Green Chart 1 */}
      {
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {bidsLength > 0 ? (
            <BidsList lineNumbers={lineNumbers} />
          ) : (
            <ActivityIndicator size="large" color={Colors.white} />
          )}
        </View>
      }
    </View>
  );
};

const BidsList = ({lineNumbers}) => {
  const bids = useSelector(
    state => state.depthSubsReducer.bids,
    equalityFnDepths,
  );
  //   console.log(
  //     'BidsList cahnged **********************************************',
  //   );
  return (
    <FlatLists inMarketPage data={bids} lineNumbers={lineNumbers} type={0} />
  );
};

const AsksList = ({lineNumbers}) => {
  const asks = useSelector(
    state => state.depthSubsReducer.asks,
    equalityFnDepths,
  );

  //   console.log(
  //     'AsksList cahnged **********************************************',
  //   );
  return (
    <FlatLists inMarketPage data={asks} lineNumbers={lineNumbers} type={1} />
  );
};

export default MarketBottom;
