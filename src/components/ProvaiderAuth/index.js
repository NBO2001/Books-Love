import React, { useState, useMemo } from "react";
import {authContext} from '../../authContext';

const ProvaiderAuth = ({ children }) => {
    
    const [ auth, setAuth ] = useState({ login: false})

    const authValues = useMemo(() => ({auth, setAuth}), [auth, setAuth])

    return(
        <authContext.Provider value={authValues}>
            { children }
        </authContext.Provider>
    )
}

export default ProvaiderAuth
