import React from 'react';

const Button = ({title, handleOnPress}) => {


    return (
        <button 
            className="add__data" 
            onClick={handleOnPress}>{title}
        </button>
    )
}

export default Button;
