import {useContext, useEffect, useRef} from 'react';
import {Context} from '../../pages/_app';
import styles from '../../styles/preview/CopiedToClipboardMessage.module.css'

export default function CopiedToClipboardMessage() {
    const {openCopiedToClipboardMessage, setOpenCopiedToClipboardMessage} = useContext(Context);
    const dialogRef = useRef();

    useEffect(() => {
        if(openCopiedToClipboardMessage){
            dialogRef.current.style.display = 'flex'    
            setTimeout(() => {
                if(!dialogRef.current) return;
                dialogRef.current.style.bottom = '56px';
            }, 10)        
            setTimeout(() => {
                setOpenCopiedToClipboardMessage(false);
            },4000)
        }
        else{
            dialogRef.current.style.bottom = '';
            setTimeout(() => {
                dialogRef.current.style.display = '' ;
            }, 200)   
        }
    },[openCopiedToClipboardMessage])

    return(
        <dialog className={styles.container} ref={dialogRef}>
            <img src={'/icons/icon-link.svg'} className={styles.linkIcon}/>
            The link has been copied to your clipboard
        </dialog>
    )
}