import React from 'react'
import {View, StyleSheet, TextInput} from 'react-native'


export default ({ IconSvg, placeholder, value, onChangeText, password }) => {
    return(
        <View style={styles.container} >
            <IconSvg width="24" height="24" fill="#268596" />
            <TextInput 
            style={styles.textInput} 
            placeholder={placeholder} 
            value={value} 
            onChangeText={onChangeText}
            secureTextEntry={password} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: 60,
        backgroundColor: '#83D6E3',
        flexDirection: 'row',
        borderRadius: 30,
        paddingLeft: 15,
        alignItems: 'center',
        marginBottom: 15
    },
    textInput:{
        flex: 1,
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
        color: '#268596',
        marginLeft: 10
    }
})