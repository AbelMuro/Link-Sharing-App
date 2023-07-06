import {useRef, useState} from 'react';
import PlaformSelectBox from './PlatformSelectBox';
import LinkInput from './LinkInput';
import Image from 'next/image';
import styles from '../../styles/account/CustomizeLinks.module.css';

export default function CustomizedLinks(){
    const [allLinks, setAllLinks] = useState([])
    const platform = useRef();
    const link = useRef();

    const addLink = () => {
        const newLink = {
            title: `= Link #${allLinks.length + 1}`,
            platform: 'Github',
            link: '',
        }

        setAllLinks([...allLinks, newLink]);
    }

    const handleSubmit = (e) => {
        
    }

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
                <form onSubmit={handleSubmit}>
                    {allLinks.map((link) => {
                        return(
                            <section className={styles.link_container}>
                                <h1 className={styles.link_title}>
                                    {link.title}
                                </h1>
                                <button className={styles.link_remove}>
                                    Remove
                                </button>
                                <PlaformSelectBox initialPlatform={link.platform} ref={platform} />
                                <LinkInput initialLink={link.link} ref={link}/>                       
                            </section>                            
                        )
                    })}



                    <div className={styles.submit_container}>
                        <input type='submit' value='Save' className={styles.submit}/> 
                    </div>
                </form>
            </section>
        </>
    )
}