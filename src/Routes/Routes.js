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
const Stack = createStackNavigator();

const Routes = ({login}) => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName = {login ? screenNames.DASHBOARD : screenNames.SIGNIN}
                screenOptions={{
                headerShown: false, 
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS 
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
               
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes
