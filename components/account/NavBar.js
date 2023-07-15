import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {auth} from '../../firebase/Configuration'
import { signOut } from 'firebase/auth';
import useMediaQuery from '../../hooks/useMediaQuery';
import Image from 'next/image';
import styles from '../../styles/account/NavBar.module.css';

export default function NavBar({currentTab, setCurrentTab}) {
    const mobile = useMediaQuery('(max-width: 700px)');
    const router = useRouter();

    const handleLink = (e) => {
        const currentLink = e.target.getAttribute('data-link');
        setCurrentTab(currentLink);
    }

    const handleGoBackToLogin = async() => {
        await signOut(auth);
        router.push('/');
    }

    const handlePreviewLink = () => {
        router.push('/preview');
    }

    useEffect(() => {
        const allLinks = document.querySelectorAll('.' + styles.link);

        allLinks.forEach((currentLink) => {
            currentLink.style.backgroundColor = '';
            currentLink.style.color = '';
            currentLink.firstElementChild.style.backgroundColor = '';  
        })

        allLinks.forEach((currentLink) => {
            if(currentLink.getAttribute('data-link') === currentTab) {
                currentLink.style.backgroundColor = '#EFEBFF';
                currentLink.style.color = '#633CFF';
                currentLink.firstElementChild.style.backgroundColor = '#633CFF';                
            }
        })
    }, [currentTab])

    return(
            <nav className={styles.container}>
                <Image src={mobile ? '/icons/logo-devlinks-small.svg' : '/icons/logo-devlinks-large.svg'} 
                    width='0' height='0'
                    alt='dev links'
                    className={styles.logo}
                    onClick={handleGoBackToLogin}
                    />
                <ul className={styles.links}>
                    <li className={styles.link} onClick={handleLink} data-link='links'>
                        <span></span>
                        {mobile ? '' : 'Links'}
                    </li>
                    <li className={styles.link} onClick={handleLink} data-link='profile'>
                        <span></span>
                        {mobile ? '' : 'Profile Details' }
                    </li>
                </ul>
                <button className={styles.previewButton} onClick={handlePreviewLink} >
                    {mobile ? <img src={'/icons/icon-preview-header.svg'} className={styles.eyeIcon}/> : 'Preview'}
                </button>
            </nav>
    )
}