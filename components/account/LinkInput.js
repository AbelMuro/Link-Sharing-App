import {useState, useRef, useEffect, forwardRef, useImperativeHandle} from 'react';
import styles from '../../styles/account/LinkInput.module.css';


const LinkInput = forwardRef(({initialLink}, ref) => {
    const [url, setUrl] = useState(initialLink);
    const inputRef = useRef();
    const emptyMessageRef = useRef();
    const invalidUrlMessageRef = useRef();

    const isValidUrl = (url) => {
        try{
            new URL(url);
            return true;
        }
        catch(error){
            return false
        }
    }

    const handleChange = (e) => {
        e.target.setCustomValidity('');
        setUrl(e.target.value);
    }

    const handleBlur = (e) => {
        const isEmpty = e.target.validity.valueMissing;
        const isValidLink = isValidUrl(url);
        
        if(isEmpty) {
            emptyMessageRef.current.style.display = 'block';
            inputRef.current.style.border = '1px solid #FF3939';
        }
        else if(!isValidLink) {
            invalidUrlMessageRef.current.style.display = 'block';
            inputRef.current.style.border = '1px solid #FF3939';
        }
    }
    const handleInvalid = (e) => {
        e.target.setCustomValidity(' ')
        emptyMessageRef.current.style.display = 'block';
        inputRef.current.style.border = '1px solid #FF3939';
        invalidUrlMessageRef.current.style.display = 'block';
    }

    useImperativeHandle(ref, () => ({
        get state(){
            return url;
        }
    }))

    useEffect(() => {
        emptyMessageRef.current.style.display = '';
        inputRef.current.style.border = '';
        invalidUrlMessageRef.current.style.display = '';
    }, [url])

    return(
        <fieldset className={styles.container}>
            <label className={styles.label}>
                Link
            </label>
            <div className={styles.input_container}>
                <img src={'/icons/icon-link.svg'} className={styles.link_icon}/>
                <input type='url' 
                    className={styles.input}
                    value={url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onInvalid={handleInvalid}
                    placeholder='e.g. https://www.github.com/johnappleseed'
                    pattern="https://.*"
                    ref={inputRef}
                    required/>
                <p className={styles.errorMessage} ref={emptyMessageRef}>
                    Can't be empty
                </p>    
                <p className={styles.errorMessage} ref={invalidUrlMessageRef}>
                    Please check the URL
                </p>
            </div>
        </fieldset>
    )
})

export default LinkInput;