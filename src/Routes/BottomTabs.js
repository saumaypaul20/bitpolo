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

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
       
            <Tab.Navigator 
            
              tabBarOptions={{
                activeTintColor: '#fff',
                style:{
                    backgroundColor:'#1C1C1E',
                    borderTopWidth: 0,
                    
                }
                }}
              screenOptions={({ route }) => ({
                tabBarIcon: ({ size, focused }) => {
                  let iconName, active, inactive;
                  if (route.name == "Home") {
                    active = require(`../assets/images/items/home_icon.png`)
                    inactive = require(`../assets/images/items/home_gray_icon.png`)
                    iconName= focused ? active : inactive
                  } else if (route.name == "Markets") {
                    active = require(`../assets/images/items/market_chart_icon.png`)
                    inactive = require(`../assets/images/items/markets_gray_icon.png`)
                    iconName= focused ? active : inactive

                  } else if (route.name == "Trades") {
                    active = require(`../assets/images/items/trade_icon.png`)
                    inactive = require(`../assets/images/items/trade_gray_icon.png`)
                    iconName= focused ? active : inactive

                  }else if (route.name == "Wallet") {
                    active = require(`../assets/images/items/wallet_icon.png`)
                    inactive = require(`../assets/images/items/wallet_gray_icon.png`)
                    iconName= focused ? active : inactive

                  }else if (route.name == "Account") {
                    active = require(`../assets/images/items/account_icon.png`)
                    inactive = require(`../assets/images/items/account_gray_icon.png`)
                    iconName= focused ? active : inactive

                  }
                  return <Image source={iconName} style={{width:size-2, height:size-2, marginTop: 15}} resizeMode="contain" />;
                }
                })}
                >
                {/* <Tab.Screen name="Signinn" component={Signin} /> */}
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Markets" component={Markets} />
                <Tab.Screen name="Trades" component={Trades} />
                <Tab.Screen name="Wallet" component={Wallet} />
                <Tab.Screen name="Account" component={Account} options={{tabBarVisible:false}} />
            </Tab.Navigator>
        
    )
}
 

function MyTabBar({ state, descriptors, navigation }) {
    return (
      <View style={{ flexDirection: 'row' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
            >
              <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }


export default BottomTabs
