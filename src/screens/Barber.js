import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Image,
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Swiper from 'react-native-swiper'

import Stars from '../components/Stars'
import BarberModal from '../components/BarberModal'


import FavoriteIcon from '../assets/svg/favorite.svg'
import FavoriteFullIcon from '../assets/svg/favorite_full.svg'
import BackIcon from '../assets/svg/back.svg'
import NavPrevIcon from '../assets/svg/nav_prev.svg'
import NavNextIcon from '../assets/svg/nav_next.svg'

import Api from '../Api'

export default () => {

    const navigation = useNavigation()
    const route = useRoute()

    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars
    })
    const [loading, setLoading] = useState(false)
    const [favorited, setFavorited] = useState(false)
    const [selectedService, setselectedService] = useState(null)
    const [showModal, setshowModal] = useState(false)


    useEffect(() => {
        const getBarberInfo = async () => {
            setLoading(true)
            let json = await Api.getBarber(userInfo.id)
            if (json.error == '') {
                setUserInfo(json.data)
                setFavorited(json.data.fovorited)
            } else {
                Alert.alert("Erro: ", json.error)
            }
            setLoading(false)

        }
        getBarberInfo()

    }, [])

    const handleBackButton = () => {
        navigation.goBack()
    }

    const handleFavClick = () => {
        setFavorited(!favorited)
    }

    const handleServiceChosoe = (key) => {
        setselectedService(key)
        setshowModal(true)
    }

    return (
        <View style={styles.container} >
            <ScrollView style={{ flex: 1 }} >
                {
                    userInfo.photos && userInfo.photos.length > 0 ?
                        <Swiper
                            style={{ height: 240, width: '100%' }}
                            dot={<View style={styles.dot}></View>}
                            activeDot={<View style={[styles.dot, { backgroundColor: '#000' }]} ></View>}
                            paginationStyle={{ top: 15, right: 15, bottom: null, left: null }}
                            autoplay={true}
                            index={0}
                        >{userInfo.photos.map((item, key) => (
                            <View key={key} style={{ flex: 1 }} >
                                <Image source={{ uri: item.url }} resizeMode="cover" style={{ width: '100%', height: 240 }} />
                            </View>
                        )
                        )}
                        </Swiper>
                        :
                        <View style={styles.fakeSwiper} ></View>
                }
                <View style={styles.pageBody} >
                    <View style={styles.userInfoArea} >
                        <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
                        <View style={{ justifyContent: 'flex-end' }} >
                            <Text style={styles.text} >{userInfo.name}</Text>
                            <Stars stars={userInfo.stars} showNunber={true} />
                        </View>
                        <TouchableOpacity style={styles.userFavButton} activeOpacity={0.9} onPress={handleFavClick} >
                            <View>
                                {
                                    favorited ?
                                        <FavoriteFullIcon width="28" height="28" fill="#FF0000" />
                                        :
                                        <FavoriteIcon width="28" height="28" fill="#FF0000" />
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                    {loading &&
                        <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#000" />
                    }
                    <View style={styles.serviceArea} >
                        <Text style={styles.serviceText} >Lista de serviços</Text>
                        {userInfo.services &&
                            userInfo.services.map((item, key) => (
                                <View key={key} style={styles.containerServiceItem} >
                                    <View>
                                        <Text style={styles.nameService} >{item.name}</Text>
                                        <Text style={styles.priceService} >R$ {item.price.toFixed(2)}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.serviceButton} activeOpacity={0.8} onPress={() => handleServiceChosoe(key)} >
                                        <View>
                                            <Text style={styles.serviceButtonText} >Agenda</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))
                        }
                    </View>
                    {
                        userInfo.testimonials && userInfo.testimonials.length > 0 &&
                        <View style={styles.testimonialArea} >
                            <Swiper
                                style={{ height: 110 }}
                                showsPagination={false}
                                showsButtons={true}
                                prevButton={<NavPrevIcon width="35" height="35" fill="#000" />}
                                nextButton={<NavNextIcon width="35" height="35" fill="#000" />}
                            >
                                {
                                    userInfo.testimonials.map((item, key) => (
                                        <View key={key} style={styles.testimonialItem} >
                                            <View style={styles.testimonialInfo} >
                                                <Text style={styles.testimonialName} >{item.name}</Text>
                                                <Stars stars={item.rate} showNunber={false} />
                                            </View>
                                            <Text style={styles.testimonialBody} >{item.body}</Text>
                                        </View>
                                    ))
                                }
                            </Swiper>
                        </View>
                    }
                </View>
            </ScrollView>
            <TouchableOpacity onPress={handleBackButton} style={styles.buttonBack} >
                <BackIcon width="40" height="40" fill="#FFF" />
            </TouchableOpacity>
            <BarberModal
                show={showModal}
                setShow={setshowModal}
                user={userInfo}
                service={selectedService}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    dot: {
        width: 10,
        height: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        margin: 3
    },
    fakeSwiper: {
        backgroundColor: '#63c2d1',
        height: 150,
    },
    pageBody: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 50,
        marginTop: -50,
    },
    userInfoArea: {
        flexDirection: 'row',
        marginTop: -30
    },
    serviceArea: {
        marginTop: 20
    },
    testimonialArea: {
        marginTop: 25,
        marginBottom: 50
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 20,
        marginLeft: 30,
        marginRight: 20,
        borderWidth: 4,
        borderColor: '#FFF'
    },
    text: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
        marginBottom: 10
    },
    userFavButton: {
        width: 40,
        height: 40,
        backgroundColor: '#FFF',
        borderColor: '#999',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: "solid",
        borderWidth: 2,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20
    },
    buttonBack: {
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 9
    },
    containerServiceItem: {
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 20,
        justifyContent: 'space-between'
    },
    nameService: {
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        color: '#268596'
    },
    priceService: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        color: '#268596'
    },
    serviceButton: {
        backgroundColor: '#4EADBE',
        borderRadius: 10,
        padding: 10
    },
    serviceButtonText: {
        fontFamily: 'Montserrat-Bold',
        color: '#FFF',
        fontSize: 14,
    },
    serviceText: {
        fontFamily: 'Montserrat-Bold',
        color: '#268596',
        marginLeft: 30,
        marginBottom: 15,
        fontSize: 20
    },
    testimonialItem: {
        backgroundColor: '#268596',
        padding: 15,
        borderRadius: 10,
        height: 110,
        justifyContent: 'center',
        marginLeft: 45,
        marginRight: 45,
    },
    testimonialInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    testimonialName: {
        color: '#FFF',
        fontFamily: 'Montserrat-Bold',
        fontSize: 14
    },
    testimonialBody: {
        color: '#FFF',
        fontFamily: 'Montserrat-Regular',
        fontSize: 13
    }
})