import {useMemo, useState,useContext, useEffect, useRef} from 'react';
import {Context} from '../../../pages/_app';
import {v4 as uuid} from 'uuid'
import CustomizeLink from './CustomizeLink';
import styles from '../../../styles/account/links-tab/CustomizeLinks.module.css'
import {db} from '../../../firebase/Configuration';
import {doc, updateDoc} from 'firebase/firestore';  
import {CircularProgress} from '@mui/material';
import useMediaQuery from '../../../hooks/useMediaQuery';

export default function CustomizeLinks() {
    const {uid, usersLinks, dispatch, setOpenSaveChangesMessage} = useContext(Context);
    const tablet = useMediaQuery('(max-width: 900px)');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const addLinkButton = useRef();

    const handleClosePopup = () => {
        setIsOpen(false);
        localStorage.setItem('linksTooltip', true)
    }

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
        let temp = []
        const hasDuplicate = usersLinks.every((link) => {
            if(!temp.includes(link.platform)){
                temp.push(link.platform)
                return true;
            }
            else
                return false
            
        })
        if(!hasDuplicate){         
            alert('You cannot have duplicate platform links');
            return;
        }

        setLoading(true);
        const linkDoc = doc(db, `${uid}/userLinks`);
        await updateDoc(linkDoc, {links: usersLinks});
        setOpenSaveChangesMessage(true);
        setLoading(false);
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


    useEffect(() => {
        if(!tablet) {
            setIsOpen(false);
            return;
        }

        const tooltipRead = localStorage.getItem('linksTooltip');
        if(tooltipRead)
            return
        else if (usersLinks.length > 1)
            setIsOpen(true);
        

    }, [usersLinks, tablet])


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
                <button className={styles.submit}> 
                    {loading ? <CircularProgress size='30px'/> : 'Save'}
                </button>
            </section> 
            {isOpen ? 
                <div className={styles.tooltip}>
                    You can Drag and Drop!
                    <button className={styles.okButton} onClick={handleClosePopup}> 
                        Got it!
                    </button>
                    <div className={styles.arrowDown}></div>
                </div> : <></>
            }     
        </form>                
    )
}