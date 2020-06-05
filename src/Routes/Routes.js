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
import * as screenName from './screenNames'
const Stack = createStackNavigator();

const Routes = ({login}) => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName = {login ? screenName.DASHBOARD : screenName.SIGNIN}
                screenOptions={{
                headerShown: false, 
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS 
            }}>
                <Stack.Screen name= {screenName.SIGNIN} component={Signin} />
                <Stack.Screen name= {screenName.DASHBOARD} children={BottomTabs} />
                <Stack.Screen name= {screenName.SIGNUP} component={Signup} />
                <Stack.Screen name= {screenName.OTP_SCREEN} component={OTPscreen} />
                <Stack.Screen name= {screenName.FORGOT_PASSWORD} component={ForgotPassword} />
                <Stack.Screen name= {screenName.VERIFY_EMAIL} component={VerifyEmail} />
                <Stack.Screen name= {screenName.CHANGE_PASSWORD} component={ChangePassword} />
                <Stack.Screen name= {screenName.GOOGLE_VERIFICATION_CODE} component={GoogleVerificationCode} />
                <Stack.Screen name= {screenName.ABOUT} component={About} />
                <Stack.Screen name= {screenName.SETTINGS} component={Settings} />
                <Stack.Screen name= {screenName.SECURITY} component={Security} />
                <Stack.Screen name= {screenName.BANK_ACCOUNT_DETAILS} component={BankAccountDetails} />
               
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes
