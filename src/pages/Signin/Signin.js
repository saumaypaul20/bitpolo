import React, { useState } from 'react'
import { Text , TouchableOpacity, StatusBar} from 'react-native'
import { Container, Content, CardItem, Item, Card , Button, View} from 'native-base'
import LabelInput from '../../common/LabelInput/LabelInput'
import { primaryColors } from '../../utils/colors'
import LogoHeader from '../../common/LogoHeader/LogoHeader'
import BPButton from '../../common/BPButton/BPButton'
import QueryActions from '../../common/QueryActions/QueryActions'

const Signin = ({navigation}) => {
    const dispatch = useDispatch()
    let email = useSelector(state => state.inputReducer.email);
    let password = useSelector(state => state.inputReducer.password);

    const onSingInPress =() => {
        navigation.navigate("Dashboard")
    }
    
    return (
        <Container style={{ flex: 1, backgroundColor: primaryColors.primeBG }}>
            <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
            
            
            <Content contentContainerStyle={{ flexGrow: 1 }}>
           
               <View style={{flex:1, justifyContent:'center'}}>
                <Card transparent style={{ flex:4, justifyContent:'center',}}>
                <LogoHeader />    
                        <View style={{  flexDirection: 'column', backgroundColor: 'transparent', alignItems:'center', marginHorizontal:43}}>
                            <LabelInput keyboardType="email-address" label="Email" placeholder="Email/Mobile Number" /*iconPath={iconLabel1} */ />
                            <LabelInput label="Password" placeholder="Enter your Password" secureTextEntry/*iconPath={iconLabel2} isPassword secureTextEntry *//>
                            
                            <Button transparent style={{ marginVertical: 10, alignSelf:'flex-end' }} onPress={()=> navigation.navigate("ForgotPassword")} >
                                <Text uppercase={false} style={{ padding: 30, fontSize: 13, color: primaryColors.lightWhite, fontFamily: 'Asap-Regular' }}>Forgot Password?</Text>
                            </Button>

                            <BPButton label="Sign in" onPress={()=> navigation.navigate("OTPscreen")}/>
                        </View>
                    </Card>
                    
                    <Card transparent  style={{flex:1,justifyContent:'flex-end', alignItems:'center', paddingBottom: 55 }}>
                        

                    <QueryActions 
                        query={"Don't have an account yet?"} 
                        actionName="Sign Up" 
                        action={()=> navigation.navigate("Signup")}/>

                    </Card>
          
               </View>

            </Content>
        </Container>
    )
}

export default Signin
