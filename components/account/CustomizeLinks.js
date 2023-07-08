import {useMemo, useContext, useEffect, useRef} from 'react';
import {Context} from '../../pages/_app';
import {v4 as uuid} from 'uuid'
import PlaformSelectBox from './PlatformSelectBox';
import LinkInput from './LinkInput';
import PhoneMockup from './PhoneMockup';
import styles from '../../styles/account/CustomizeLinks.module.css';
import {db} from '../../firebase/Configuration';
import {collection, doc, setDoc, deleteDoc, updateDoc, query, orderBy} from 'firebase/firestore';    
import {useCollectionData} from 'react-firebase-hooks/firestore';    
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"  


export default function CustomizedLinks(){
    const {uid} = useContext(Context);
    const collectionRef = collection(db, uid);
    const q = query(collectionRef, orderBy('order'));
    const [links, loading, error] = useCollectionData(q);
    const addLinkButton = useRef();

    const addLink = async () => {
        const newLink = {
            id: uuid(),
            platform: 'Github',
            link: '',
            order: links.length + 1
        }
        const newDoc = doc(db, uid, newLink.id);
        await setDoc(newDoc, newLink);
    }

    const removeLink = async (e) => {
        const linkID = e.target.id;
        const docRef = doc(db, `${uid}/${linkID}`);
        await deleteDoc(docRef)
    }


    const handleSubmit = (e) => {
        e.preventDefault();       
        const updatedLinks = e.target.elements.linkContainer;
        Array.from(updatedLinks).map((link) => {
            const linkId = link.getAttribute('id')
            const newPlatform = link.querySelector('[name=platform]').getAttribute('data-platform');
            const newLink = link.querySelector('[name=url]').value;

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
        if(loading) return;

        return links.map((link, i) => {
            return(
                <fieldset className={styles.link_container} key={link.id} name='linkContainer' id={link.id}>
                    <h1 className={styles.link_title}>
                        {`= Link #${i + 1}`}
                    </h1>
                    <button type='button' className={styles.link_remove} onClick={removeLink} id={link.id}>
                        Remove
                    </button>
                    <PlaformSelectBox initialState={link.platform} zIndex={1000-i}/>
                    <LinkInput initialState={link.link} />                       
                </fieldset>                            
            )
        })
    }, [links, loading])

    useEffect(() => {
        if(loading) return;
        addLinkButton.current.disabled = links.length >= 5 ? true : false;
    }, [loading, links])


    return(
        <>
            <DndProvider backend={HTML5Backend}>  
                <PhoneMockup links={links}/>
            </DndProvider>
            <form className={styles.container} onSubmit={handleSubmit}>
                <h1 className={styles.title}>
                    Customize your links
                </h1>
                <p className={styles.desc}>
                    Add/edit/remove links below and then share all your profiles with the world
                </p>
                <button type='button' className={styles.addLinkButton} onClick={addLink} ref={addLinkButton}> 
                    + Add new link
                </button>
                <fieldset className={styles.allLinks}>
                    {showLinks}
                </fieldset>                    
                <div className={styles.submit_container}>
                    <input type='submit' value='Save' className={styles.submit}/> 
                </div>
            </form>
        </>
    )
}