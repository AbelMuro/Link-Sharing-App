import {useContext, useEffect} from 'react';
import {Context} from '../../pages/_app';
import useMediaQuery from '../../hooks/useMediaQuery';
import Image from 'next/image';
import styles from '../../styles/account/NavBar.module.css';

export default function NavBar() {
    const {link, setLink} = useContext(Context);
    const mobile = useMediaQuery('(max-width: 700px)');

    const handleLink = (e) => {
        const currentLink = e.target.getAttribute('data-link');
        setLink(currentLink);
    }

    useEffect(() => {
        const allLinks = document.querySelectorAll('.' + styles.link);

        allLinks.forEach((currentLink) => {
            currentLink.style.backgroundColor = '';
            currentLink.style.color = '';
            currentLink.firstElementChild.style.backgroundColor = '';  
        })

        allLinks.forEach((currentLink) => {
            if(currentLink.getAttribute('data-link') === link) {
                currentLink.style.backgroundColor = '#EFEBFF';
                currentLink.style.color = '#633CFF';
                currentLink.firstElementChild.style.backgroundColor = '#633CFF';                
            }
        })
    }, [link])

    return(
            <nav className={styles.container}>
                <Image src={mobile ? '/icons/logo-devlinks-small.svg' : '/icons/logo-devlinks-large.svg'} 
                    width='0' height='0'
                    alt='dev links'
                    className={styles.logo}
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
                <button className={styles.previewButton}>
                    {mobile ? <img src={'/icons/icon-preview-header.svg'} className={styles.eyeIcon}/> : 'Preview'}
                </button>
            </nav>
      

    )
}