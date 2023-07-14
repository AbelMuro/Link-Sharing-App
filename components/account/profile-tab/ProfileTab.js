import {useContext} from 'react'
import PhoneMockup from './PhoneMockup';
import ProfileDetails from './ProfileDetails';
import LoadingPhoneMockup from '../../loading/LoadingPhoneMockup';
import {Context} from '../../../pages/_app';
import { doc } from 'firebase/firestore';
import {db} from '../../../firebase/Configuration';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import useMediaQuery from '../../../hooks/useMediaQuery';

export default function ProfileTab() {
    const {uid} = useContext(Context);
    const tablet = useMediaQuery('(max-width: 900px)')
    const linkDocRef = doc(db, `${uid}/userLinks`);
    const [userLinks, loadingLinks, error] = useDocumentData(linkDocRef);

    return(
        <>
            {loadingLinks ? !tablet && <LoadingPhoneMockup/> : !tablet && <PhoneMockup userLinks={userLinks.links}/>}    
            <ProfileDetails />
        </>
    )
}
