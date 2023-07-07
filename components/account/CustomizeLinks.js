import {useMemo, useContext} from 'react';
import {Context} from '../../pages/_app';
import {v4 as uuid} from 'uuid'
import PlaformSelectBox from './PlatformSelectBox';
import LinkInput from './LinkInput';
import Image from 'next/image';
import styles from '../../styles/account/CustomizeLinks.module.css';
import {db} from '../../firebase/Configuration';
import {collection, doc, setDoc, deleteDoc, updateDoc} from 'firebase/firestore';    
import {useCollectionData} from 'react-firebase-hooks/firestore';      


export default function CustomizedLinks(){
    const {uid} = useContext(Context);
    const collectionRef = collection(db, uid);
    const [links, loading, error] = useCollectionData(collectionRef);

    const addLink = async () => {
        const newLink = {
            id: uuid(),
            platform: 'Github',
            link: '',
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


    return(
        <>
            <section className={styles.container}>
                <div className={styles.phone_container}>
                    <Image src={'/images/illustration-phone-mockup.svg'}
                        width='0' height='0'
                        alt='phone mockup'
                        className={styles.phone_mockup}/>
                </div>
            </section>
            <section className={styles.container}>
                <h1 className={styles.title}>
                    Customize your links
                </h1>
                <p className={styles.desc}>
                    Add/edit/remove links below and then share all your profiles with the world
                </p>
                <button className={styles.addLinkButton} onClick={addLink}> 
                    + Add new link
                </button>
                <form className={styles.form} onSubmit={handleSubmit}>
                    {showLinks}
                </form>                    
                <div className={styles.submit_container}>
                    <input type='submit' value='Save' className={styles.submit}/> 
                </div>
            </section>
        </>
    )
}