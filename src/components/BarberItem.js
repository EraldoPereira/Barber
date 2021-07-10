import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Stars from './Stars'

export default ({ data }) => {

    const navigation = useNavigation()

    const handleClick = () => {
        navigation.navigate('Barber', {
            id: data.id,
            avatar: data.avatar,
            name: data.name,
            stars: data.stars
        })
    }

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.9} onPress={handleClick} >
            <View style={{ flexDirection: 'row' }} >
                <Image source={{ uri: data.avatar }} style={styles.image} />
                <View style={styles.infoContainer} >
                    <Text style={styles.userName} >{data.name}</Text>
                    <Stars stars={data.stars} showNunber={true} />
                    <View style={styles.profile} >
                        <Text style={styles.textProfile} >Ver perfil</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        marginBottom: 20,
        borderRadius: 20,
        padding: 15,
        flexDirection: 'row'
    },
    image: {
        height: 88,
        width: 88,
        borderRadius: 20
    },
    infoContainer: {
        marginLeft: 20,
        justifyContent: 'space-between'
    },
    userName: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 17
    },
    profile: {
        width: 85,
        height: 26,
        borderColor: '#4EADBE',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textProfile: {
        fontFamily: 'Montserrat-Regular',
        color: '#268596'
    }
})