import {useState} from 'react';
import Image from 'next/image';
import styles from '../styles/account/Account.module.css';
import LoginForm from '../components/account/LoginForm';
import CreateAccountForm from '../components/account/CreateAccountForm';

export default function Account() {
    const [loginOrCreateAccount, setLoginOrCreateAccount] = useState(true);


    const changePage = () => {
        setLoginOrCreateAccount(!loginOrCreateAccount);
    }

    return(
        <main className={styles.loginContainer}>
            <Image src={'/icons/logo-devlinks-large.svg'} 
                width='0' height='0'
                alt='dev links'
                className={styles.logo}/>
                {loginOrCreateAccount ? 
                    <section className={styles.login}>
                        <h1 className={styles.login_title}>
                            Login
                        </h1>
                        <p className={styles.login_desc}>
                            Add your details below to get back into the app
                        </p>
                        <LoginForm/>
                        <p className={styles.message}>
                            Don't have an account? &nbsp;
                            <button onClick={changePage} className={styles.messageButton}> 
                                Create account
                            </button>
                        </p>                    
                    </section>                
                : <section className={styles.createAccountContainer}>
                    <h1 className={styles.createAccount_title}>
                        Create account
                    </h1>
                    <p className={styles.createAccount_desc}>
                        Let’s get you started sharing your links!
                    </p>
                    <CreateAccountForm />
                    <p className={styles.message}>
                        Already have an account? &nbsp;
                        <button onClick={changePage} className={styles.messageButton}> 
                            Login
                        </button>
                    </p>
                </section>}


        </main>
    )
}