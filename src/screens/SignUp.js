import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import { UserContext } from '../contexts/UserContext'

import BarberLogo from '../assets/svg/barber.svg'
import EmailIcon from '../assets/svg/email.svg'
import LockIcon from '../assets/svg/lock.svg'
import PersonIcon from '../assets/svg/person.svg'

import SignInput from '../components/SignInput'

import Api from '../Api'

export default () => {

    const { dispatch: userDispatch } = useContext(UserContext)

    const navigation = useNavigation()

    const [nameFild, setNameFild] = useState('')
    const [emailFild, setEmailFild] = useState('')
    const [passwordFild, setPasswordFild] = useState('')

    const handleSignClick = async ()  => {
        if( nameFild != '' && passwordFild != '' && emailFild != '' ){
            let res = await Api.signUp(nameFild, emailFild, passwordFild)
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
                Alert.alert('Erro ao cadastrar', "Erro ao fazer login")
            }
        }else{
            Alert.alert("Erro ao cadastrar", "Preencha os campos corretamente")
        }
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignIn'}]
        })
    }

    return (
        <View style={styles.container} >
            <BarberLogo width="100%" height="160" />
            <View style={styles.inputArea} >

                <SignInput
                    IconSvg={PersonIcon}
                    placeholder="Digite seu nome"
                    value={nameFild}
                    onChangeText={text => setNameFild(text)} />
                <SignInput
                    IconSvg={EmailIcon}
                    placeholder="Digite seu e-mail"
                    value={emailFild}
                    onChangeText={text => setEmailFild(text)} />
                <SignInput
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={passwordFild}
                    onChangeText={text => setPasswordFild(text)}
                    password={true} />
                <TouchableOpacity style={styles.botton} onPress={handleSignClick} >
                    <Text
                        style={{ fontSize: 18, color: '#FFF', fontFamily: 'Montserrat-Bold' }} >
                        Cadastra
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.containerCad} onPress={handleMessageButtonClick} >
                <Text
                    style={[styles.textCad, { fontFamily: 'Montserrat-Regular' }]} >
                    J?? possui uma conta?
                </Text>
                <Text
                    style={[styles.textCad, { fontFamily: 'Montserrat-Bold' }]} >
                    Fa??a Login
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#63C2D1',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputArea: {
        padding: 40,
        width: '100%'
    },
    botton: {
        height: 60,
        backgroundColor: '#268596',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerCad: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 20,
        alignItems: 'center',
    },
    textCad: {
        fontSize: 16,
        color: '#268596',
        marginLeft: 5,
        alignSelf: 'center'
    }
})