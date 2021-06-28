import React, {useEffect, useContext} from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import Api from '../Api'

import BarberLogo from '../assets/svg/barber.svg'

export default () => {

    const { dispatch: userDispatch } = useContext(UserContext)

    const navigation = useNavigation()

    useEffect( () => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token')
            if(token){
                let res = await Api.checkToken(token)
                if(res.token){
                    await AsyncStorage.setItem('token', res.token)
                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: res.data.avatar
                    }
                })
                navigation.reset({
                    routes: [{ name: 'MainTab' }]
                })
                }else{
                    navigation.navigate('SignIn')
                }
            }else{
                navigation.navigate('SignIn')
            }
        }
        checkToken()
    }, [])


    return(
        <View style={styles.container} >
            <BarberLogo width="100%" height="160" />
            <ActivityIndicator style={{marginTop: 40}} size="large" color="#FFF" />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#63C2D1',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})