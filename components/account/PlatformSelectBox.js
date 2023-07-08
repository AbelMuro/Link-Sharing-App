import {useState, useRef, useEffect, useContext} from 'react';
import {Context} from '../../pages/_app';
import styles from '../../styles/account/PlatformSelectBox.module.css';

const PlaformSelectBox = ({initialState, zIndex, linkId}) => {
    const {dispatch} = useContext(Context);
    const [platform, setPlatform] = useState(initialState ? initialState : 'Github');
    const [platformIcon, setPlatformIcon] = useState('/icons/icon-github.svg');
    const [open, setOpen] = useState(false);
    const arrowIcon = useRef();
    const popupRef = useRef();

    const handleOption = (e) => {
        if(!e.target.matches('.' + styles.popup_option)) return;
        const dataOption = e.target.getAttribute('data-option');
        setPlatform(dataOption);
        setPlatformIcon(`/icons/icon-${dataOption.toLowerCase().replace(' ', '')}.svg`)
    }

    const handlePopup = () => {
        setOpen(!open);
    }

    useEffect(() => {
        if(open){
            popupRef.current.style.display = 'block';
            arrowIcon.current.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                if(!popupRef.current) return;
                popupRef.current.style.transform = 'scale(1)';
            }, 10)
        }
        else{
            popupRef.current.style.transform = '';      
            arrowIcon.current.style.transform = '';      
            setTimeout(() => {
                if(!popupRef.current) return;
                popupRef.current.style.display = 'block';
            }, 200)
        }
    }, [open])

    useEffect(() => {
        dispatch({type: 'update link', platform, linkId: linkId})
    }, [platform])  


    return(
        <fieldset className={styles.container} name={'platform'} data-platform={platform}>
            <label className={styles.label}>
                Platform
            </label>
            <div className={styles.selectBox} onClick={handlePopup} style={{zIndex}}>
                <img src={platformIcon} className={styles.platformIcon}/>
                {platform}
                <img src={'/icons/icon-chevron-down.svg'} ref={arrowIcon} className={styles.arrow}/>
                <div className={styles.popup} onClick={handleOption} ref={popupRef}>
                    <div className={styles.popup_option} data-option='Github'>
                        <span className={styles.popup_icon}></span>Github
                    </div>
                    <div className={styles.popup_option} data-option='YouTube'>
                        <span className={styles.popup_icon}></span>YouTube
                    </div>
                    <div className={styles.popup_option} data-option='LinkedIn'>
                        <span className={styles.popup_icon}></span>LinkedIn
                    </div>
                    <div className={styles.popup_option} data-option='Facebook'>
                        <span className={styles.popup_icon}></span>Facebook
                    </div>
                    <div className={styles.popup_option} data-option='Frontend Mentor'>
                        <span className={styles.popup_icon}></span>Frontend Mentor
                    </div>
                    <div className={styles.popup_option} data-option='Gitlab'>
                        <span className={styles.popup_icon}></span>Gitlab
                    </div>
                </div>
            </div>
        </fieldset>
    )
}

export default PlaformSelectBox;