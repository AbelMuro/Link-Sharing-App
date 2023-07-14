import {useContext} from 'react';
import {Context} from '../pages/_app';
import {auth} from '../firebase/Configuration';
import { onAuthStateChanged } from "firebase/auth";
import DisplayProfile from '../components/preview/DisplayProfile.js';
import CopiedToClipboardMessage from '../components/preview/CopiedToClipboardMessage';

export default function Preview() {
    const {uid, setUid} = useContext(Context);

    onAuthStateChanged(auth, (currentUser) => {          
        if(currentUser)
            setUid(currentUser.uid);
    })

    return(
        <>
            {uid ? <DisplayProfile/> : <></>}
            <CopiedToClipboardMessage/>
        </>
    );
}