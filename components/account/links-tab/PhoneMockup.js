import {memo, useMemo, useContext, useState} from 'react';
import {Context} from '../../../pages/_app';
import PhoneLinkBox from './PhoneLinkBox';
import {useFloating, offset, shift} from '@floating-ui/react';
import Image from 'next/image';
import styles from '../../../styles/account/links-tab/PhoneMockup.module.css'


//i will need to create a custom tooltip, instead of relying on floating ui
const PhoneMockup = () => {
    const tooltipRead = JSON.parse(localStorage.getItem('phoneMockuptooltip'));
    const {usersLinks} = useContext(Context);
    const [isOpen, setIsOpen] = useState(tooltipRead === null ? true : false);
 
    const {refs, floatingStyles} = useFloating({                        
         open: isOpen,                                        
         onOpenChange: setIsOpen,   
         placement: 'right',                         
         middleware: [offset(-70), shift({mainAxis: false, padding: 400})]     
       });

    const handleClosePopup = () => {
        setIsOpen(false);
        localStorage.setItem('phoneMockuptooltip', false)
    }
   
    const linkBoxes = useMemo(() => {
        return usersLinks.map((link, i) => {
            return(
                <PhoneLinkBox link={link} index={i} key={link.id}/>
            )
        })
    }, [usersLinks])

    return(
        <section className={styles.container}>
            <div className={styles.phone_container} ref={refs.setReference}>
                <Image src={'/images/illustration-phone-mockup.svg'}
                    width='0' height='0'
                    alt='phone mockup'
                    priority
                    className={styles.phone_mockup}/>
                <div className={styles.linkBoxes}>
                    {linkBoxes}
                </div>
            </div>
            {isOpen ? 
                <div ref={refs.setFloating} style={floatingStyles} className={styles.tooltip}>
                    You can Drag and Drop!
                    <button className={styles.okButton} onClick={handleClosePopup}> 
                        OK
                    </button>
                    <div className={styles.arrowDown}></div>
                </div> : <></>
            }
        </section>
    )
}

export default memo(PhoneMockup);