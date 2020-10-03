import React from 'react';
import {View, Text, Linking} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors, Images} from '../../../../theme';
import {Container, Content} from 'native-base';
import Toolbar from '../../../../components/Toolbar/Toolbar';
import SettingsListItem from '../../../../common/SettingsListItem/SettingsListItem';
import ChevronRight from '../../../../common/ChevronRight/ChevronRight';
import LogoHeader from '../../../../common/LogoHeader/LogoHeader';
import {screenNames} from '../../../../routes/screenNames/screenNames';

const About = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primeBG}}>
      <Container style={{flex: 1, backgroundColor: Colors.primeBG}}>
        <Toolbar enableBackButton title={screenNames.ABOUT} />
        <Content contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1, alignSelf: 'stretch'}}>
            <View style={{paddingVertical: 50}}>
              <LogoHeader />
            </View>

            <SettingsListItem
              label="Like us on Facebook"
              image={Images.facebook_icon}
              paddingHorizontal={16}
              borderBottom
              onPress={() =>
                Linking.openURL('https://www.facebook.com/bitpolo/')
              }
              rightElement={<ChevronRight />}
            />

            <SettingsListItem
              label="Follow us on Twitter"
              image={Images.twitter_icon}
              paddingHorizontal={16}
              borderBottom
              onPress={() => Linking.openURL('https://twitter.com/bit_polo')}
              rightElement={<ChevronRight />}
            />

            <SettingsListItem
              label="Join us on Telegram"
              image={Images.telegram}
              paddingHorizontal={16}
              borderBottom
              onPress={() => Linking.openURL('https://t.me/bit_polo')}
              rightElement={<ChevronRight />}
            />

            <SettingsListItem
              label="Join us on LinkedIn"
              image={Images.linkedin_icon}
              paddingHorizontal={16}
              borderBottom
              onPress={() =>
                Linking.openURL('https://www.linkedin.com/company/bitpolo/')
              }
              rightElement={<ChevronRight />}
            />

            {/* <SettingsListItem
              label="Join us on Intsagram"
              image={Images.instagram_icon}
              paddingHorizontal={16}
              borderBottom
              onPress={() => Linking.openURL('https://t.me/bit_polo')}
              rightElement={<ChevronRight />}
            /> */}

            <SettingsListItem
              label="Join us on Medium"
              image={Images.medium_icon}
              paddingHorizontal={16}
              borderBottom
              onPress={() => Linking.openURL('https://medium.com/@bitpolo')}
              rightElement={<ChevronRight />}
            />
          </View>
        </Content>
      </Container>
    </SafeAreaView>
  );
};

export default About;
