import React, { useContext } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'

import { UserContext } from '../contexts/UserContext'

import HomeIcon from '../assets/svg/home.svg'
import SearchIcon from '../assets/svg/search.svg'
import TodayIcon from '../assets/svg/today.svg'
import FavoriteIcon from '../assets/svg/favorite.svg'
import AccountIcon from '../assets/svg/account.svg'

export default ({ state, navigation }) => {

    const { state: user } = useContext(UserContext)

    const goTo = (screenName) => {
        navigation.navigate(screenName)
    }


    return (
        <View style={styles.container} >
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => goTo('Home')} >
                <View style={{ opacity: state.index === 0 ? 1 : 0.5 }} >
                    <HomeIcon width="28" height="28" fill="#FFF" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => goTo('Search')} >
                <View style={{ opacity: state.index === 1 ? 1 : 0.5 }} >
                    <SearchIcon width="28" height="28" fill="#FFF" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.centerTouchable} onPress={() => goTo('Appointments')} >
                <View>
                    <TodayIcon width="35" height="35" fill="#4EADBE" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => goTo('Favorites')} >
                <View style={{ opacity: state.index === 3 ? 1 : 0.5 }} >
                    <FavoriteIcon width="28" height="28" fill="#FFF" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => goTo('Profile')} >
                <View style={{ opacity: state.index === 4 ? 1 : 0.5 }} >
                    {user.avatar != '' ?
                        <Image style={styles.image} source={{ uri: user.avatar }} />
                        :
                        <AccountIcon width="28" height="28" fill="#FFF" />
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: '#4EADBE',
        flexDirection: 'row'
    },
    centerTouchable: {
        width: 75,
        height: 75,
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderRadius: 75 / 2,
        borderColor: '#4EADBE',
        borderStyle: "solid",
        alignItems: 'center',
        marginTop: -25,
        borderWidth: 4
    },
    image:{
        width: 28,
        height: 28,
        borderRadius: 14
    }
})