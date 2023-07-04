import styles from '../../styles/account/LoginForm.module.css';
import Input from './Input';

export default function LoginForm() {
    return(
        <form className={styles.container}>
            <Input label='Email address' 
                type='email' 
                icon='/icons/icon-email.svg'
                error="Not valid email"
                placeholder='e.g. alex@email.com'
                />
            <Input label='Password' 
                type='password' 
                icon='/icons/icon-password.svg'
                error='Please check again'
                placeholder='Enter your password'/>
            <input type='submit' value='Login' className={styles.submitButton}/>
        </form>
    )
}