import { useState, useContext, createContext } from "react"

const UserContext = createContext(  )

export const useLogin = ()=> useContext( UserContext )

export const UserContextProvider = ( { children } ) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState( false )
    // We will use this boolean to track whether or not someone is logged in.
    // This can be manipulated with the dev tools. However, all pages that we wish to hide from people that aren't logged in require credential when making the API requests. So even if they try to hack it they will won't be able to see anything that they shouldn't.

    const login = () => {
        setIsLoggedIn( true )
    }

    const logout = () => {
        setIsLoggedIn( false )
    }


    return(
        <UserContext.Provider value={{ isLoggedIn, login, logout }}>
            { children }
        </UserContext.Provider>
    )
}