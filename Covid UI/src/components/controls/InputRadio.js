import React, { useState } from 'react';

const InputRadio = ({title, onSetValue}) => {

    const [valueTrue, setValueTrue] = useState(false);
    const [valueFalse, setValueFalse] = useState(false);
    
    
    return (
        <>
            <label htmlFor={title}>{title}</label>
            <br/>
            <input 
                type="radio" 
                checked={valueTrue} 
                value={valueTrue} 
                onChange={(e) => { 
                    setValueTrue(true); 
                    setValueFalse(false);
                    onSetValue(true)
                }}/>True

            <input 
                type="radio" 
                checked={valueFalse} 
                value={valueFalse} 
                onChange={(e) =>{ 
                    setValueTrue(false); 
                    setValueFalse(true);
                    onSetValue(false)
                    }}/>False
            <br/>
        </>
    )
}

export default InputRadio;
