import PlaformSelectBox from './PlatformSelectBox';
import LinkInput from './LinkInput';
import Image from 'next/image';
import styles from '../../styles/account/CustomizeLinks.module.css';


//i will need to define my on submit event handler
export default function CustomizedLinks(){
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
                <button className={styles.addLinkButton}> 
                    + Add new link
                </button>
                <form>
                    <section className={styles.link_container}>
                        <h1 className={styles.link_title}>
                            = Link #1
                        </h1>
                        <button className={styles.link_remove}>
                            Remove
                        </button>
                        <PlaformSelectBox/>
                        <LinkInput/>                       
                    </section>
                <div className={styles.submit_container}>
                    <input type='submit' value='Save' className={styles.submit}/> 
                </div>
                </form>

            </section>
        </>
    )
}