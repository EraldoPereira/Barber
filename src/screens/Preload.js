import React, {useEffect} from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'


import BarberLogo from '../assets/svg/barber.svg'

export default () => {

    const navigation = useNavigation()

    useEffect( () => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token')
            if(token){
                // Validar token
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