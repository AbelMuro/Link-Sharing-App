import PhoneMockup from './PhoneMockup';
import CustomizeLinks from './CustomizeLinks';
import {useContext, useEffect} from 'react';
import {Context} from '../../../pages/_app';
import { doc } from 'firebase/firestore';  
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"  
import {db} from '../../../firebase/Configuration';
import {useDocumentData} from 'react-firebase-hooks/firestore'
import useMediaQuery from '../../../hooks/useMediaQuery';
import LoadingLinksScreen from '../../loading/LoadingLinksScreen';
import LoadingPhoneMockup from '../../loading/LoadingPhoneMockup';

export default function LinksTab(){
    const {uid, dispatch} = useContext(Context);
    const linkDocRef = doc(db, `${uid}/userLinks`);
    const [userLinks, loadingUserLinks, error] = useDocumentData(linkDocRef);
    const tablet = useMediaQuery('(max-width: 900px)');

    useEffect(() => {
        if(loadingUserLinks) return;
        dispatch({type: 'initialize links', links: userLinks.links});
    }, [loadingUserLinks])

    return(
        <DndProvider backend={HTML5Backend}> 
            {loadingUserLinks ? !tablet && <LoadingPhoneMockup/> : !tablet && <PhoneMockup/>}
            {loadingUserLinks ? <LoadingLinksScreen/> : <CustomizeLinks/>}
        </DndProvider>     
    )
}