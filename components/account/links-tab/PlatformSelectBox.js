import {useState, useRef, useEffect, useContext} from 'react';
import {Context} from '../../../pages/_app';
import styles from '../../../styles/account/links-tab/PlatformSelectBox.module.css'

const PlaformSelectBox = ({initialState, zIndex, linkId}) => {
    let initialPlatform = initialState.toLowerCase().replace(' ', '').replace('.', '');
    const {dispatch} = useContext(Context);
    const [platform, setPlatform] = useState(initialState ? initialState : 'Github');
    const [platformIcon, setPlatformIcon] = useState(initialState ? `/icons/select-icons/icon-${initialPlatform}.svg` : '/icons/select-icons/icon-github.svg');
    const [open, setOpen] = useState(false);
    const arrowIcon = useRef();
    const popupRef = useRef();

    const handleOption = (e) => {
        if(!e.target.matches('.' + styles.popup_option)) return;
        let dataOption = e.target.getAttribute('data-option');
        setPlatform(dataOption);        
        dataOption = dataOption.toLowerCase().replace(' ', '').replace('.', '');
        setPlatformIcon(`/icons/select-icons/icon-${dataOption}.svg`)
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
                    <div className={styles.popup_option} data-option='Twitter'>
                        <span className={styles.popup_icon}></span>Twitter
                    </div>
                    <div className={styles.popup_option} data-option='Twitch'>
                        <span className={styles.popup_icon}></span>Twitch
                    </div>
                    <div className={styles.popup_option} data-option='Dev.to'>
                        <span className={styles.popup_icon}></span>Dev.to
                    </div>
                    <div className={styles.popup_option} data-option='Codewars'>
                        <span className={styles.popup_icon}></span>Codewars
                    </div>
                    <div className={styles.popup_option} data-option='Codepen'>
                        <span className={styles.popup_icon}></span>Codepen
                    </div>
                    <div className={styles.popup_option} data-option='freeCodeCamp'>
                        <span className={styles.popup_icon}></span>freeCodeCamp
                    </div>
                    <div className={styles.popup_option} data-option='Hashnode'>
                        <span className={styles.popup_icon}></span>Hashnode
                    </div>
                    <div className={styles.popup_option} data-option='Stack Overflow'>
                        <span className={styles.popup_icon}></span>Stack Overflow
                    </div>
                </div>
            </div>
        </fieldset>
    )
}

export default PlaformSelectBox;