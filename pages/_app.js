import {createContext, useState, useReducer} from 'react';
import linksReducer from '../reducers/linksReducer';
import '../styles/global/styles.css';

export const Context = createContext();

export default function MyApp({Component, pageProps}) {
    const [uid, setUid] = useState('');
    const [openLoginMessage, setOpenLoginMessage] = useState(false);
    const [link, setLink] = useState('links');
    const [usersLinks, dispatch] = useReducer(linksReducer, []);


    const value = {
        uid,
        setUid,
        usersLinks,
        dispatch,
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