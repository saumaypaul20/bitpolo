import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { primaryColors } from '../../styles/colors';
import { Container, Content } from 'native-base';
import BPButton from '../../common/BPButton/BPButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toolbar from '../../components/Toolbar/Toolbar';
import BPText from '../../common/BPText/BPText';
import { Fonts, Colors } from '../../styles';

const GoogleVerificationCode = (props) => {
    const {navigation} = props
    const [code, setCode] = useState(''); //setting code initial STATE value        

    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}>
            <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
                {/* <StatusBar translucent barStyle="light-content" backgroundColor="transparent" /> */}
                <Toolbar enableBackButton/>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{flex:1, justifyContent:'flex-start', alignItems:'center',  marginHorizontal:48, marginTop:83}}>
                        <BPText style={{fontSize:24, fontFamily: Fonts.FONT_BOLD}}>Enter the Verification code</BPText>
                        <BPText style={{ fontSize:16, textAlign:'center', paddingVertical:20, lineHeight:23}}>{`Get a verification code from the\n`}<BPText style={{fontFamily:Fonts.FONT_BOLD}}>Google Authenticator app</BPText></BPText>
                        
                        <TextInput
                            keyboardType="phone-pad"
                            // autoFocusOnLoad
                            placeholder="Enter 6-digit code"
                            placeholderTextColor={Colors.lightGray}
                            style={styles.inputStyle}
                            value={code}
                            onChangeText={code => setCode(code)}
                            maxLength={6}
                        />


                        <BPButton label="Confirm" onPress={()=> navigation.reset({index:0, routes: [{name:"Dashboard"}]})}/>
                    

                    </View>
                </Content>
            </Container>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    inputStyle:{  width: '100%',  marginTop: 40, marginBottom:68 ,borderRadius:6, borderWidth:1, borderColor:Colors.lightGray , padding: 20, color:'#fff'},
   
});


export default GoogleVerificationCode
