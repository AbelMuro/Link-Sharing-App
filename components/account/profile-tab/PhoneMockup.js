import {useMemo} from 'react';
import PhoneLinkBox from './PhoneLinkBox';
import styles from '../../../styles/account/profile-tab/PhoneMockup.module.css';

export default function PhoneMockup({userLinks}) {

    const showLinks = useMemo(() => {
        return userLinks.map((link, i) => {
            return <PhoneLinkBox platform={link.platform} key={i}/>;
        })
    }, [userLinks])

    return(                
        <div className={styles.container}>
            <div className={styles.phoneContainer}>
                <img src={'/images/illustration-phone-mockup.svg'} className={styles.phoneMockup}/>
                <div className={styles.phoneLinksContainer}>
                    {showLinks}
                </div>                
            </div>
        </div> 
    )
}