import {useContext, useMemo, useEffect, useRef} from 'react'
import {Context} from '../../pages/_app';
import NavBar from './NavBar';
import {db, storage} from '../../firebase/Configuration'; 
import {doc} from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import styles from '../../styles/preview/DisplayProfile.module.css';
import linkStyles from '../../styles/account/PhoneLinkBox.module.css';
import useMediaQuery from '../../hooks/useMediaQuery';

export default function Preview() {
    const {uid, setOpenCopiedToClipboardMessage} = useContext(Context);
    const mobile = useMediaQuery('(max-width: 600px)');
    const avatarRef = useRef();
    const linksRef = doc(db, `${uid}/userLinks`);
    const profileRef = doc(db, `${uid}/profileDetails`);
    const [allLinks, loadingLinks, err] = useDocumentData(linksRef);
    const [profile, loadingProfile, error] = useDocumentData(profileRef);

    const showLinks = useMemo(() => {
        if(loadingLinks) return;
        return allLinks.links.map((link, i) => {
            const platformTitle = link.platform.toLowerCase().replace(' ', '').replace('.', '');
            return(
                <a className={[linkStyles.linkBox, linkStyles[platformTitle]].join(' ')} 
                    style={{cursor: 'pointer', height: '56px'}} 
                    key={i}
                    href={link.link}
                    target='_blank'>
                    <img className={linkStyles.linkIcon} src={`/icons/icon-link-boxes/icon-${platformTitle}-link-box.svg`}/>
                    {link.platform}
                    <img className={linkStyles.linkArrow} src={platformTitle === 'frontendmentor' ? '/icons/icon-arrow-right-dark.svg' : '/icons/icon-arrow-right.svg'}/>
                </a>
            )
        })
    }, [allLinks, loadingLinks])

    useEffect(() => {   
        const reference = ref(storage, `${uid}/usersAvatar`);    
        getDownloadURL(reference)
            .then((url) => {
                avatarRef.current.src = url
            })  
            .catch((error) => {
                avatarRef.current.src = '/images/placeholder-image.png'
            })      
    }, [])   

    useEffect(() => {
        const body = document.body;        
        if(mobile)
            body.style.backgroundColor = 'white';            
        else
            body.style.backgroundColor = '';  
        return () => {
            body.style.backgroundColor = '';  
        }
    }, [mobile])

    return(
        <main>
            <header className={styles.header}>
                {loadingProfile ? <></> : <NavBar userName={`${profile.firstName}${profile.lastName}`} uid={uid} setOpenCopiedToClipboardMessage={setOpenCopiedToClipboardMessage}/>}
                <section className={styles.profile}>
                    <img className={styles.avatar} ref={avatarRef}/>
                    <h1 className={styles.title}>
                        {loadingProfile ? <></> : profile.firstName + " " + profile.lastName}
                    </h1>
                    <h2 className={styles.email}>
                        {loadingProfile ? <></> : profile.email}
                    </h2>
                    <div className={styles.links}>
                        {showLinks}
                    </div>
                </section> 
            </header>
        </main>
    )
}

export function getStaticProps(context){

}