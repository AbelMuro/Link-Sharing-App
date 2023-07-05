import {useContext, useEffect, useRef} from 'react';
import {Context} from '../../pages/_app';
import styles from '../../styles/authorization/LoginMessageDialog.module.css';

export default function LoginMessageDialog() {
    const {openLoginMessage, setOpenLoginMessage} = useContext(Context);
    const dialogRef = useRef();

    useEffect(() => {
        if(openLoginMessage) {
            dialogRef.current.style.display = 'block';
            setTimeout(() => {
                if(!dialogRef.current) return;
                dialogRef.current.style.top = '10px';
            }, 10)

            setTimeout(() => {
                setOpenLoginMessage(false);
            }, 3000)
        }
        else{
            dialogRef.current.style.top = '';
            setTimeout(() => {
                if(!dialogRef.current) return;
                dialogRef.current.style.display = ''
            }, 200)
        }
    }, [openLoginMessage])

    return(
        <dialog className={styles.container} ref={dialogRef}>
            You can login now!
        </dialog>
    )
}