import styles from '../../../styles/account/profile-tab/ProfileDetails.module.css';
import UploadImage from './UploadImage';

export default function ProfileDetails({profile}) {
    return(
        <section className={styles.container}>
            <h1 className={styles.title}>
                Profile Details
            </h1>
            <p className={styles.desc}>
                Add your details to create a personal touch to your profile.
            </p>
            <UploadImage/>
            <div className={styles.buttonContainer}>
                <input type='submit' value='Save' className={styles.submitButton}/>
            </div>
        </section>
    )
}