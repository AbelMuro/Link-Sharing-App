import {memo, useMemo, useContext, useState, useEffect} from 'react';
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"  
import {Context} from '../../../pages/_app';
import PhoneLinkBox from './PhoneLinkBox';
import Image from 'next/image';
import styles from '../../../styles/account/links-tab/PhoneMockup.module.css'


const PhoneMockup = () => {
    const {usersLinks} = useContext(Context);
    const [isOpen, setIsOpen] = useState(false);

    const handleClosePopup = () => {
        setIsOpen(false);
        localStorage.setItem('phoneMockuptooltip', true)
    }
   
    const linkBoxes = useMemo(() => {
        return usersLinks.map((link, i) => {
            return(
                <PhoneLinkBox link={link} index={i} key={link.id}/>
            )
        })
    }, [usersLinks])

    useEffect(() => {
        const tooltipRead = JSON.parse(localStorage.getItem('phoneMockuptooltip'));
        if(tooltipRead){
            return;
        }
        if(usersLinks.length > 1){
            setIsOpen(true);
        }
    }, [usersLinks])

    return(
        <section className={styles.container}>
            <div className={styles.phone_container}>
                <Image src={'/images/illustration-phone-mockup.svg'}
                    width='0' height='0'
                    alt='phone mockup'
                    priority
                    className={styles.phone_mockup}/>
                <div className={styles.linkBoxes}>
                    <DndProvider backend={HTML5Backend }>
                        {linkBoxes}
                    </DndProvider>
                </div>
            {isOpen ? 
                <div className={styles.tooltip}>
                    You can Drag and Drop!
                    <button className={styles.okButton} onClick={handleClosePopup}> 
                        Got it!
                    </button>
                    <div className={styles.arrowDown}></div>
                </div> : <></>
            }                
            </div>

        </section>
    )
}

export default memo(PhoneMockup);