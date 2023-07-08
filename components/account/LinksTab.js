import PhoneMockup from './PhoneMockup';
import CustomizeLinks from './CustomizeLinks';
import {useContext, useEffect} from 'react';
import {Context} from '../../pages/_app';
import {collection,} from 'firebase/firestore';  
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"  
import {db} from '../../firebase/Configuration';
import {useCollectionData} from 'react-firebase-hooks/firestore'
import useMediaQuery from '../../hooks/useMediaQuery';

export default function LinksTab(){
    const {uid, dispatch} = useContext(Context);
    const collectionRef = collection(db, uid);
    const [links, loading, error] = useCollectionData(collectionRef);
    const tablet = useMediaQuery('(max-width: 900px)');

    useEffect(() => {
        if(loading) return;

        dispatch({type: 'initialize links', links: links});
    }, [loading])


    return(
        <DndProvider backend={HTML5Backend}> 
            {loading ? <></> : !tablet && <PhoneMockup/>}
            {loading ? <></> : <CustomizeLinks/>}
         </DndProvider>
    )
}