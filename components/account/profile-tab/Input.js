import styles from '../../../styles/account/profile-tab/Input.module.css'

export default function Input({type, label, ...rest}) {
    return(
        <fieldset className={styles.container}>
            <label className={styles.label} htmlFor={label}>
                {label}
            </label>
            <div className={styles.input_container}>
                <input type={type} className={styles.input} {...rest} id={label}/>    
                <div className={styles.errorMessage}>
                    Can't be empty
                </div>                     
            </div>
        </fieldset>

    )
}