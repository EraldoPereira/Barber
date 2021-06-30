import React, { useState, useEffect } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TextInput, 
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    RefreshControl
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { request, PERMISSIONS } from 'react-native-permissions'
import Geolocation from '@react-native-community/geolocation'

import SearchIcon from '../assets/svg/search.svg'
import MyLocationIcon from '../assets/svg/my_location.svg'

import BarberItem from '../components/BarberItem'

import Api from '../Api'

export default () => {



    const navigation = useNavigation()

    const [locationText, setLocationText] = useState('')
    const [coords, setCoords] = useState(null)
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    const handleLocationFinder = async () => {
        setCoords(null)
        let result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        if(result == 'granted'){
            setLoading(true)
            setLocationText('')
            setList([])
            Geolocation.getCurrentPosition( (info) => {
                setCoords(info.coords)
                getBarbers()
            })
        }
    }

    const getBarbers = async () => {
        setLoading(true)
        setList([])

        let lat = null
        let lng = null

        if(coords){
            lat = coords.latitude
            lng = coords.longitude
        }

        let res = await Api.getBarbers(lat, lng, locationText)
        if(res.error == ''){
            if( res.loc ){
                setLocationText(res.loc)
            }
            setList(res.data)
        }else{
            Alert.alert('Error', 'Erro ao carregar')
        }
        setLoading(false)
    }


    useEffect(()=>{
        getBarbers()
    },[])


    const onRefresh = () => {
        setRefreshing(false)
        getBarbers()
    }

    const handleLocationSearch = () => {
        setCoords({})
        getBarbers()

    }

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1, padding: 20 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                <View style={styles.header} >
                    <Text numberOfLines={2} style={styles.headerTitle} >Encontre o seu barbeiro favorito</Text>
                    <TouchableOpacity style={{ width: 28, height: 28 }} onPress={() => navigation.navigate('Search')} >
                        <SearchIcon width="28" height="28" fill="#FFF" />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerLocation} >
                    <TextInput
                        style={styles.input}
                        placeholder="Onde você está?"
                        placeholderTextColor="#FFF"
                        value={locationText}
                        onChangeText={(text) => setLocationText(text)}
                        onEndEditing={handleLocationSearch} />
                    <TouchableOpacity style={{ width: 28, height: 28 }} onPress={ handleLocationFinder } >
                        <View>
                            <MyLocationIcon width="28" height="28" fill="#FFF" />
                        </View>
                    </TouchableOpacity>
                </View>
                {loading && <ActivityIndicator size="large" color="#FFF" style={{marginTop: 50}} />}
                <View style={{ marginTop: 30, marginBottom: 30 }} >
                    { list.map((item, key) => ( <BarberItem key={key} data={item} /> ) ) }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#63C2D1',
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 26,
        fontFamily: 'Montserrat-Bold',
        color: '#FFFFFF',
        width: 250
    },
    containerLocation: {
        backgroundColor: '#4EADBE',
        height: 60,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 30,
    },
    input: {
        flex: 1,
        fontSize: 18,
        fontFamily: 'Montserrat-Regular',
        color: '#FFF'
    }
})