import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content } from 'native-base'
import Toolbar from '../../../../../components/Toolbar/Toolbar'
import { Colors } from '../../../../../theme'
import { screenNames } from '../../../../../routes/screenNames/screenNames'
import BPText from '../../../../../common/BPText/BPText'
import { getDeviceHistory } from '../../../../../api/security.api'
import { getAuthToken, getInfoAuthToken, getDeviceId } from '../../../../../utils/apiHeaders.utils'
import { convertDate } from '../../../../../utils/converters'
 
const DeviceManagement = () => {

    const [logs, setlogs] = useState([])
    
    const dummy = [
        {
            device: 'Firefox 75 (Mac OS)',
            location: 'Salem, India',
            ip: '157.50.205.53',
            recent: '2020-05-01 09:46:36'
        },
        {
            device: 'Firefox 75 (Mac OS)',
            location: 'Salem, India',
            ip: '157.50.205.53',
            recent: '2020-05-01 09:46:36'
        }]

        const getData = async()=>{
            try {
                let toPassHeader={
                    Authorization: getAuthToken(),
                    info: getInfoAuthToken(),
                    device: getDeviceId()
                }

                let history = await getDeviceHistory(toPassHeader);
                if(history.status){
                    console.log("hostru",history)
                    setlogs(history.data.data.attributes.data.filter(item=> !item.is_deleted))
                }
            } catch (error) {
                console.log(error)
            }
        }

        useEffect(() => {
            getData()
            
        }, [])

    const DetailItem = (label, item) =>{
        return (
            <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'stretch', paddingVertical:12}}>
                <BPText style={{opacity: 0.6}}>{label}</BPText>
                <BPText>{item}</BPText>
            </View>
        )
    }
    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}> 
         <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
            <Toolbar enableBackButton title={screenNames.DEVICE_MANAGEMENT}/>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{flex:1, alignSelf:'stretch'}}>
                        <View style={{paddingHorizontal:20, borderBottomWidth:1, borderBottomColor: Colors.lightWhite, paddingVertical:12}}>
                            <BPText style={{fontSize:12}}>These are the list of devices which are currently having access to your accounts</BPText>
                        </View>

                        <View style={{marginHorizontal:20}}>
                            {logs.length === 0 && <ActivityIndicator size="large" color={Colors.white} style={{marginTop:50}} />}
                            {logs.length>0 && logs.map((i, index)=> <View key={index.toString()} style={{marginTop:23, borderBottomWidth:1, borderColor: Colors.lightWhite, paddingBottom:23}}>
                                {DetailItem("Device",`${i.browser} ${i.browser_version||''} (${i.os} ${i.os_byte})`)}
                                {DetailItem("Location", i.country)}
                                {DetailItem("Ip Address", i.ip)}
                                {DetailItem("Recent Activity", convertDate(i.modified_date, '-', true))}
                            </View>)}

                        </View>

                    </View>
                </Content>
            </Container>
        </SafeAreaView>
    )
}

export default DeviceManagement
