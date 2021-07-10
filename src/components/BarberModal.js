import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Modal, TouchableOpacity, Image, Text, ScrollView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import ExpandIcon from '../assets/svg/expand.svg'
import NavPrevIcon from '../assets/svg/nav_prev.svg'
import NavNextIcon from '../assets/svg/nav_next.svg'

import Api from '../Api'

const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
]

const days = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sáb'
]

export default ({ show, setShow, user, service }) => {
    const navigation = useNavigation()

    const [selectedYear, setSelectedYear] = useState(0)
    const [selectedMonth, setSelectedMonth] = useState(0)
    const [selectedDay, setSelectedDay] = useState(null)
    const [selectedHour, setSelectedHour] = useState(null)
    const [listDays, setListDays] = useState([])
    const [listHours, setListHours] = useState([])

    useEffect(() => {
        if (user.available) {
            let dayInMonths = new Date(selectedYear, selectedMonth + 1, 0).getDate()
            let newListDays = []

            for (let index = 1; index <= dayInMonths; index++) {
                let d = new Date(selectedYear, selectedMonth, index)
                let year = d.getFullYear()
                let month = d.getMonth() + 1
                let day = d.getDate()
                month = month < 10 ? '0' + month : month
                day = day < 10 ? '0' + day : day
                let selDate = year + '-' + month + '-' + day

                let availavility = user.available.filter((e) => e.date === selDate)
                newListDays.push({
                    status: availavility.length > 0 ? true : false,
                    weekday: days[d.getDay()],
                    number: index
                })
            }

            setListDays(newListDays)
            setSelectedDay(null)
            setListHours([])
            setSelectedHour(0)
        }

    }, [user, selectedMonth, selectedYear])

    useEffect(() => {
        if (user.available && selectedDay > 0) {
            let d = new Date(selectedYear, selectedMonth, selectedDay)
            let year = d.getFullYear()
            let month = d.getMonth() + 1
            let day = d.getDate()
            month = month < 10 ? '0' + month : month
            day = day < 10 ? '0' + day : day
            let selDate = year + '-' + month + '-' + day
            let availavility = user.available.filter((e) => e.date === selDate)
            if (availavility.length > 0) {
                setListHours(availavility[0].hours)
            }

        }
        setSelectedHour(0)
    }, [user, selectedDay])

    useEffect(() => {
        let today = new Date()
        setSelectedYear(today.getFullYear())
        setSelectedMonth(today.getMonth())
        setSelectedDay(today.getDate())
    }, [])

    const handleLeftDateClick = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth(mountDate.getMonth() - 1)
        setSelectedYear(mountDate.getFullYear())
        setSelectedMonth(mountDate.getMonth())
        setSelectedDay(null)
    }

    const handleRightDateClick = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth(mountDate.getMonth() + 1)
        setSelectedYear(mountDate.getFullYear())
        setSelectedMonth(mountDate.getMonth())
        setSelectedDay(null)
    }

    const handleCloseButton = () => {
        setShow(false)
    }

    const handleFinishClick = async () => {
        if (
            user.id &&
            service != null &&
            selectedYear > 0 &&
            selectedMonth > 0 &&
            selectedDay > 0 &&
            selectedHour != null) {
            /* let res = await Api.setAppointment(
                user.id,
                service,
                selectedYear,
                selectedMonth,
                selectedDay,
                selectedHour
            )
            if (res.error == '') {
                setShow(false)
                navigation.navigate('Appointments')
            }
            else {
                Alert.alert("Error", res.error)
            } */
            setShow(false)
            navigation.navigate('Appointments')
        } else {
            Alert.alert("Preencha os Dados!", "Dados incorretos")
        }
    }

    return (
        <Modal
            transparent={true}
            visible={show}
            animationType="slide"
        >
            <View style={styles.container} >
                <TouchableOpacity onPress={handleCloseButton} style={styles.containerInative} >
                    <View></View>
                </TouchableOpacity>
                <View style={styles.containerBody} >
                    <TouchableOpacity activeOpacity={0.8} style={styles.containerButton} onPress={handleCloseButton} >
                        <View>
                            <ExpandIcon width="40" height="40" fill="#000" />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.containerItem} >
                        <Image style={styles.avatar} source={{ uri: user.avatar }} />
                        <Text style={styles.userName} >{user.name}</Text>
                    </View>
                    {
                        service != null &&
                        <View style={[styles.containerItem, { justifyContent: 'space-between', marginTop: 20, padding: 15 }]} >
                            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16 }} >{user.services[service].name}</Text>
                            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16 }} >R$ {user.services[service].price.toFixed(2)}</Text>
                        </View>
                    }
                    <View style={styles.containerItemDate} >
                        <View style={{ flexDirection: 'row', padding: 0, alignItems: 'center' }} >
                            <TouchableOpacity style={styles.datePrev} onPress={handleLeftDateClick} >
                                <View>
                                    <NavPrevIcon width="38" height="38" fill="#000" />
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.dateTitle} > {months[selectedMonth]} {selectedYear}</Text>
                            <TouchableOpacity style={styles.dateNex} onPress={handleRightDateClick} >
                                <View>
                                    <NavNextIcon width="38" height="38" fill="#000" />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  >
                            {
                                listDays.map((item, key) => (
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        key={key}
                                        style={[styles.buttonDays, {
                                            opacity: item.status ? 1 : 0.5,
                                            backgroundColor: item.number === selectedDay ? '#4EADBE' : '#FFF'
                                        }]}
                                        onPress={() => {
                                            item.status ? setSelectedDay(item.number) : null
                                        }}
                                    >
                                        <View style={{ flexDirection: 'column' }} >
                                            <Text
                                                style={[styles.textDate, { color: item.number === selectedDay ? '#FFF' : '#000' }]} >
                                                {item.weekday}
                                            </Text>
                                            <Text
                                                style={[styles.textDate, { color: item.number === selectedDay ? '#FFF' : '#000' }]} >
                                                {item.number}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                    </View>
                    {
                        selectedDay > 0 && listHours.length > 0 &&
                        <View style={[styles.containerItem, { marginTop: 10 }]} >
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                {
                                    listHours.map((item, key) => (
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            key={key}
                                            onPress={() => setSelectedHour(item)}
                                            style={[styles.timerItem, { backgroundColor: item === selectedHour ? '#4EADBE' : '#FFF' }]}>
                                            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16, color: item === selectedHour ? '#FFF' : '#000' }} >{item}</Text>
                                        </TouchableOpacity>
                                    ))
                                }
                            </ScrollView>
                        </View>
                    }
                    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleFinishClick} >
                        <View>
                            <Text style={styles.buttonText} >Finalizar Agendamento</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    containerInative: {
        flex: 1,
    },
    containerBody: {
        flex: 2,
        backgroundColor: '#83D6E3',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 10,
        paddingLeft: 20,
        paddingBottom: 40,
        paddingRight: 20,
    },
    containerButton: {
        height: 40,
        width: 40
    },
    containerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 15,
    },
    containerItemDate: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 15,
        marginTop: 10,
        justifyContent: 'center'
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 20,
        marginRight: 15,
    },
    userName: {
        color: '#000',
        fontSize: 18,
        fontFamily: 'Montserrat-Bold'
    },
    button: {
        backgroundColor: '#268596',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20
    },
    buttonText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 17,
        color: '#FFF'
    },
    datePrev: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    dateNex: {
        flex: 1,
        alignItems: 'flex-start',
    },
    dateTitle: {
        width: 160,
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
        alignSelf: 'center',
        textAlign: 'center',
    },
    buttonDays: {
        width: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 5,
        height: 60
    },
    textDate: {
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center'
    },
    timerItem: {
        width: 75,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
})