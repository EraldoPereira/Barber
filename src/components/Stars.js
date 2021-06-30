import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import StarFull from '../assets/svg/star.svg'
import StarHalf from '../assets/svg/star_half.svg'
import StarEmpty from '../assets/svg/star_empty.svg'


export default ({ stars, showNunber }) => {


    let s = [0, 0, 0, 0, 0]
    let floor = Math.floor(stars)
    let left = stars - floor

    for(var i=0 ; i < floor; i++ ){
        s[i] = 2
    }
    if(left > 0){
        s[i] = 1
    }



    return (
        <View style={styles.container} >
            {s.map((i, k) => (
                <View key={k} >
                    {i === 0 && <StarEmpty width="18" height="18" fill="#FF9200" />}
                    {i === 1 && <StarHalf width="18" height="18" fill="#FF9200" />}
                    {i === 2 && <StarFull width="18" height="18" fill="#FF9200" />}
                </View>
            ))}
            {showNunber && <Text style={styles.stars} >{stars}</Text> }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    stars:{
        fontFamily: 'Montserrat-Bold',
        marginLeft: 5,
        color: '#737373'
    }
})