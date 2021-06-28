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
    }
}