import {createContext, useState} from 'react';
import '../styles/global/styles.css';

export const Context = createContext();

export default function MyApp({Component, pageProps}) {
    const [openLoginMessage, setOpenLoginMessage] = useState(false);

    const value = {
        openLoginMessage,
        setOpenLoginMessage
    }

    return(
        <Context.Provider value={value}>
            <Component {...pageProps}/>        
        </Context.Provider>

        )

}