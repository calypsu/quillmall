import React from 'react';

export const FormContext = React.createContext();

export default function FormContextProvider({ children }) {
    
    const something = '';

    return (
        <FormContext.Provider value={{
            something
        }}>{children}</FormContext.Provider>
    );
}