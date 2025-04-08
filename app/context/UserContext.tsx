// app/context/UserContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserContextType = {
    user: string | null;               // <-- TUTAJ
    setUser: (user: string | null) => void;  // <-- I TUTAJ
};

const UserContext = createContext<UserContextType> ({
    user: '',
    setUser: () => {},
})

export const useUser = () => useContext(UserContext);

type Props = {
    children: ReactNode;

}

export const UserProvider = ({ children}: Props) => {
    const [user, setUser] = useState<string | null>(null);

    return (
        <UserContext.Provider value = {{ user, setUser }}>
        {children}
        </UserContext.Provider>
    );

};