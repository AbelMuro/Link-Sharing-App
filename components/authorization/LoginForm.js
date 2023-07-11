import {useRef, useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styles from '../../styles/authorization/LoginForm.module.css';
import Input from './Input';
import {auth} from '../../firebase/Configuration';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useRouter} from 'next/navigation'


export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const email = useRef();
    const password = useRef();
    const errorMessageRef = useRef();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        errorMessageRef.current.style.display = '';
        
        try{
            const userEmail = email.current.state;
            const userPassword = password.current.state;
            await signInWithEmailAndPassword(auth, userEmail, userPassword);
            setLoading(false);
            router.push('/account');
        }
        catch(error){
            console.log(error)
            errorMessageRef.current.style.display = 'block';
            setLoading(false);
        }
    }

    return(
        <form className={styles.container} onSubmit={handleSubmit}>
            <Input label='Email address' 
                type='email' 
                icon='/icons/icon-email.svg'
                error="Not valid email"
                placeholder='e.g. alex@email.com'
                ref={email}
                />
            <Input label='Password' 
                type='password' 
                icon='/icons/icon-password.svg'
                error='Please check again'
                placeholder='Enter your password'
                ref={password}
                />
            <button className={styles.submitButton}>
                {loading ? <CircularProgress/> : 'Login'}
            </button>
            <p className={styles.errorMessage} ref={errorMessageRef}>
                Email or password is incorrect
            </p>
        </form>
    )
}