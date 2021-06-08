import React from 'react'

const InputText = ({name, handleChange, type}) => {
    return (
        <input
            required
            value={name}
            onClick={handleChange}
            name={name}
            type={type} 
        />
    )
}

export default InputText;
