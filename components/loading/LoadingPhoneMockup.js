import styles from '../../styles/loading/LoadingPhoneMockup.module.css';

export default function LoadingPhoneMockup() {
    return(
        <section className={styles.container}>
            <img className={styles.phone} src={'/images/illustration-phone-mockup.svg'}/>
        </section>
    )
}