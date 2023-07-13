import {useContext} from 'react';
import {Context} from '../../../pages/_app';
import {db, storage} from '../../../firebase/Configuration';
import {ref, uploadBytes} from 'firebase/storage';
import {doc, setDoc} from 'firebase/firestore';
import styles from '../../../styles/account/profile-tab/ProfileDetails.module.css';
import UploadImage from './UploadImage';
import BasicDetails from './BasicDetails';


export default function ProfileDetails({profile}) {
    const {uid, setOpenSaveChangesMessage} = useContext(Context);

    const handleSave = () => {
        setOpenSaveChangesMessage(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
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
        }catch(error){
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
            <UploadImage initialState={profile.avatar}/>
            <BasicDetails />
            <div className={styles.buttonContainer}>
                <input type='submit' value='Save' className={styles.submitButton} onClick={handleSave}/>
            </div>
        </form>
    )
}