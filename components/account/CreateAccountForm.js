import styles from '../../styles/account/CreateAccountForm.module.css'
import Input from './Input';

export default function CreateAccountForm() {
    return(
        <form className={styles.container}>
            <Input label='Email address' 
                type='email' 
                icon='/icons/icon-email.svg' 
                error='Not valid email'
                placeholder='e.g. alex@email.com'/>
            <Input label='Create password' 
                type='password' 
                icon='/icons/icon-password.svg' 
                error='Please check again'
                placeholder='At least 8 characters'/>
            <Input label='Confirm password' 
                type='password' 
                icon='/icons/icon-password.svg' 
                error='Please check again'
                placeholder='At least 8 characters'/>
            <p className={styles.requirement}>
                Password must contain at least 8 characters
            </p>
            <input type='submit' value='Create new account' className={styles.submitButton}/>
        </form>
    )
}