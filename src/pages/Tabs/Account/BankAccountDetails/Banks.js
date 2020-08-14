import React, { useState, useEffect, useCallback } from 'react'
import { View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toolbar from '../../../../components/Toolbar/Toolbar'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import SettingsListItem from '../../../../common/SettingsListItem/SettingsListItem'
import { Colors } from '../../../../theme'
import ChevronRight from '../../../../common/ChevronRight/ChevronRight'
import { screenNames } from '../../../../routes/screenNames/screenNames'
import { useNavigation } from '@react-navigation/native'
import { Container, Content, Icon,Button } from 'native-base'
import BPButton from '../../../../common/BPButton/BPButton'
import BPText from '../../../../common/BPText/BPText'
import { addBanks, deleteBanks } from '../../../../redux/actions/payments.action'
import { getBankAccounts, deleteBankAccount } from '../../../../api/payments.api'
import { equalityFnBankslist} from '../../../../utils/reduxChecker.utils'


const DelButton =({onPress})=>{
    return(  <TouchableOpacity onPress={()=>onPress()} style={{alignItems:'center', justifyContent:'center', alignSelf:'center'}}>
       <View style={{flexDirection:'row',alignItems:'center', paddingHorizontal:10, paddingVertical:5, borderRadius:4, backgroundColor: Colors.red, marginTop:10}}>
            <BPText>Delete</BPText>
       </View>
       </TouchableOpacity>)
}
const Chevron =({position})=>{
    return  <Icon type="FontAwesome" name={`chevron-${position}`} style={{color: Colors.white, fontSize: 11, opacity:0.6}} />
}

const Banks = () => {
    const navigation = useNavigation()
    // const user = useSelector(state=>state.authReducer.auth_attributes, shallowEqual);
    // console.log(user)
    const dispatch = useDispatch()
    // const [banks] = useState([])
    const banks = useSelector(state=> state.payments.banks, equalityFnBankslist)
    console.log("banks)))))))))))))))))))))))))))", banks)
    const [active,setactive] = useState(null)
    const [loading,setloading] = useState(true)

    const showDetails =(id)=>{
        setactive(id)
    }

    const getBanksList = useCallback(async()=>{
        setloading(true)
        let res  = await getBankAccounts();
        if(res.status){
            setloading(false)
            dispatch(addBanks(res.data))
        }
    },[])

    const deleteBank = async (i) =>{
        if(banks.length === 1){
            alert("You need atlease one bank account.")
            return
        }else{
            let res = await deleteBankAccount(i._id)
            if(res.status){
                dispatch(deleteBanks(i))
            }
        }
    }

       
    

    useEffect(() => {
        getBanksList()
        
    }, [])

    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}> 
         <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
            <Toolbar enableBackButton title={screenNames.BANK_ACCOUNT_DETAILS}/>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{flex:1, alignSelf:'stretch'}}>

                        {!loading ? 
                            banks?.map(i=>{
                               return(  
                               <React.Fragment key={i?._id}>
                                <SettingsListItem 
                                    label={i?.label}
                                
                                    paddingHorizontal={16} 
                                    borderBottom 
                                    rightElement={ active === i?.type_of_account?.bank_account?.account_number ? <Chevron position="up" /> : <Chevron position="down"/>} 
                                    onPress={()=> showDetails(i?.type_of_account?.bank_account?.account_number)}
                                />
                                {
                                    active === i?.type_of_account?.bank_account?.account_number && 
                                    <View style={{paddingHorizontal:16, paddingVertical:16, backgroundColor: Colors.darkGray3, borderBottomColor: Colors.gray, borderBottomWidth:1}}>
                                    <View >
                                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', alignSelf:'stretch'}}>
                                            <BPText>Account Label:</BPText>
                                            <BPText>{i?.label}</BPText>
                                        </View>
                                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', alignSelf:'stretch'}}>
                                            <BPText>Account Name:</BPText>
                                            <BPText>{i?.account_name}</BPText>
                                        </View>
                                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', alignSelf:'stretch'}}>
                                            <BPText>Account Type:</BPText>
                                            <BPText>{i?.type_of_account?.bank_account?.account_type}</BPText>
                                        </View>
                                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', alignSelf:'stretch'}}>
                                            <BPText>Account Number:</BPText>
                                            <BPText>{i?.type_of_account?.bank_account?.account_number}</BPText>
                                        </View>
                                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', alignSelf:'stretch'}}>
                                            <BPText>IFSC:</BPText>
                                            <BPText>{i?.type_of_account?.bank_account?.ifsc}</BPText>
                                        </View>

                                    </View>
                                    <DelButton onPress={(i)=> deleteBank(i)}/>
                                    </View>
                                }
                                    
                                </React.Fragment>
                            )
                            })
                            :
                            <ActivityIndicator color={Colors.white} size="large" />
                        }

                        <View style={{alignSelf:'stretch',justifyContent:'flex-end', marginTop:25, marginHorizontal:30}}>
                            <BPButton 
                                label="Add Bank" 
                                onPress={()=> navigation.navigate(screenNames.IMPS)} 
                            />

                        </View>
                    </View>
                </Content>
            </Container>
        </SafeAreaView>
    )
}

export default Banks
