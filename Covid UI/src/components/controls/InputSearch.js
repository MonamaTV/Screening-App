import React from 'react'

const InputSearch = ({setValue, value, onPress}) => {
    return (
        <input 
            type="search" 
            value={value}
            className="search__input"
            placeholder="Search..."
            onChange={e => setValue(e.target.value)}
            onKeyPress={onPress}
        />
    )
}
export default InputSearch;
