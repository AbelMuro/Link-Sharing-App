import {useState, useRef, useContext} from 'react'
import { Context } from '../../pages/_app';
import Input from './Input';
import styles from '../../styles/authorization/CreateAccountForm.module.css'
import {auth, db} from '../../firebase/Configuration';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';
import { CircularProgress } from '@mui/material';


export default function CreateAccountForm({setLoginOrCreateAccount}) {
    const {setOpenLoginMessage} = useContext(Context);
    const [loading, setLoading] = useState(false)
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const notEightCharactersMessage = useRef();
    const passwordsDontMatch = useRef();
    const emailAlreadyExists = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const userEmail = email.current.state;
        const userPassword = password.current.state;
        const userConfirmPassword = confirmPassword.current.state;
 
        passwordsDontMatch.current.style.display = '';
        notEightCharactersMessage.current.style.color = ''

        if(userPassword !== userConfirmPassword) {
            passwordsDontMatch.current.style.display = 'block';
            return;
        }

        if(userPassword.length < 8){
            notEightCharactersMessage.current.style.color = '#FF3939';
            return;
        }

        try{
            await createUserWithEmailAndPassword(auth, userEmail, userPassword);
            const usersLinksDoc = doc(db, `${auth.currentUser.uid}/userLinks`);
            const profileDetailsDoc = doc(db, `${auth.currentUser.uid}/profileDetails`)
            await setDoc(usersLinksDoc, {links: []})
            await setDoc(profileDetailsDoc, {firstName: '', lastName: '', email: '', avatar: ''})
            setLoading(false)
            setLoginOrCreateAccount(true);
            setOpenLoginMessage(true)
        }
        catch(error){
            console.log(error)
            emailAlreadyExists.current.style.display = 'block';
            setLoading(false)            
        }

    }

    return(
        <form className={styles.container} onSubmit={handleSubmit}>
            <Input label='Email address' 
                type='email' 
                icon='/icons/icon-email.svg' 
                error='Not valid email'
                placeholder='e.g. alex@email.com'
                ref={email}/>
            <Input label='Create password' 
                type='password' 
                icon='/icons/icon-password.svg' 
                error='Please check again'
                placeholder='At least 8 characters'
                ref={password}/>
            <Input label='Confirm password' 
                type='password' 
                icon='/icons/icon-password.svg' 
                error='Please check again'
                placeholder='At least 8 characters'
                ref={confirmPassword}/>
            <p className={styles.requirement} ref={notEightCharactersMessage}>
                Password must contain at least 8 characters
            </p>
            <p className={styles.errorMessage} ref={passwordsDontMatch}>
                Passwords do not match
            </p>
            <p className={styles.errorMessage} ref={emailAlreadyExists}>
                Email already exists
            </p>
            <button className={styles.submitButton}> 
                {loading ? <CircularProgress size={'2.0rem'} className={styles.loading}/> : 'Create new account'}
            </button>
        </form>
    )
}