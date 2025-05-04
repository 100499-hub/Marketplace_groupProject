import { useNavigate } from 'react-router-dom'
import { register } from '../services/user.service'
import { useState } from 'react'
import { useLogin } from '../context/UserContext'


export const RegistrationForm = () => {
    const navigate = useNavigate()
    const { login } = useLogin()
    const [ errors, setErrors ] = useState({})

    const handleSubmit = e => {
        e.preventDefault()
        let { userName, password, confirmPassword, secretText } = e.target
        userName = userName.value
        confirmPassword = confirmPassword.value
        password = password.value
        secretText = secretText.value
        register({userName, password, confirmPassword, secretText}) //cookie/jwt is sent from server when registering
            .then( ()=>{
                login() //Now let login to true client side for tracking
                navigate('/home')
            })
            .catch( errors => setErrors( errors ) )
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <label>
                User Name:
                <input
                    type="text"
                    name="userName"
                />
                { errors.userName && <p>{errors.userName.message}</p> }
            </label>
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                />
                { errors.password && <p>{errors.password.message}</p> }
            </label>
            <label>
                Confirm Password:
                <input
                    type="password"
                    name="confirmPassword"
                />
                { errors.confirmPassword && <p>{errors.confirmPassword.message}</p> }
            </label>
            <label>
                Secrets to Preserve:
                <input
                    type="text"
                    name="secretText"
                />
                { errors.secretText && <p>{errors.secretText.message}</p> }
            </label>
            <input type="submit" value="Register" />
        </form>
    )
}