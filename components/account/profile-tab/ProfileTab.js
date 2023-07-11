import {useContext} from 'react'
import PhoneMockup from './PhoneMockup';
import ProfileDetails from './ProfileDetails';
import {Context} from '../../../pages/_app';
import { doc } from 'firebase/firestore';
import {db} from '../../../firebase/Configuration';
import { useDocumentData } from 'react-firebase-hooks/firestore';

export default function ProfileTab() {
    const {uid} = useContext(Context);
    const linkDocRef = doc(db, `${uid}/userLinks`);
    const profileDocRef = doc(db, `${uid}/profileDetails`);
    const [userLinks, loadingLinks, error] = useDocumentData(linkDocRef);
    const [profileDetails, loadingProfile, err] = useDocumentData(profileDocRef);

    return(
        <>
            {loadingLinks ? <></> : <PhoneMockup userLinks={userLinks.links}/>}    
            {loadingProfile ? <></> : <ProfileDetails profile={profileDetails}/>}
        </>
    )
}
