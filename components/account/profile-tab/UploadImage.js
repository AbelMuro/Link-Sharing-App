import {useState, useRef} from 'react';
import styles from '../../../styles/account/profile-tab/UploadImage.module.css';

export default function UploadImage() {
    const [imageUrl, setImageUrl] = useState();
    const messageRef = useRef();

    const handleImage = (e) => {
        const uploadedImage = e.target.files[0];
        if(!uploadedImage) return;
        const url = URL.createObjectURL(uploadedImage);
        let imageWidth = 0;
        let imageHeight = 0;

        const image = new Image();
        image.onload = function () {
            imageWidth = this.width;
            imageHeight = this.height;
        }
        image.src = url;

        if(imageWidth > 1024 || imageHeight > 1024){
            messageRef.current.style.color = '#FF3939';      
            return;      
        }
        else
            messageRef.current.style.color = '';

        setImageUrl(url);
    }

    return(
        <section className={styles.container}>
            <h1 className={styles.title}>
                Profile picture
            </h1>
            <label className={styles.uploadFileContainer} 
                htmlFor='inputFile' 
                style={{backgroundImage: `url(${imageUrl})`}}>
                <input 
                    id='inputFile' 
                    type='file' 
                    onChange={handleImage}
                    accept='image/png, image/jpeg' 
                    className={styles.uploadFileInput}
                    />
                <img src={'/icons/icon-upload-image.svg'} className={styles.uploadFileIcon}/>
                + Upload Image
            </label>
            <p className={styles.desc} ref={messageRef}>
                Image must be below 1024x1024px. 
                Use PNG or JPG format.
            </p>
        </section>
    )
}