import { createContext, useState, useEffect, useContext } from "react";
import { getProfile } from "../services/user.service";

const UserContext = createContext();

export const useLogin = () => useContext(UserContext);

export function UserContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn]   = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // On mount, try to fetch profile
    useEffect(() => {
        getProfile()
            .then(user => {
                setCurrentUser(user);
                setIsLoggedIn(true);
            })
            .catch(() => {
                setCurrentUser(null);
                setIsLoggedIn(false);
            });
    }, []);

    const login = ()   => setIsLoggedIn(true);
    const logout = ()  => {
        setIsLoggedIn(false);
        setCurrentUser(null);
    };

    return (
        <UserContext.Provider value={{ isLoggedIn, currentUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
