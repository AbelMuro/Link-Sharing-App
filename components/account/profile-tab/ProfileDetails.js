import {useContext, useState} from 'react';
import {Context} from '../../../pages/_app';
import {db, storage} from '../../../firebase/Configuration';
import {ref, uploadBytes} from 'firebase/storage';
import {doc, setDoc} from 'firebase/firestore';
import styles from '../../../styles/account/profile-tab/ProfileDetails.module.css';
import UploadImage from './UploadImage';
import BasicDetails from './BasicDetails';
import { CircularProgress } from '@mui/material';


export default function ProfileDetails() {
    const {uid, setOpenSaveChangesMessage} = useContext(Context);
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setLoading(true);
            const newAvatarFile = e.target.elements.profileAvatar.files[0];
            if(newAvatarFile){
                const avatarRef = ref(storage, `/${uid}/usersAvatar`); 
                await uploadBytes(avatarRef, newAvatarFile);         
            }

            const newFirstName = e.target.elements.firstName.value;
            const newLastName = e.target.elements.lastName.value;
            const newEmail = e.target.elements.email.value;
            const docRef = doc(db, `${uid}/profileDetails`);
            await setDoc(docRef, {
                avatar: newAvatarFile ? newAvatarFile.name : '',
                firstName: newFirstName,
                lastName: newLastName,
                email: newEmail,
            });        
            setOpenSaveChangesMessage(true);    
            setLoading(false);
        }catch(error){
            setLoading(false);
            console.log(error);
        }

    }

    return(
        <form className={styles.container} onSubmit={handleSubmit}>
            <h1 className={styles.title}>
                Profile Details
            </h1>
            <p className={styles.desc}>
                Add your details to create a personal touch to your profile.
            </p>
            <UploadImage />
            <BasicDetails />
            <div className={styles.buttonContainer}>
                <button className={styles.submitButton}>
                    {loading ? <CircularProgress size='33px'/> : 'Save'}
                </button>
            </div>
        </form>
    )
}