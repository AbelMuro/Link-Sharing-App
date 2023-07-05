import {useState, useEffect} from 'react';
import Image from 'next/image';
import styles from '../../styles/account/NavBar.module.css';


//this is where i left off, i will need to create a reducer for the link state
export default function NavBar() {
    const [link, setLink] = useState('links');

    const handleLink = (e) => {
        const currentLink = e.target.getAttribute('data-link');
        setLink(currentLink)
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
                <Image src={'/icons/logo-devlinks-large.svg'} 
                    width='0' height='0'
                    alt='dev links'
                    className={styles.logo}
                    />
                <ul className={styles.links}>
                    <li className={styles.link} onClick={handleLink} data-link='links'>
                        <span></span>
                        Links
                    </li>
                    <li className={styles.link} onClick={handleLink} data-link='profile'>
                        <span></span>
                        Profile Details
                    </li>
                </ul>
                <button className={styles.previewButton}>
                    Preview
                </button>
            </nav>
      

    )
}