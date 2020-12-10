import React, { useState } from 'react';

export const AnimationContext = React.createContext();

export default function AnimationContextProvider({ children }) {
    const [modelPosition, setModelPosition] = useState([0,0])
    
    return (
        <AnimationContext.Provider
            value={{
                modelPosition, setModelPosition
            }}
        >
            {children}
        </AnimationContext.Provider>
    );
}