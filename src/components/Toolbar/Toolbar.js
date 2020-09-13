import React from 'react';
import {
  Header,
  Button,
  Title,
  Text,
  Item,
  Left,
  Body,
  Right,
  Icon,
  View,
} from 'native-base';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../theme';
import BPText from '../../common/BPText/BPText';

const Toolbar = ({
  enableBackButton,
  title,
  backgroundColor,
  hasTabs,
  rightElement,
}) => {
  const navigation = useNavigation();

  const leftFlex = () => {
    if (enableBackButton) {
      if (title) {
        return 0.25;
      }
      return 0.2;
    } else {
      return 0.1;
    }
  };

  const bodyFlex = () => {
    if (enableBackButton) {
      if (rightElement) {
        if (title) {
          return 1.1;
        }
        return 0.5;
      } else if (title) {
        return 2;
      }
      return 1;
    } else if (title) {
      if (rightElement) {
        return 1.5;
      }
    }
    return 2;
  };

  const rightFlex = () => {
    if (rightElement) {
      if (title) {
        if (enableBackButton) {
          return 0.8;
        }
        return 1;
      }
      return 0.5;
    } else {
      return 0.2;
    }
  };
  return (
    <View>
      <Header
        style={{
          backgroundColor: backgroundColor || Colors.darkGray2,
          paddingTop: 10,
          paddingBottom: 10,
        }}
        hasTabs={hasTabs}>
        <StatusBar
          translucent
          barStyle={Colors.barStyle}
          backgroundColor={backgroundColor || Colors.darkGray2}
        />
        <Left
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: leftFlex(),
          }}>
          {enableBackButton && (
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-back"
                style={{fontSize: 20, color: Colors.white}}
              />
            </Button>
          )}
        </Left>
        <Body style={{flex: bodyFlex()}}>
          {title && <BPText style={{fontSize: 20}}>{title}</BPText>}
        </Body>
        <Right style={{flex: rightFlex()}}>{rightElement}</Right>
      </Header>
    </View>
  );
};

export default Toolbar;
