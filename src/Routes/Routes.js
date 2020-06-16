import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import BottomTabs from './BottomTabs'
import Signin from '../pages/Signin/Signin';
import Signup from '../pages/Signup/Signup';
import OTPscreen from '../pages/OTPscreen/OTPscreen';
import GoogleVerificationCode from '../pages/GoogleVerificationCode/GoogleVerificationCode';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import VerifyEmail from '../pages/VerifyEmail/VerifyEmail';
import ChangePassword from '../pages/ChangePassword/ChangePassword';
import About from '../pages/Tabs/Account/About/About';
import Security from '../pages/Tabs/Account/Security/Security';
import BankAccountDetails from '../pages/Tabs/Account/BankAccountDetails/BankAccountDetails';
import Settings from '../pages/Tabs/Account/Settings/Settings';
import {screenNames} from './screenNames/screenNames'
import Orders from '../pages/Tabs/Trades/Orders/Orders';
import OrdersHistory from '../pages/Tabs/Trades/OrdersHistory/OrdersHistory';
import UPI from '../pages/Tabs/Account/BankAccountDetails/UPI/UPI';
import NotificationSettings from '../pages/Tabs/Account/Settings/NotificationSettings/NotificationSettings';
import IMPS from '../pages/Tabs/Account/BankAccountDetails/IMPS/IMPS';
import ChangePasswordSettings from '../pages/Tabs/Account/Security/ChangePasswordSettings/ChangePasswordSettings';
import DeviceManagement from '../pages/Tabs/Account/Security/DeviceManagement/DeviceManagement';
import AntiSpoof from '../pages/Tabs/Account/Security/AntiSpoof/AntiSpoof';
import GoogleAuthenticator from '../pages/Tabs/Account/Security/GoogleAuthenticator/GoogleAuthenticator';
import TwoFactorAuthentication from '../pages/Tabs/Account/Security/2FactorAuthentication/2FactorAuthentication';
const Stack = createStackNavigator();

const Routes = ({login}) => {

    const config = {
        animation: 'spring',
        config: {
          stiffness: 1000,
          damping: 100,
          mass: 3,
          overshootClamping: true,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 0.01,
        },
      };

    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName = {login ? screenNames.DASHBOARD : screenNames.SIGNIN}
                screenOptions={{
                headerShown: false, 
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS ,
                
            }}>
                
                <Stack.Screen name= {screenNames.SIGNIN} component={Signin} />
                <Stack.Screen name= {screenNames.DASHBOARD} children={BottomTabs} />
                <Stack.Screen name= {screenNames.SIGNUP} component={Signup} />
                <Stack.Screen name= {screenNames.OTP_SCREEN} component={OTPscreen} />
                <Stack.Screen name= {screenNames.FORGOT_PASSWORD} component={ForgotPassword} />
                <Stack.Screen name= {screenNames.VERIFY_EMAIL} component={VerifyEmail} />
                <Stack.Screen name= {screenNames.CHANGE_PASSWORD} component={ChangePassword} />
                <Stack.Screen name= {screenNames.GOOGLE_VERIFICATION_CODE} component={GoogleVerificationCode} />
                <Stack.Screen name= {screenNames.ABOUT} component={About} />
                <Stack.Screen name= {screenNames.SETTINGS} component={Settings} />
                <Stack.Screen name= {screenNames.SECURITY} component={Security} />
                <Stack.Screen name= {screenNames.BANK_ACCOUNT_DETAILS} component={BankAccountDetails} />
                <Stack.Screen name= {screenNames.ORDERS} component={Orders} />
                <Stack.Screen name= {screenNames.ORDERS_HISTORY} component={OrdersHistory} />
                <Stack.Screen name= {screenNames.UPI} component={UPI} />
                <Stack.Screen name= {screenNames.NOTIFICATIONS} component={NotificationSettings} />
                <Stack.Screen name= {screenNames.IMPS} component={IMPS} />
                <Stack.Screen name= {screenNames.CHANGE_PASSWORD_SETTINGS} component={ChangePasswordSettings} />
                <Stack.Screen name= {screenNames.DEVICE_MANAGEMENT} component={DeviceManagement} />
                <Stack.Screen name= {screenNames.SET_ANTI_SPOOF} component={AntiSpoof} />
                <Stack.Screen name= {screenNames.GOOGLE_AUTHENTICATOR} component={GoogleAuthenticator} />
                <Stack.Screen name= {screenNames.TWO_FACTOR_AUTHENTICATION} component={TwoFactorAuthentication} />
               
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes
