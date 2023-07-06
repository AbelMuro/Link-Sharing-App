import {useState, useRef} from 'react';
import styles from '../../styles/account/LinkInput.module.css';


//this is where i left off, i will need to define the event handlers for the input
export default function LinkInput() {
    const inputRef = useRef();

    const handleBlur = (e) => {
        const isEmpty = e.target.valueMissing;
        
        if(!isEmpty) {

        }
    }

    return(
        <fieldset className={styles.container}>
            <label className={styles.label}>
                Link
            </label>
            <div className={styles.input_container}>
                <img src={'/icons/icon-link.svg'} className={styles.link_icon}/>
                <input type='url' 
                    className={styles.input}
                    onBlur={handleBlur}
                    placeholder='e.g. https://www.github.com/johnappleseed'
                    pattern="https://.*"
                    ref={inputRef}
                    required/>
                <p className={styles.errorMessage}>
                    Can't be empty
                </p>    
                <p className={styles.errorMessage}>
                    Please check the URL
                </p>
            </div>
        </fieldset>
    )
}