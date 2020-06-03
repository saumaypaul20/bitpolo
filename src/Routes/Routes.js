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

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{
                headerShown: false, 
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS 
            }}>
                <Stack.Screen name="Signin" component={Signin} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="OTPscreen" component={OTPscreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} />
                <Stack.Screen name="GoogleVerificationCode" component={GoogleVerificationCode} />
                <Stack.Screen name="Dashboard" children={BottomTabs} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes
