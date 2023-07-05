import {useState, useRef, useEffect, forwardRef, useImperativeHandle} from 'react'
import Image from 'next/image';
import styles from '../../styles/authorization/Input.module.css';

const Input = forwardRef(({label, type, icon, error, placeholder}, ref) => {
    const [text, setText] = useState('');
    const errorMessageRef = useRef();
    const emptyMessageRef = useRef();
    const inputRef = useRef();
    const labelRef = useRef();

    const handleChange = (e) => {
        e.target.setCustomValidity('');
        setText(e.target.value)
    }

    const handleBlur = (e) => {
        const isEmpty = e.target.validity.valueMissing;
        const isTypeInvalid = e.target.validity.typeMismatch;
        
        if(isEmpty){
            inputRef.current.style.border = '1px solid #FF3939';
            inputRef.current.style.boxShadow = 'none'
            inputRef.current.style.paddingRight = '100px';
            emptyMessageRef.current.style.display = 'block';
            labelRef.current.style.color = '#FF3939'
        }
        else if(isTypeInvalid){
            inputRef.current.style.border = '1px solid #FF3939';
            inputRef.current.style.boxShadow = 'none'
            inputRef.current.style.paddingRight = '100px';
            errorMessageRef.current.style.display = 'block';
            labelRef.current.style.color = '#FF3939'
        }
    }

    const handleInvalid = (e) => {
        e.target.setCustomValidity(' ');
        const isEmpty = e.target.validity.valueMissing;
        inputRef.current.style.border = '1px solid #FF3939';        
        inputRef.current.style.boxShadow = 'none';
        inputRef.current.style.paddingRight = '100px';   
        labelRef.current.style.color = '#FF3939';             
        if(isEmpty)
            emptyMessageRef.current.style.display = 'block';
        else 
            errorMessageRef.current.style.display = 'block';
    }

    useImperativeHandle(ref, () => ({
        get state() {
            return text;
        }
    }))

    useEffect(() => {
        inputRef.current.style.border = '';
        inputRef.current.style.boxShadow = ''
        inputRef.current.style.paddingRight = '';
        emptyMessageRef.current.style.display = '';
        errorMessageRef.current.style.display = '';
        labelRef.current.style.color = '';
    }, [text])

    return(
        <fieldset className={styles.container}>
            <label className={styles.label} ref={labelRef}>
                {label}
            </label>
            <div className={styles.inputbox}>
               <input type={type}
                    value={text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onInvalid={handleInvalid}
                    placeholder={placeholder}
                    className={styles.input}
                    ref={inputRef}
                    required
                />   
                <Image src={icon}
                    width='0' height='0'
                    alt=''
                    className={styles.icon}/>    
                <span className={styles.errorMessage} ref={errorMessageRef}>
                    {error}
                </span>    
                <span className={styles.errorMessage} ref={emptyMessageRef}>
                    Can't be empty
                </span>   
            </div>
        </fieldset>
    )
})

export default Input