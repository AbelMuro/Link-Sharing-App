import {useState, useContext} from 'react';
import {useRouter} from 'next/router';
import {Context} from '../pages/_app';
import NavBar from '../components/account/NavBar';
import LinksTab from '../components/account/links-tab/LinksTab';
import ProfileTab from '../components/account/profile-tab/ProfileTab'
import styles from '../styles/account/Account.module.css'
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '../firebase/Configuration';
import ChangesSavedDialog from '../components/account/ChangesSavedDialog';

export default function Account() {
    const {uid, setUid} = useContext(Context);
    const [currentTab, setCurrentTab] = useState('links');
    const router = useRouter();

    onAuthStateChanged(auth, (currentUser) => {
        if(currentUser)
            setUid(currentUser.uid);
        else
            router.push('/');
    })

    return(
        <>
            <main className={styles.container}>
                <NavBar currentTab={currentTab} setCurrentTab={setCurrentTab}/>
                {currentTab === 'links' ? 
                    uid && <LinksTab/>
                    : uid && <ProfileTab/>}
            </main> 
            <ChangesSavedDialog/>          
        </>

    )
}