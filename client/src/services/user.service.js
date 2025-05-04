import axios from 'axios'

const USER_INSTANCE = axios.create({
    baseURL : 'http://localhost:8000/v1/user',
    withCredentials: true //to send cookie/jwt with each request if available
})

export const register = async data => {
    try {
        const RES = await USER_INSTANCE.post('/', data )
        return RES
    } catch( error ){ throw error.response.data.errors }
}

export const login = async data => {
    try {
        const RES = await USER_INSTANCE.post('/login', data )
        return RES
    } catch( error ){ throw error.response.data }
}

export const logout = async () => {
    try {
        const RES = await USER_INSTANCE.post( '/logout' )
        return RES
    } catch( error ){ throw error }
}

export const getProfile = async () => {
    try {
        const RES = await USER_INSTANCE.get( '/profile' )
        return RES.data
    } catch( error ){ throw error }
}

export const getAllUsers = async () => {
    try {
        const RES = await USER_INSTANCE.get( '/' )
        return RES.data
    } catch( error ){ throw error }
}