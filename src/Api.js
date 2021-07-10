import AsyncStorage from "@react-native-community/async-storage"

const BASE_API = 'https://api.b7web.com.br/devbarber/api'


export default {
    checkToken : async (token) => {
        const req = await fetch(`${BASE_API}/auth/refresh`,{
            method: 'POST',
            headers: {
                'Accept': 'Application/json',
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({ token: token })
        })
        const json = await req.json()
        return json
    },
    signIn: async (email, password) => {
        const req = await fetch(`${BASE_API}/auth/login`,{
            method: 'POST',
            headers: {
                'Accept': 'Application/json',
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
        const json = await req.json()
        return json
    },
    signUp: async (name, email, password) => {
        const req = await fetch(`${BASE_API}/user`,{
            method: 'POST',
            headers: {
                'Accept': 'Application/json',
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({name: name, email: email, password: password })
        })
        const json = await req.json()
        return json
    },
    getBarbers: async (lat=null, lng=null, address=null) => {
        const token = await AsyncStorage.getItem('token')
        const res = await fetch(`${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${lng}&address=${address}`)
        const json = await res.json()
        return json
    },
    logout: async () => {
        const token = await AsyncStorage.getItem('token')
        const req = await fetch(`${BASE_API}/auth/logout`,{
            method: 'POST',
            headers: {
                'Accept': 'Application/json',
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({ token })
        })
        const json = await req.json()
        return json
    },
    getBarber: async (id) => {
        const token = await AsyncStorage.getItem('token')
        const res = await fetch(`${BASE_API}/barber/${id}?token=${token}`)
        const json = res.json()
        return json
    },
    setAppointment: async (userId, service, selectedYear, selectedMonth, selectedDay, selectedHour) => {
        const token = await AsyncStorage.getItem('token')
        const req = await fetch(`${BASE_API}/user/appointment`,{
            method: 'POST',
            headers: {
                'Accept': 'Application/json',
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({ token, id: userId, service: service, year: selectedYear, month: selectedMonth, day: selectedDay, hour: selectedHour })
        })
        const json = await req.json()
        return json
    }
}