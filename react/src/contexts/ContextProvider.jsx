import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    cart: [],
    setUser: () => {},
    setToken: () => {},
    setCart: () => {}
})

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [notification, _setNotification] = useState('');
    const [cart, _setCart] = useState([]);

    const setNotification = (message) => {
        console.log('message', message)
        _setNotification(message);

        setTimeout(() => {
            _setNotification('')
        }, 5000)
    }

    const setToken = (token) => {
        _setToken(token);
        
        if(token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const setCart = (cart) => {
        _setCart(cart)
    }

    return (
        <StateContext.Provider value={{ user, token, notification, setUser, setToken, setNotification, cart, setCart }}>
            {children}
        </StateContext.Provider>
    ) 
}

export const useStateContext = () => useContext(StateContext);