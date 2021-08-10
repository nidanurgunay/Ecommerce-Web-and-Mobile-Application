import React from 'react';

const GenderInputSelect = (props) =>
    <select {...props} className='Selectopt'>
        <option>Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
    </select>

export default GenderInputSelect;