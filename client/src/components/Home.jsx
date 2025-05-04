import { useEffect, useState } from 'react'
import { useLogin } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { getAllUsers } from '../services/user.service'


export const Home = () => {
    const navigate = useNavigate()
    const { isLoggedIn } = useLogin()
    const [ users, setUsers ] = useState( [] )

    useEffect( ()=>{
        if( !isLoggedIn ){
            navigate('/login')
        }
        else{
            getAllUsers()
                .then( USERS => setUsers( USERS ) )
                .catch( error => console.error('Error Fetching Users(Home.jsx):', error) )
        }
    },[isLoggedIn, navigate] )

    if ( isLoggedIn )return(//This can only be viewed by those that are logged in. If not logged in they will be redirected.
        <div>
            <h2>Welcome to Our Secret Lair</h2>
            {
                users.map( ({_id, userName, secretText})=>(
                    <div key={_id}>
                        <p>User Name: {userName}</p>
                        <p>My Secret: {secretText}</p>
                        <hr />
                    </div>
                ) )
            }
        </div>
    )
}