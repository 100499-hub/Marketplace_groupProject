import { Link } from 'react-router-dom'
import { useLogin } from '../context/UserContext'
import { logout } from '../services/user.service'
import { useNavigate } from 'react-router-dom'


export const Header = () => {
    const navigate = useNavigate()
    const { isLoggedIn, logout:userLogout } = useLogin()

    const handleLogout = async () => {
        try{
            await logout() //logout server side by clearing cookie/jwt
            userLogout()    //logout client side by toggling boolean
            navigate('/login') //Begone cookieless person
        } catch( error ){ console.error('Logout Failed:', error) }
    }
    return(
        <div>
            <h1>The JWT App</h1>
            <Link to={'/'} >Home</Link>
            {
                isLoggedIn
                    ? <button onClick={handleLogout}>Logout</button>
                    : <>
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/register'}>Register</Link>
                    </>
            }
        </div>
    )
}