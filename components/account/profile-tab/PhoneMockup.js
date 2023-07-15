import {useMemo, useContext, useRef, useEffect} from 'react';
import {Context} from '../../../pages/_app';
import { storage, db } from '../../../firebase/Configuration';
import {ref, getDownloadURL} from 'firebase/storage';
import {doc} from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import PhoneLinkBox from './PhoneLinkBox';
import styles from '../../../styles/account/profile-tab/PhoneMockup.module.css';

export default function PhoneMockup({userLinks}) {
    const {uid} = useContext(Context);
    const profileDocRef = doc(db, `${uid}/profileDetails`);
    const [profileDetails, loadingProfile, err] = useDocumentData(profileDocRef);
    const avatarRef = useRef();

    const showLinks = useMemo(() => {
        return userLinks.map((link, i) => {
            return <PhoneLinkBox platform={link.platform} key={i}/>;
        })
    }, [userLinks])

    useEffect(() => {
        if(loadingProfile) return;

        const reference = ref(storage, `/${uid}/usersAvatar`);
        getDownloadURL(reference)
            .then((url) => {
                if(!url) throw new Error('no avatar')
                avatarRef.current.src = url;
            })    
            .catch((error) => {
                console.log('no avatar available')
            })      
    }, [profileDetails, loadingProfile])

    return(                
        <div className={styles.container}>
            <div className={styles.phoneContainer}>
                <img src={'/images/illustration-phone-mockup.svg'} className={styles.phoneMockup}/>
                {loadingProfile ? <></> : <img className={styles.avatar} ref={avatarRef} style={profileDetails.avatar ? {} : {visibility: 'hidden'}}/>}
                {loadingProfile ? <></> :  profileDetails.firstName && <h1 className={styles.name}>{profileDetails.firstName}&nbsp;{profileDetails.lastName}</h1>}
                {loadingProfile ? <></> :  profileDetails.email && <h2 className={styles.email}>{profileDetails.email}</h2>}
                <div className={styles.phoneLinksContainer}>
                    {showLinks}
                </div>                
            </div>
        </div> 
    )
}