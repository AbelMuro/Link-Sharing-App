import {memo, useMemo, useContext} from 'react';
import {Context} from '../../pages/_app';
import PhoneLinkBox from './PhoneLinkBox';
import Image from 'next/image';
import styles from '../../styles/account/PhoneMockup.module.css';

const PhoneMockup = () => {
    const {usersLinks} = useContext(Context);

    const linkBoxes = useMemo(() => {
        return usersLinks.map((link, i) => {
            return(
                <PhoneLinkBox link={link} index={i} key={link.id}/>
            )
        })
    }, [usersLinks])

    return(
        <section className={styles.container}>
            <div className={styles.phone_container}>
                <Image src={'/images/illustration-phone-mockup.svg'}
                    width='0' height='0'
                    alt='phone mockup'
                    priority
                    className={styles.phone_mockup}/>
                <div className={styles.linkBoxes}>
                    {linkBoxes}
                </div>
            </div>
        </section>
    )
}

export default memo(PhoneMockup);