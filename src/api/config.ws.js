import store from '../redux/store'
import io from 'socket.io-client';
import * as  ENDPOINT from '../api/constants'
import { addMarketData, triggerMarketSocket } from '../redux/actions/markets.action';
import { splitIt } from '../utils/converters';
import { addDepthSubs } from '../redux/actions/depthSubs.action';
import _ from 'lodash'
// import { emitPingEvent } from './events.ws';
// var io = require("socket.io-client/dist/socket.io");
const pako = require('pako');
const socket = io(ENDPOINT.WEBSOCKET, {
    transports: ['websocket'],
  })

export const startSocket=() => {
   
    // ON CONNECT
    

    socket.on("connect", function() {
     
        console.log("connected scoket---------------")
        emitPingEvent()
        // setInterval(() => {
        //     console.log("emiting ping")
        //     socket.emit("ping");
        // }, 3000);

        socket.on("message", function(data) {
            console.log("pako data", data)
            let result 
           if(data != 'pong'){
             result = JSON.parse(pako.inflate(data, { to: "string" }));
             result.id = Math.random().toString()
           }else{
               result = data
           }
            console.log("socket",result);
           
            
        // Event handlers
            switch(result.method){
              
                case "state.update":
                    if(result.params){
                        let pair = result.params[0]
                        if(pair.match("INR")){
                            result.divider= splitIt(result.params[0], "INR")
                        }else if(pair.match("USDT")){
                            result.divider= splitIt(result.params[0], "USDT")
                        }
                        store.dispatch(addMarketData(result))
                    }
                    break

                case "depth.update":
                    console.log(result)
                    let res = result;
                    let askLen = res.params[1].asks.length
                    res.params[1].asks = _.sortBy(res.params[1].asks, "p").reverse().slice( askLen - 9)
                    console.log("-----TEH RES ---- depth",res)
                    res.params[1].bids = _.sortBy(res.params[1].bids, "p").reverse().slice( 0,  9)
                    store.dispatch(addDepthSubs(res))
                    // addDepthSubs
                    break

                default:
                    console.log(result)
            }
        });
    })

    // ON DISCONNECT
    socket.on("disconnect", function(){
        console.log("socket disconnected");
    });
}



//Ping-Pong
export const emitPingEvent = () =>{
    console.log("ping event emit");
    setInterval(() => {
        socket.emit("message", "ping");
    }, 3000);
}


//State Subscription
export const emitMarketListEvent = (marketPairs) =>{
    store.dispatch(triggerMarketSocket())
    console.log("dsipacthed trigger", store.getState())

    console.log("soceklt mareket_paors",marketPairs)
    socket.emit("message", {"id": 1, "method" : "state.subscribe", "params" : marketPairs });
}

//Depth Subscription
export const emitDepthSubscribeEvent = (lastpair, newpair) =>{
    if(lastpair){
        socket.emit("message", {"id": Math.floor(Math.random() * 9000000), "method" : "depth.unsubscribe", "params" : [lastpair, 9,"9"] });
        // socket.emit("message", {"id": Math.floor(Math.random() * 90000000), "method" : "state.unsubscribe", "params" : [newpair] });
    }
    socket.emit("message", {"id": Math.floor(Math.random() * 90000000), "method" : "depth.subscribe", "params" : [newpair, 9,"9"] });
    socket.emit("message", {"id": Math.floor(Math.random() * 90000000), "method" : "state.subscribe", "params" : [newpair] });
}


