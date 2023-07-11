import styles from '../../../styles/account/profile-tab/UploadImage.module.css';

export default function UploadImage() {
    return(
        <section className={styles.container}>
            <h1 className={styles.title}>
                Profile picture
            </h1>
            <label className={styles.uploadFileContainer} htmlFor='inputFile'>
                <input id='inputFile' type='file' className={styles.uploadFileInput}/>
                <img src={'/icons/icon-upload-image.svg'} className={styles.uploadFileIcon}/>
                + Upload Image
            </label>
            <p className={styles.desc}>
                Image must be below 1024x1024px. 
                Use PNG or JPG format.
            </p>
        </section>
    )
}