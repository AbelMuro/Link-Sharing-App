import { useDrop, useDrag } from "react-dnd"
import {useRef, useContext} from 'react';
import {Context} from '../../pages/_app';
import styles from '../../styles/account/PhoneLinkBox.module.css';

export default function PhoneLinkBox({link, index}) {
    const {dispatch} = useContext(Context);
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
            dispatch({type: 're-order links', indices: {hoverLink: hoverLinkIndex, dropLink: dropLinkIndex}});
            hoverLink.index = index;
        },
    })

    const [{isDragging}, drag] = useDrag({      
        type: 'link',
        item: () => {                          
            return {id: link.id, index: index};
        },
        isDragging: (monitor) => {
            if(monitor.getItem().itemCameFromOtherComponent)            // the <CustomizeLink/> component is also re-arranging the same list of links, 
                return false                                            // and will trigger this function in THIS component when the items get re-arranged
            
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