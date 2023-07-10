import {useContext, useEffect, useRef} from 'react';
import {Context} from '../../pages/_app';
import styles from '../../styles/account/ChangedSavedDialog.module.css';

export default function ChangedSavedDialog(){
    const {openSaveChangesMessage, setOpenSaveChangesMessage} = useContext(Context);
    const dialogRef = useRef();

    useEffect(() => {
        if(openSaveChangesMessage){
            dialogRef.current.style.display = 'flex';
            setTimeout(() => {
                if(!dialogRef.current) return;
                dialogRef.current.style.bottom = '40px'
            }, 10)
            setTimeout(() => {
                setOpenSaveChangesMessage(false)
            }, 4000)
        }
        else{
            dialogRef.current.style.bottom = '';
            setTimeout(() => {
                if(!dialogRef.current) return;
                dialogRef.current.style.display = '';
            }, 2000)
        }
    }, [openSaveChangesMessage])

    return(       
        <dialog className={styles.changesSavedDialog} ref={dialogRef}>
            <img src={'/icons/icon-changes-saved.svg'} className={styles.changesSavedIcon} />Your changes have been successfully saved!
        </dialog>    
     )
}