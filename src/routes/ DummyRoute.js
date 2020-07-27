import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Account from '../pages/Tabs/Account/Account';
import Home from '../pages/Tabs/Home/Home';
import Markets from '../pages/Tabs/Markets/Markets';
import Trades from '../pages/Tabs/Trades/Trades';
import WalletTabRoutes from './WalletTabRoutes';

export default function DummyRoute() {
    const [pages, setPages] = useState(0);
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 5 }}>
                {pages === 0 ? <Home /> : null}
                {pages === 1 ? <Markets /> : null}
                {pages === 2 ? <Trades /> : null}
                {pages === 3 ? <WalletTabRoutes /> : null}
                {pages === 4 ? <Account /> : null}
            </View>
            <View style={{ flex: 0.5 }}>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={{ flex: 1, backgroundColor: 'red' }}><TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => setPages(0)}><Text>Home</Text></TouchableOpacity></View>
                    <View style={{ flex: 1 }}><TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => setPages(1)} ><Text>Markets</Text></TouchableOpacity></View>
                    <View style={{ flex: 1, backgroundColor: 'red' }}><TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => setPages(2)}><Text>Trades</Text></TouchableOpacity></View>
                    <View style={{ flex: 1 }}><TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => setPages(3)}><Text>Wallet</Text></TouchableOpacity></View>
                    <View style={{ flex: 1, backgroundColor: 'red' }}><TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => setPages(4)}><Text>Account</Text></TouchableOpacity></View>
                </View>
            </View>
        </View>
    )
}