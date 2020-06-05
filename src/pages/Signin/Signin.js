import React, { useState } from 'react'
import { Text , TouchableOpacity, StatusBar} from 'react-native'
import { Container, Content, CardItem, Item, Card , Button, View} from 'native-base'
import LabelInput from '../../components/LabelInput/LabelInput'
import { primaryColors } from '../../styles/colors'
import BPButton from '../../common/BPButton/BPButton'
import { useSelector, useDispatch } from 'react-redux'
import { inputAction } from '../../redux/actions/input.actions'
import LogoHeader from '../../common/LogoHeader/LogoHeader'
import QueryActions from '../../components/QueryActions/QueryActions'
import { Colors } from '../../styles'
import BPText from '../../common/BPText/BPText'
import Storage from '../../utils/storage.utils'

const Signin = ({navigation}) => {
    const dispatch = useDispatch()
    let email = useSelector(state => state.inputReducer.email);
    let password = useSelector(state => state.inputReducer.password);

    const onSingInPress =() => {
        Storage.set("login", true)
        navigation.navigate("OTPscreen")
    }
    
    return (
        <Container style={{ flex: 1, backgroundColor: Colors.primeBG }}>
            <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
            
            
            <Content contentContainerStyle={{ flexGrow: 1 }}>
           
               <View style={{flex:1, justifyContent:'center'}}>
                <Card transparent style={{ flex:4, justifyContent:'center',}}>
                <LogoHeader />    
                        <View style={{  flexDirection: 'column', backgroundColor: 'transparent', alignItems:'center', marginHorizontal:43}}>
                            <LabelInput keyboardType="email-address" label="Email" placeholder="Email/Mobile Number"  onChange={(text)=> dispatch(inputAction("EMAIL", text))} value={email}/*iconPath={iconLabel1} */ />
                            <LabelInput label="Password" placeholder="Enter your Password" onChange={(text)=> dispatch(inputAction("PASSWORD", text))} value={password}/*iconPath={iconLabel2} isPassword secureTextEntry *//>
                            
                            <Button transparent style={{ marginVertical: 10, alignSelf:'flex-end' }} >
                                <BPText uppercase={false} style={{ padding: 20, fontSize: 13, color: Colors.lightWhite, fontFamily: 'Asap-Regular' }}>Forgot Password?</BPText>
                            </Button>

                            <BPButton label="Sign in" onPress={()=> onSingInPress()}/>
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
