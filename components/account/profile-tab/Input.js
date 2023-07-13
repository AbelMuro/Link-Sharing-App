import {useState, useRef, useEffect} from 'react';
import styles from '../../../styles/account/profile-tab/Input.module.css'

export default function Input({type, label, name, placeholder,...rest}) {
    const [text, setText] = useState('');
    const inputRef = useRef();
    const errorMessageRef = useRef();

    const handleChange = (e) => {
        e.target.setCustomValidity('')
        setText(e.target.value);
    }

    const handleBlur = (e) => {
        const isValid = e.target.checkValidity();

        if(!isValid){
            inputRef.current.style.border = '1px solid #FF3939';
            inputRef.current.style.boxShadow = 'none'
            inputRef.current.style.paddingRight = '100px'
            errorMessageRef.current.style.display = 'block';
        }     
    }

    const handleInvalid = (e) => {
        e.target.setCustomValidity(' ');
        inputRef.current.style.border = '1px solid #FF3939';
        inputRef.current.style.boxShadow = 'none';
        inputRef.current.style.paddingRight = '100px'
        errorMessageRef.current.style.display = 'block';
    }

    useEffect(() => {
        inputRef.current.style.border = '';
        errorMessageRef.current.style.display = '';
        inputRef.current.style.paddingRight = ''
        inputRef.current.style.boxShadow = ''
    }, [text])


    return(
        <fieldset className={styles.container}>
            <label className={styles.label} htmlFor={label}>
                {label}
            </label>
            <div className={styles.input_container}>
                <input 
                    type={type} 
                    value={text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onInvalid={handleInvalid}
                    className={styles.input} 
                    placeholder={placeholder}
                    id={label}
                    ref={inputRef}  
                    name={name}                  
                    {...rest} />    
                <div className={styles.errorMessage} ref={errorMessageRef}>
                    Can't be empty
                </div>                     
            </div>
        </fieldset>

    )
}