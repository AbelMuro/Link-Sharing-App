import {useContext} from 'react';
import {Context} from '../pages/_app';
import NavBar from '../components/account/NavBar';
import CustomizedLinks from '../components/account/CustomizeLinks';
import styles from '../styles/account/Account.module.css'

export default function Account() {
    const {link} = useContext(Context);

    return(
        <main className={styles.container}>
            <NavBar/>
            {link === 'links' ? <CustomizedLinks/> : <></>}
        </main>
    )
}