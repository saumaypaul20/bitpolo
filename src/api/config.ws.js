import store from '../redux/store';
import io from 'socket.io-client';
import * as ENDPOINT from '../api/constants';
import {
  addMarketData,
  triggerMarketSocket,
} from '../redux/actions/markets.action';
import {splitIt} from '../utils/converters';
import {
  addDepthSubs,
  addDepthAsks,
  addDepthBids,
} from '../redux/actions/depthSubs.action';
import _ from 'lodash';
import {addDealsData} from '../redux/actions/deals.actions';
import {addKlineData, addKlineQueryData} from '../redux/actions/kline.actions';
// import { emitPingEvent } from './events.ws';
// var io = require("socket.io-client/dist/socket.io");
const pako = require('pako');
const socket = io(ENDPOINT.WEBSOCKET, {
  transports: ['websocket'],
});

let depth_update = 0;
let state_update = 0;
export const startSocket = () => {
  // ON CONNECT

  socket.on('connect', function() {
    console.log('connected scoket---------------');
    emitPingEvent();
    // setInterval(() => {
    //     console.log("emiting ping")
    //     socket.emit("ping");
    // }, 3000);

    socket.on('message', function(data) {
      console.log('pako data', data);
      let result;
      let state = store.getState();
      if (data != 'pong') {
        result = JSON.parse(pako.inflate(data, {to: 'string'}));
        result.id = Math.random().toString();
      } else {
        result = data;
      }
      console.log('socket', result);

      // Event handlers
      switch (result.method) {
        case 'state.update':
          // console.log("state_update res====~$~$~$~$~$",state_update)
          state_update++;
          if (result.params) {
            let pair = result.params[0];
            if (pair.match('INR')) {
              result.divider = splitIt(result.params[0], 'INR');
            } else if (pair.match('USDT')) {
              result.divider = splitIt(result.params[0], 'USDT');
            }
            store.dispatch(addMarketData(result));
          }
          break;

        case 'deals.update':
          if (result.params) {
            //console.log("deals resutlt 0000000000000000000000000",result)
            let pair = result.params[0];
            if (pair.match('INR')) {
              result.params[1].divider = splitIt(result.params[0], 'INR');
            } else if (pair.match('USDT')) {
              result.params[1].divider = splitIt(result.params[0], 'USDT');
            }
            store.dispatch(addDealsData(result));
          }
          break;
        case 'kline.update':
          if (result.params) {
            console.log('kline resutlt 0000000000000000000000000', result);

            if (result.params.length === 7) {
              //alert("yooooo")
              store.dispatch(addKlineData(result));
            }
            // else if( result.params[0][0].length === 8){
            //     alert("yooooo2")
            //     let res = result;
            //     res.params= res.params[0][0]
            //     store.dispatch(addKlineData(res))
            //  }
          }
          break;

        case 'depth.update':
         
          let res = result;
          res.params[1].asks = _.sortBy(res.params[1].asks, 'p').reverse();
          res.params[1].bids = _.sortBy(res.params[1].bids, 'p').reverse();
          if (
            state.marketReducer.activeTradePair &&
            state.marketReducer.activeTradePair === res.params[2]
          ) {
            store.dispatch(addDepthSubs(res));
            store.dispatch(addDepthAsks(res.params[1].asks));
            store.dispatch(addDepthBids(res.params[1].bids));
          }

          break;

        case undefined:
          //alert(typeof result)
          if (Array.isArray(result.result)) {
              // alert("yo")
               
              //console.log("kline que..==================", result)
              //alert(result.result[6])
              if (result.result[0].length === 7 && state.marketReducer.activeTradePair && state.marketReducer.activeTradePair === result.result[0][6]) {
                  //alert("yo")
                //   alert(JSON.stringify(result.result))
              //  let res = result;
              //  res.params= res[0][0]
              store.dispatch(addKlineQueryData(result.result));
              //emitKlineSubscribeEvent(res.params[6])
            }
          }
          break;
        default:
          // console.log(result)
          break;
      }
    });
  });

  // ON DISCONNECT
  socket.on('disconnect', function() {
    console.log('socket disconnected');
  });
};

//Ping-Pong
export const emitPingEvent = () => {
  console.log('ping event emit');
  setInterval(() => {
    socket.emit('message', 'ping');
  }, 3000);
};

//State Subscription
export const emitMarketListEvent = marketPairs => {
  store.dispatch(triggerMarketSocket());
  // console.log("dsipacthed trigger", store.getState())

  // console.log("soceklt mareket_paors",marketPairs)
  socket.emit('message', {
    id: Math.floor(Math.random() * 9000000),
    method: 'state.subscribe',
    params: marketPairs,
  });
};

//State Subscription
export const emitUnsubMarketListEvent = marketPairs => {
  store.dispatch(triggerMarketSocket());
  //console.log("dsipacthed trigger", store.getState())

  //console.log("soceklt mareket_paors",marketPairs)
  socket.emit('message', {
    id: Math.floor(Math.random() * 9000000),
    method: 'state.unsubscribe',
    params: marketPairs,
  });
};

//Deals Subscription
export const emitMarketDealsEvent = marketPairs => {
  //store.dispatch(triggerMarketSocket())
  // console.log("dsipacthed trigger", store.getState())

  // console.log("soceklt mareket_paors",marketPairs)
  socket.emit('message', {
    id: Math.floor(Math.random() * 9000000),
    method: 'deals.subscribe',
    params: [marketPairs],
  });
};

//Kline Subscription
export const emitKlineSubscribeEvent = (pair, lastpair, interval = 900) => {
  //store.dispatch(triggerMarketSocket())
  //console.log("dsipacthed trigger", store.getState())
  //emitKlineQuerySubscribeEvent(pair)
  if (lastpair) {
    emitKlineUnsubscribeEvent(lastpair);
  }
  emitKlineQuerySubscribeEvent(pair);
  console.log('soceklt kline snet **************', pair);
  socket.emit('message', {
    id: Math.floor(Math.random() * 9000000),
    method: 'kline.subscribe',
    params: [pair, interval],
  });
  //
};
export const emitKlineQuerySubscribeEvent = (pair, interval = 900) => {
  //store.dispatch(triggerMarketSocket())
  // console.log("dsipacthed trigger", store.getState())

  console.log('soceklt klinequery snet **************', pair);
  console.log(
    JSON.stringify({
      id: Math.floor(Math.random() * 6000000),
      method: 'kline.query',
      params: [
        pair,
        Math.floor(new Date().getTime() / 1000) - 3 * 24 * 60 * 60,
        Math.floor(new Date().getTime() / 1000),
        interval,
      ],
    }),
  );
  console.log(
    '^^^^^^^^^^^^^^^^^^^$$$$$$$$$$$**************)))))))))))))))###########',
  );
  console.log(
    '^^^^^^^^^^^^^^^^^^^$$$$$$$$$$$**************)))))))))))))))###########',
  );
  // console.log("pair",((new Date().getTime() )- 3*24*60*60*1000),(new Date().getTime()))
  socket.emit('message', {
    id: Math.floor(Math.random() * 6000000),
    method: 'kline.query',
    params: [
      pair,
      (Math.floor(new Date().getTime()) - 3 * 24 * 60 * 60*1000)/1000,
      Math.floor(new Date().getTime() / 1000),
      interval,
    ],
  });
};

//Depth Subscription
export const emitDepthSubscribeEvent = (lastpair, newpair) => {
  if (lastpair) {
    emitDepthUnsubscribeEvent(lastpair);
    // socket.emit("message", {"id": Math.floor(Math.random() * 9000000), "method" : "depth.unsubscribe", "params" : [lastpair, 9,"0"] });
    // socket.emit("message", {"id": Math.floor(Math.random() * 90000000), "method" : "state.unsubscribe", "params" : [newpair] });
  }
  if (!newpair) {
    return;
  }
  console.log('soceklt emitDepthSubscribeEvent snet **************', newpair);
  console.log(
    JSON.stringify({
      id: Math.floor(Math.random() * 90000000),
      method: 'depth.subscribe',
      params: [newpair, 9, '0'],
    }),
  );
  socket.emit('message', {
    id: Math.floor(Math.random() * 90000000),
    method: 'depth.subscribe',
    params: [newpair, 9, '0'],
  });
  socket.emit('message', {
    id: Math.floor(Math.random() * 90000000),
    method: 'state.subscribe',
    params: [newpair],
  });
};

export const emitDepthUnsubscribeEvent = lastpair => {
  // alert("called unsb depths")
  socket.emit('message', {
    id: Math.floor(Math.random() * 9000000),
    method: 'depth.unsubscribe',
    params: [lastpair],
  });
};

export const emitKlineUnsubscribeEvent = lastpair => {
  // alert("called unsb depths")
  socket.emit('message', {
    id: Math.floor(Math.random() * 9000000),
    method: 'kline.unsubscribe',
    params: [lastpair],
  });
};

export const stopSocket = () => {
  socket.disconnect();
};
