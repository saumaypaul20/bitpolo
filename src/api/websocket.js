import store from '../redux/store'
import io from 'socket.io-client';
import * as  ENDPOINT from '../api/constants'
import { modifyMarketPairData, addMarketData } from '../redux/actions/markets.action';
var pako = require('pako');
var socket = io(ENDPOINT.WEBSOCKET, {transports: ['websocket']})


export const startSocket = () => {
    socket.on("connect", function() {
        console.log("connected")
    })
    
    socket.on("disconnect", function(){
        console.log("socket disconnected");
    });

    socket.on("message", function(data) {
        console.log("message from paoirs")
        const result = JSON.parse(pako.inflate(data, { to: "string" }));
        result.id = Math.random().toString()
        // setData([result])
        if(marketdata?.length>0 && marketdata.find(i=> i.pair === item)){
            store.dispatch(modifyMarketPairData(item,result))
        }else{
            store.dispatch(addMarketData(item,result))
        }
    });
}