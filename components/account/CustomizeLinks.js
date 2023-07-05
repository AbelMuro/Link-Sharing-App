import Image from 'next/image';
import styles from '../../styles/account/CustomizeLinks.module.css';

export default function CustomizedLinks(){
    return(
        <>
            <section className={styles.container}>
                <div className={styles.phone_container}>
                    <Image src={'/images/illustration-phone-mockup.svg'}
                        width='0' height='0'
                        alt='phone mockup'
                        className={styles.phone_mockup}/>
                </div>
            </section>
            <section className={styles.container}>
                <h1 className={styles.title}>
                    Customize your links
                </h1>
                <p className={styles.desc}>
                    Add/edit/remove links below and then share all your profiles with the world
                </p>
                <button className={styles.addLinkButton}> 
                    + Add new link
                </button>
            </section>
        </>
    )
}