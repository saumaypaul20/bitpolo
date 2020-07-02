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