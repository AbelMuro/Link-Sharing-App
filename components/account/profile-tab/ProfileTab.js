import {useContext, useEffect} from 'react'
import PhoneMockup from './PhoneMockup';
import {Context} from '../../../pages/_app';
import { doc } from 'firebase/firestore';
import {db} from '../../../firebase/Configuration';
import { useDocumentData } from 'react-firebase-hooks/firestore';


//this is where i left off, i will need to create a reducer for the users profile
export default function ProfileTab() {
    const {uid, dispatch} = useContext(Context);
    const linkDocRef = doc(db, `${uid}/userLinks`);
    const profileDocRef = doc(db, `${uid}/profileDetails`);
    const [userLinks, loadingLinks, error] = useDocumentData(linkDocRef);
    const [profileDetails, loadingProfile, err] = useDocumentData(profileDocRef);

    useEffect(() => {
        if(loadingLinks) return;
        dispatch({type: 'initialize links', links: userLinks.links});
    }, [loadingLinks])

    useEffect(() => {
        if(loadingProfile || !profileDetails) return

        dispatch({
            type: 'initialize profile', 
            avatar: profileDetails.avatar, 
            firstName: profileDetails.firstName, 
            lastName: profileDetails.lastName,
            email: profileDetails.email,
        })

    },[loadingProfile])

    return(
        <>
            {loadingLinks ? <></> : <PhoneMockup/>}    
        </>
    )
}
