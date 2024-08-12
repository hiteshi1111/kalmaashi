import React from 'react';

const LabelledTextInput = ({ id, type, value, onChange = () => { }, disabled, placeholder="", className="", name="" }) => {
    return (
        <div className='relative'>
            <label className='!absolute top-[-10px] left-[10px] text-white bg-[#160100] px-[10px] text-[12px]'>{placeholder}</label>
            <input 
                id={id} 
                type={type} 
                name={name}
                value={value} 
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChange} 
                className={`text-white bg-[transparent] border border-[#888888] rounded-[5px] h-[45px] !w-full px-[10px] focus:outline-none ${className}`} 
            />
        </div>
    )
}

export default LabelledTextInput;