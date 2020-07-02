import { Platform, ToastAndroid, Linking, Clipboard } from "react-native";
import { Toast } from "native-base";


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