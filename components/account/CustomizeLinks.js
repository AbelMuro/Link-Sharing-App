import {useMemo, useContext, useEffect, useRef} from 'react';
import {Context} from '../../pages/_app';
import {v4 as uuid} from 'uuid'
import CustomizeLink from './CustomizeLink';
import styles from '../../styles/account/CustomizeLinks.module.css';
import {db} from '../../firebase/Configuration';
import {doc, updateDoc} from 'firebase/firestore';  

export default function CustomizeLinks() {
    const {uid, usersLinks, dispatch} = useContext(Context);
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

    const handleSubmit = (e) => {
        e.preventDefault();       
        usersLinks.forEach((link) => {
            const linkId = link.id
            const newPlatform = link.platform
            const newLink = link.link;

            async function updateDocs(){
                const linkDoc = doc(db, `${uid}/${linkId}`);
                await updateDoc(linkDoc, {
                    id: linkId,
                    platform: newPlatform,
                    link: newLink,
                })
            }
            updateDocs();
        })
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
                {showLinks}
            </fieldset>                    
            <div className={styles.submit_container}>
                <input type='submit' value='Save' className={styles.submit}/> 
            </div>
    </form>
    )
}