import { useDrop, useDrag } from "react-dnd"
import {useRef, useContext} from 'react';
import {Context} from '../../pages/_app';
import { updateDoc, doc } from "firebase/firestore";
import {db} from '../../firebase/Configuration';
import styles from '../../styles/account/PhoneLinkBox.module.css';

export default function PhoneLinkBox({link, links, index}) {
    const {uid} = useContext(Context);
    const linkRef = useRef();    
    const platform = link.platform.toLowerCase().replace(' ','');
    const platformTitle = link.platform;

    const [{handlerId}, drop] = useDrop({      
        accept: 'link',                         
        collect: (monitor) => ({               
            handlerId: monitor.getHandlerId()  
        }),
        hover: (hoverLink) => {        
            if(hoverLink.id === link.id) return;
       
            const hoverLinkIndex = hoverLink.index;
            const dropLinkIndex = index;
            const linksCopy = [...links];
            let temp = linksCopy[hoverLinkIndex].order;
            linksCopy[hoverLinkIndex].order = linksCopy[dropLinkIndex].order;
            linksCopy[dropLinkIndex].order = temp;

            linksCopy.map((link) => {
                const linkId = link.id
                const newPlatform = link.platform;
                const newLink = link.link;
                const newOrder = link.order;
    
                async function updateDocs(){
                    const linkDoc = doc(db, `${uid}/${linkId}`);
                    await updateDoc(linkDoc, {
                        id: linkId,
                        platform: newPlatform,
                        link: newLink,
                        order: newOrder
                    })
                }
                updateDocs();
            })
            hoverLink.index = index;
        },
    })

    const [{isDragging}, drag] = useDrag({      
        type: 'link',
        item: () => {                          
            return {id: link.id, index: index};
        },
        isDragging: (monitor) => {              
            return link.id === monitor.getItem().id;   
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    drag(drop(linkRef));   

    return(                
        <div className={[styles.linkBox, styles[platform]].join(' ')} 
            ref={linkRef}
            data-handler-id={handlerId}
            style={isDragging ? {opacity: 0} : {opacity: 1}}>
                <img className={styles.linkIcon} src={`/icons/icon-${platform}-link-box.svg`}/>
                {platformTitle}
                <img className={styles.linkArrow} src={'/icons/icon-arrow-right.svg'}/>
        </div>
    )
}