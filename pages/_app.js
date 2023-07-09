import {createContext, useState, useReducer} from 'react';
import linksReducer from '../reducers/linksReducer';
import '../styles/global/styles.css';

export const Context = createContext();

export default function MyApp({Component, pageProps}) {
    const [uid, setUid] = useState('');                                 //the user's account id
    const [usersLinks, dispatch] = useReducer(linksReducer, []);        //usersLinks contains ALL of the user's links
    const [openLoginMessage, setOpenLoginMessage] = useState(false);    //a dialog box that appears that will give the user a message
    const [openSaveChangesMessage, setOpenSaveChangesMessage] = useState(false); 

    const value = {
        uid,
        setUid,
        usersLinks,
        dispatch,
        openLoginMessage,
        setOpenLoginMessage,
        openSaveChangesMessage, 
        setOpenSaveChangesMessage
    }

    return(
        <Context.Provider value={value}>
            <Component {...pageProps}/>        
        </Context.Provider>
    )

}