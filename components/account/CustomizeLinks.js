import {useState, useMemo, useEffect} from 'react';
import {v4 as uuid} from 'uuid'
import PlaformSelectBox from './PlatformSelectBox';
import LinkInput from './LinkInput';
import Image from 'next/image';
import styles from '../../styles/account/CustomizeLinks.module.css';
import {db, auth} from '../../firebase/Configuration';
import {collection, addDoc} from 'firebase/firestore';
import {useCollectionData, useCollection} from 'react-firebase-hooks/firestore';        


//next thing i have to do is get the users collection in the firestore and (if they have anything) put the documents in a state array
//i might need to put the auth current user ID in the context 
export default function CustomizedLinks(){
    const [allLinks, setAllLinks] = useState([]);

    const addLink = () => {
        const newLink = {
            id: uuid(),
            platform: 'Github',
            link: '',
        }
        setAllLinks([...allLinks, newLink]);
    }

    const removeLink = (e) => {
        const linkID = e.target.id;
        setAllLinks((links) => {
            return links.filter((link) => {
                if(link.id === linkID)
                    return false;
                else    
                    return true;
            })
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const userCollection = collection(db, auth.currentUser.uid);                   
            await addDoc(userCollection, {'users links': allLinks});                             
        }                                                                   
        catch(error){
            console.log("error");
        }
    }

    const showLinks = useMemo(() => {
        return allLinks.map((link, i) => {
            return(
                <section className={styles.link_container} key={link.id}>
                    <h1 className={styles.link_title}>
                        {`= Link #${i + 1}`}
                    </h1>
                    <button type='button' className={styles.link_remove} onClick={removeLink} id={link.id}>
                        Remove
                    </button>
                    <PlaformSelectBox initialState={link.platform} setAllLinks={setAllLinks} id={link.id}/>
                    <LinkInput initialState={link.link} setAllLinks={setAllLinks} id={link.id}/>                       
                </section>                            
            )
        })
    }, [allLinks])

    useEffect(() => {
        console.log(allLinks);
    }, [allLinks])

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
                    <div className={styles.submit_container}>
                        <input type='submit' value='Save' className={styles.submit}/> 
                    </div>
                </form>
            </section>
        </>
    )
}