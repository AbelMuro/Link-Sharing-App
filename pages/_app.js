import {createContext, useState} from 'react';
import '../styles/global/styles.css';

export const Context = createContext();

export default function MyApp({Component, pageProps}) {
    const [userId, setUserId] = useState('');
    const [openLoginMessage, setOpenLoginMessage] = useState(false);
    const [link, setLink] = useState('links');

    const value = {
        userId,
        setUserId,
        openLoginMessage,
        setOpenLoginMessage,
        link,
        setLink
    }

    return(
        <Context.Provider value={value}>
            <Component {...pageProps}/>        
        </Context.Provider>
    )

}