import {useContext, useMemo} from 'react'
import {Context} from '../pages/_app';
import {db, storage} from '../firebase/Configuration'; 
import {doc} from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import styles from '../styles/Preview.module.css';
import linkStyles from '../styles/account/PhoneLinkBox.module.css'


export default function Preview() {
    const {uid} = useContext(Context);
    const docRef = doc(db, `${uid}/userLinks`);
    const [allLinks, loadingLinks, err] = useDocumentData(docRef);


    const showLinks = useMemo(() => {
        if(loadingLinks) return;

        return allLinks.links.map((link) => {
            const platformTitle = link.platform.toLowerCase().replace(' ', '').replace('.', '');

            return(
                <a className={[linkStyles.linkBox, linkStyles[platformTitle]].join(' ')} style={{cursor: 'initial'}}>
                    <img className={linkStyles.linkIcon}/>
                    {link.platform}
                    <img className={linkStyles.linkArrow}/>
                </a>
            )
        })
    }, [allLinks, loadingLinks])

    return(
        <main>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <button className={styles.editorButton}> 
                        Back to Editor
                    </button>
                    <button className={styles.shareButton}> 
                        Share Link
                    </button>                    
                </nav>
                <section className={styles.profile}>
                    <img className={styles.avatar}/>
                    <h1 className={styles.title}>
                        Ben Wright
                    </h1>
                    <h2 className={styles.email}>
                        ben@example.com
                    </h2>

                    <div className={styles.links}>
                        {showLinks}
                    </div>

                </section>
            </header>
        </main>
    )
}