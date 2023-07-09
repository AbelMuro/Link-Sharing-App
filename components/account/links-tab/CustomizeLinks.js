import {useMemo, useContext, useEffect, useRef} from 'react';
import {Context} from '../../../pages/_app';
import {v4 as uuid} from 'uuid'
import CustomizeLink from './CustomizeLink';
import styles from '../../../styles/account/links-tab/CustomizeLinks.module.css'
import {db} from '../../../firebase/Configuration';
import {doc, updateDoc} from 'firebase/firestore';  

export default function CustomizeLinks() {
    const {uid, usersLinks, dispatch, setOpenSaveChangesMessage} = useContext(Context);
    const addLinkButton = useRef();

    const addLink = async () => {
        const newLink = {
            id: uuid(),
            platform: 'Github',
            link: '',
            order: usersLinks.length + 1,
        }
        dispatch({type: 'add link', link: newLink}); 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();       
        const linkDoc = doc(db, `${uid}/userLinks`);
        await updateDoc(linkDoc, {links: usersLinks});
        setOpenSaveChangesMessage(true);
    }

    const showLinks = useMemo(() => {
        return usersLinks.map((link, i) => {
            return(
                <CustomizeLink link={link} index={i} key={link.id}/>                           
            )
        })
    }, [usersLinks])


    useEffect(() => {
        addLinkButton.current.disabled = usersLinks.length >= 5 ? true : false;
    }, [usersLinks])



    return(      
        <form className={styles.container} onSubmit={handleSubmit}>
            <h1 className={styles.title}>
                Customize your links
            </h1>
            <p className={styles.desc}>
                Add/edit/remove links below and then share all your profiles with the world
            </p>
            <fieldset className={styles.allLinks}>
                <button type='button' className={styles.addLinkButton} onClick={addLink} ref={addLinkButton}> 
                    + Add new link
                </button>                
                {showLinks.length ? showLinks : 
                    <div className={styles.emptyMessage}>
                        <img src={'/images/illustration-empty.svg'} className={styles.emptyIcon}/>
                        <h1 className={styles.emptyMessageTitle}>
                            Let's get you started
                        </h1>
                        <p className={styles.emptyMessageDesc}>
                            Use the “Add new link” button to get started. 
                            Once you have more than one link, you can reorder and edit them. 
                            We’re here to help you share your profiles with everyone!
                        </p>
                    </div>
                }
            </fieldset>                    
            <section className={styles.submit_container}>
                <input type='submit' value='Save' className={styles.submit}/> 
            </section>  
        </form>                
    )
}