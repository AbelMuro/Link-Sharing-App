import {useContext, useState} from 'react';
import {Context} from '../pages/_app';
import NavBar from '../components/account/NavBar';
import CustomizedLinks from '../components/account/CustomizeLinks';
import styles from '../styles/account/Account.module.css'
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '../firebase/Configuration';

export default function Account() {
    const {link, uid, setUid} = useContext(Context);

    onAuthStateChanged(auth, (currentUser) => {
        if(currentUser)
            setUid(currentUser.uid);
    })

    return(
        <main className={styles.container}>
            <NavBar/>
            {link === 'links' ? 
                uid && <CustomizedLinks/>
                : <></>}
        </main>
    )
}