import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Signin from '../pages/Signin/Signin';
import Signup from '../pages/Signup/Signup';
import Home from '../pages/Tabs/Home/Home';
import Markets from '../pages/Tabs/Markets/Markets';
import Trades from '../pages/Tabs/Trades/Trades';
import Wallet from '../pages/Tabs/Wallet/Wallet';
import Account from '../pages/Tabs/Account/Account';
import { Icon } from 'native-base';
import { Colors, Images } from '../theme';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
       
            <Tab.Navigator 
              initialRouteName="Home"

              tabBarOptions={{
                activeTintColor: Colors.tabActiveTintColor,
                style:{
                    backgroundColor:Colors.tabBackgroundColor,
                    borderTopWidth: 0,
                    
                }
                }}

              screenOptions={({ route }) => ({
                tabBarIcon: ({ size, focused }) => {
                  let iconName, active, inactive;
                  if (route.name == "Home") {
                    active = Images.home_icon
                    inactive = Images.home_gray_icon
                  } else if (route.name == "Markets") {
                    active = Images.markets_icon
                    inactive = Images.markets_gray_icon

                  } else if (route.name == "Trades") {
                    active = Images.trade_icon
                    inactive = Images.trade_gray_icon

                  }else if (route.name == "Wallet") {
                    active = Images.wallet_icon
                    inactive = Images.wallet_gray_icon

                  }else if (route.name == "Account") {
                    active = Images.account_icon
                    inactive = Images.account_gray_icon

                  }
                  iconName= focused ? active : inactive
                  return <Image source={iconName} style={{width:size-2, height:size-2, marginTop: 15, marginBottom:10}} resizeMode="contain" />;
                }
                })}
                >
              
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Markets" component={Markets} />
                <Tab.Screen name="Trades" component={Trades} />
                <Tab.Screen name="Wallet" component={Wallet} />
                <Tab.Screen name="Account" component={Account} options={{tabBarVisible:false}} />
                
            </Tab.Navigator>
        
    )
}


export default BottomTabs
