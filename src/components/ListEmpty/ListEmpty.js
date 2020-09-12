import React from 'react';
import {View, Image} from 'react-native';
import {Images, Fonts} from '../../theme';
import BPText from '../../common/BPText/BPText';

const ListEmpty = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={Images.nothing_is_here}
        style={{width: 167, height: 130, margin: 25}}
        resizeMode="center"
      />
      <BPText
        style={{fontSize: 18, fontFamily: Fonts.FONT_MEDIUM, opacity: 0.8}}>
        Nothing is here
      </BPText>
      <BPText
        style={{
          fontSize: 14,
          opacity: 0.5,
          lineHeight: 23,
          paddingHorizontal: 56,
          textAlign: 'center',
          paddingTop: 12,
        }}>{`Go to any crypto and then Swipe left to\nadd it in favourites`}</BPText>
    </View>
  );
};

export default ListEmpty;
