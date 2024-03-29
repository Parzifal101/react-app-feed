import React from 'react';
import cl from './MySelect.module.css';

const MySelect = ({options, value, defaultValue, onChange}) => {
    return (
        <select className={cl.mySelect} value={value} onChange={event => onChange(event.target.value)}>
            <option disabled value="">{defaultValue}</option>
            {options.map(option => 
                <option className={cl.myOption} key={option.value} value={option.value}>{option.name}</option>
            )}
        </select>
    );
};

export default MySelect;