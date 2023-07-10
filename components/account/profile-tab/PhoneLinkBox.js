import styles from '../../../styles/account/PhoneLinkBox.module.css';

export default function PhoneLinkBox({platform}) {
    const platformTitle = platform.toLowerCase().replace(' ', '').replace('.', '');

    return(
       <div className={[styles.linkBox, styles[platformTitle]].join(' ')} style={{cursor: 'initial'}}>
            <img src={`/icons/icon-link-boxes/icon-${platformTitle}-link-box.svg`} className={styles.linkIcon}/>
            {platform}
            <img src={'/icons/icon-arrow-right.svg'} className={styles.linkArrow}/>
        </div>
    )
}