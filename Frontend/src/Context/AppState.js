import React, { useEffect, useReducer, useState } from 'react'
import AppReducer from './AppReducer'
import AppContext from './AppContext'
import { SET_USER } from './AppType'
import { authorizeMe } from '../service'

export const AppState = (props) => {
    let initialState = { user: null, location: null }
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const [auth, setAuth] = useState(true);

    useEffect(() => {
        if (localStorage.getItem("demoUser")) {
            let user = JSON.parse(localStorage.getItem("demoUser"))
            setUser(user);
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem("demoUser")) setAuth(true);
        else setAuth(false)
    }, [state.user]);


    const setUser = (user) => {
        localStorage.setItem("demoUser", JSON.stringify(user));
        setAuth(true);
        console.log("user.token", user.token);
        authorizeMe(user.token);
        dispatch({ type: SET_USER, payload: user });
    };

    return (
        <AppContext.Provider
            value={{
                user: state.user,
                auth,
                setAuth,
                setUser,
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}
