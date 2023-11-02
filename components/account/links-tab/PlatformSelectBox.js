import {useState, useRef, useEffect, useContext, useMemo} from 'react';
import {Context} from '../../../pages/_app';
import platforms from '../../../data/platforms';
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


    const allPlatforms = useMemo(() => {
        return platforms.map((platform) => {
            const platformIcon = platform.toLowerCase().replace(' ', '').replace('.', '');

            return(
                <div className={styles.popup_option} data-option={platform} key={platform}>
                    <span className={styles.popup_icon} style={
                        {WebkitMaskImage: `url('/icons/select-icons/icon-${platformIcon}.svg')`,
                        maskImage: `url('/icons/select-icons/icon-${platformIcon}.svg')`}}>
                    </span>
                    {platform}
                </div>                            
            )
        })
    }, [])

    useEffect(() => {
        if(open){
            popupRef.current.style.display = 'block';
            setTimeout(() => {
                if(!popupRef.current) return;

            }, 10);
        }
        else{  
            popupRef.current.style.display = '';           
            setTimeout(() => {
                if(!popupRef.current) return;

            }, 200);
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
                    {allPlatforms}
                </div>
            </div>
        </fieldset>
    )
}

export default PlaformSelectBox;