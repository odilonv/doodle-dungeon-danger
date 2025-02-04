import React, { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5001/users/session', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setUser(data));
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
