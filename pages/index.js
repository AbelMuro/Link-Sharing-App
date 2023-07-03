import Image from 'next/image';
import styles from '../styles/Login/Login.module.css';
import LoginForm from '../components/login/LoginForm';

export default function Login() {
    return(
        <main className={styles.container}>
            <Image src={'/icons/logo-devlinks-large.svg'} 
                width='0' height='0'
                alt='dev links'
                className={styles.logo}/>
                <section className={styles.login}>
                    <h1 className={styles.title}>
                        Login
                    </h1>
                    <p className={styles.desc}>
                        Add your details below to get back into the app
                    </p>
                    <LoginForm/>
                </section>
        </main>
    )
}