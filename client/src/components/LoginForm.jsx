import { login } from "../services/user.service"
import { useNavigate } from "react-router-dom"
import { useLogin } from '../context/UserContext'
import { useState, useEffect } from "react"

export const LoginForm = () => {
    const navigate = useNavigate()
    const { login:loginUser, isLoggedIn } = useLogin()
    // This login was renamed due to the import on line 1
    const [ error, setError ] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        const { userName, password } = e.target
        login( { userName: userName.value, password: password.value } )// First login server side to set cookie/jwt
            .then( ()=> {
                loginUser() //Set login to true in context to track condition client side
                navigate('/')
            } )
            .catch( error => setError( error ) )
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Login:</h2>
            <label>
                User Name:
                <input
                    type="text"
                    name="userName"
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                />
            </label>
            { error && <p>{error}</p>}
            <input type="submit" value="Login" />
        </form>
    )
}