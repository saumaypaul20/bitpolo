import React from 'react'
import { View, Image } from 'react-native'
import { Card, CardItem } from 'native-base'

const LogoHeader = () => {
    return (
        <Card transparent  >

            <CardItem style={{backgroundColor: 'transparent', justifyContent:'center',alignItems:'center',}}>
                <Image source={require('../../assets/images/logo/logo.png')} style={{ height: 69, width: 236 }} resizeMode="contain" />
            </CardItem>
        </Card>    
    )
}

export default LogoHeader
