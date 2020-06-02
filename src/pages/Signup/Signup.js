import React from 'react'
import { Text , TouchableOpacity, StatusBar} from 'react-native'
import { Container, Content, CardItem, Item, Card , Button, View} from 'native-base'
import LabelInput from '../../common/LabelInput'
import { primaryColors } from '../../utils/colors'
import LogoHeader from '../../common/LogoHeader'
import BPButton from '../../common/BPButton'
import QueryActions from '../../common/QueryActions'

const Signup = ({navigation}) => {
    const goToScreen = () =>{
        navigation.reset({
            index: 0,
            routes: [{ name: 'Signin' }],
        })
    }
    return (
        <Container style={{ flex: 1, backgroundColor: primaryColors.primeBG }}>
            <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
            
            
            <Content contentContainerStyle={{ flexGrow: 1 }}>
           
               <View style={{flex:1, justifyContent:'center'}}>
                <Card transparent style={{ flex:12, justifyContent:'center', alignItems:'stretch', alignSelf:'stretch'}}>
                    <LogoHeader />    
                    
                </Card>
                
                <Card transparent  style={{flex:0.5,justifyContent:'flex-start', alignItems:'center', paddingBottom: 55, paddingTop:0, marginTop:0 }}>

                    <View style={{  flexDirection: 'column', backgroundColor: 'transparent', alignItems:'center', marginHorizontal:43,}}>
                        <LabelInput keyboardType="email" label="Email" placeholder="Email/Mobile Number" /*iconPath={iconLabel1} */ />
                        <LabelInput label="Phone No" placeholder="Enter your Password" keyboardType="phone-pad" /*iconPath={iconLabel2} isPassword secureTextEntry *//>
                        <LabelInput secureTextEntry label="Password" placeholder="Enter your Password" /*iconPath={iconLabel2} isPassword secureTextEntry *//>
                        <LabelInput secureTextEntry label="Re-Enter Password" placeholder="Enter your Password" /*iconPath={iconLabel2} isPassword secureTextEntry *//>
                        
                        
                        <View style={{marginTop:48, marginBottom:53}}>
                            <BPButton label="Sign Up" onPress={()=> goToScreen()}/>
                        </View>
                    </View>
                    
                    <QueryActions query={"Already have an account yet?"} actionName="Sign In" 
                        action={()=>goToScreen()}/>

                </Card>
          
               </View>

            </Content>
        </Container>
    )
}

export default Signup
