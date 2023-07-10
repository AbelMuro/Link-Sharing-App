import {useContext, useMemo} from 'react';
import PhoneLinkBox from './PhoneLinkBox';
import {Context} from '../../../pages/_app';
import styles from '../../../styles/account/profile-tab/PhoneMockup.module.css';

export default function PhoneMockup() {
    const {usersLinks} = useContext(Context);

    const showLinks = useMemo(() => {
        return usersLinks.map((link) => {
            console.log(link)
            return <PhoneLinkBox platform={link.platform}/>;
        })
    }, [usersLinks])

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