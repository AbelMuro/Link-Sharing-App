import Input from './Input.js';
import styles from '../../../styles/account/profile-tab/BasicDetails.module.css';

export default function BasicDetails() {
    return(
        <fieldset className={styles.container}>
            <Input type='text' label="First name*"/>
        </fieldset>
    )
}