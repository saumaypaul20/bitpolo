import React from 'react'
import { Text , TouchableOpacity, StatusBar} from 'react-native'
import { Container, Content, CardItem, Item, Card , Button, View} from 'native-base'
import LabelInput from '../../common/LabelInput'
import { primaryColors } from '../../utils/colors'
import LogoHeader from '../../common/LogoHeader'
import BPButton from '../../common/BPButton'

const Signin = ({navigation}) => {
    return (
        <Container style={{ flex: 1, backgroundColor: primaryColors.primeBG }}>
            <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
            
            
            <Content contentContainerStyle={{ flexGrow: 1 }}>
           
               <View style={{flex:1, justifyContent:'center'}}>
                <Card transparent style={{ flex:4, justifyContent:'center',}}>
                <LogoHeader />    
                        <View style={{  flexDirection: 'column', backgroundColor: 'transparent', alignItems:'center', marginHorizontal:43}}>
                            <LabelInput keyboardType="email" label="Email" placeholder="Email/Mobile Number" /*iconPath={iconLabel1} */ />
                            <LabelInput label="Password" placeholder="Enter your Password" /*iconPath={iconLabel2} isPassword secureTextEntry *//>
                            
                            <Button transparent style={{ marginVertical: 10, alignSelf:'flex-end' }} >
                                <Text uppercase={false} style={{ padding: 30, fontSize: 13, color: primaryColors.lightWhite, fontFamily: 'Asap-Regular' }}>Forgot Password?</Text>
                            </Button>

                            <BPButton label="Sign in" onPress={()=> navigation.navigate("Dashboard")}/>
                        </View>
                    </Card>
                    
                    <Card transparent  style={{flex:1,justifyContent:'flex-end', alignItems:'center', }}>
                        <View style={{backgroundColor:'transparent', justifyContent:'center', alignItems:'center'}}>
                            <Item style={{  borderColor:'transparent', flexDirection: 'row' }}>
                                <Text style={{ color: primaryColors.lightWhite, fontSize: 13, fontFamily: 'Asap-Regular' }}>
                                    Don't have an account yet?</Text>
                                <Button style={{}} transparent  >
                                    <Text uppercase={false} style={{ fontSize: 13, color: primaryColors.white, fontFamily: 'Asap-Regular' }}> Sign Up</Text>
                                </Button>
                            </Item>
                        </View>
                    </Card>
          
               </View>

            </Content>
        </Container>
    )
}

export default Signin
