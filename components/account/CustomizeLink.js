import {useRef, useContext} from 'react';
import {Context} from '../../pages/_app';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useDrop, useDrag } from "react-dnd"
import PlaformSelectBox from './PlatformSelectBox';
import LinkInput from './LinkInput';
import styles from '../../styles/account/CustomizeLink.module.css'

export default function CustomizeLink({link, index}) {
    const linkRef = useRef();
    const {dispatch} = useContext(Context);
    const tablet = useMediaQuery('(max-width: 900px)');

    const removeLink = async (e) => {
        const linkID = e.target.id;
        dispatch({type: 'remove link', linkId: linkID})
    }

    const [{handlerId}, drop] = useDrop({      
        accept: 'link',                         
        collect: (monitor) => ({               
            handlerId: monitor.getHandlerId()  
        }),
        hover: (hoverLink) => {        
            if(hoverLink.id === link.id) return;
            if(!tablet) return false;
       
            const hoverLinkIndex = hoverLink.index;
            const dropLinkIndex = index;

            dispatch({type: 're-order links', indices: {hoverLink: hoverLinkIndex, dropLink: dropLinkIndex}})
            hoverLink.index = index;
        },
    })

    const [{isDragging}, drag] = useDrag({      
        type: 'link',
        item: () => {                      
            return {id: link.id, index: index, itemCameFromOtherComponent: 'CustomizeLinkComponent'};            
        },
        isDragging: (monitor) => {     
            if(!tablet) return false;
            return link.id === monitor.getItem().id;   
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })


    drag(drop(linkRef));   

    return(
        <fieldset className={styles.link_container} 
            key={link.id} 
            name='linkContainer' 
            id={link.id} 
            ref={linkRef} 
            data-handler-id={handlerId}
            style={isDragging ? {opacity: 0} : {opacity: 1}}>
                <h1 className={styles.link_title}>
                    {`= Link #${index + 1}`}
                </h1>
                <button type='button' className={styles.link_remove} onClick={removeLink} id={link.id}>
                    Remove
                </button>
                <PlaformSelectBox initialState={link.platform} zIndex={1000-index} linkId={link.id}/>
                <LinkInput initialState={link.link} linkId={link.id}/>                       
        </fieldset>      
    )
}