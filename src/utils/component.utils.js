import { Platform, ToastAndroid, Linking, Clipboard } from "react-native";
import { Toast } from "native-base";
import { Images } from "../theme";


export const renderToast = (message) => {
    if (Platform.OS === 'android') {
      toast = ToastAndroid.show(message, ToastAndroid.LONG);
    } else {
      // TODO test this iOS
      toast = Toast.show({
        text: message,
        buttonText: 'Okay',
        position: "bottom",
        style: {marginBottom: 10}
      })
    }
    return toast;
  }
  

  export const copyText =(text, label='Text') =>{
    Clipboard.setString(text)
    Toast.show({
        text: `Copied ${label}`,
        buttonText: 'Okay',
        type:"success",
        position:"bottom"
      })
}


const startSocket=(marketPairs) => {
  console.log("soceklt mareket_paors",marketPairs)
  // const reduxState = store.getState()
  socket.on("connect", function() {
      // console.log("connected")
     
      socket.emit("message", {"id": 1, "method" : "state.subscribe", "params" : marketPairs });
      socket.on("message", function(data) {
          const result = JSON.parse(pako.inflate(data, { to: "string" }));
          console.log("count-socket",count2);
          // console.log("soclet00000",result);
          // console.log("id",id);
          id++
          count2++
          result.id = Math.random().toString()
          // setData([result])
          if(result.params){

              dispatch(addMarketData(result))
          }
      });
  })

  socket.on("disconnect", function(){
      console.log("socket disconnected");
  });
}

export const imageRenderer = (item, type=0)=>{
  switch(item){
      case 'USDT':
          return type==0? Images.usdt_white :Images.usdt_black;
      case 'INR':
          return type==0? Images.inr_white :Images.inr_black;
      case 'LTC':
           return type==0? Images.ltc_white : Images.ltc_black;
      case 'BTC':
           return type==0? Images.btc_white : Images.btc_black;
      case 'ETH':
           return Images.eth_white;
      default:
           return type==0? Images.dash_white : Images.dash_black;
  }
}