import {memo, useMemo} from 'react';
import PhoneLinkBox from './PhoneLinkBox';
import Image from 'next/image';
import styles from '../../styles/account/PhoneMockup.module.css';

const PhoneMockup = ({links}) => {

    const linkBoxes = useMemo(() => {
        if(!links) return;

        return links.map((link, i) => {
            return(
                <PhoneLinkBox link={link} links={links} index={i} key={link.id} />
            )
        })
    }, [links])



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