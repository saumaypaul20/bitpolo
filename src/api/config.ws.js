import store from '../redux/store'
import io from 'socket.io-client';
import * as  ENDPOINT from '../api/constants'
import { addMarketData, triggerMarketSocket } from '../redux/actions/markets.action';
import { splitIt } from '../utils/converters';
import { addDepthSubs } from '../redux/actions/depthSubs.action';
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
                    store.dispatch(addDepthSubs(result))
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
export const emitDepthSubscribeEvent = () =>{
    socket.emit("message", {"id": 2, "method" : "depth.subscribe", "params" : ["BTCINR", 9,"9"] });
}


