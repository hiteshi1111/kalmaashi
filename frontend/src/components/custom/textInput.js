import React from 'react';

const TextInput = ({ id, type, value, onChange = () => { }, disabled, placeholder="", className="", name="", pattern="", isError=false, errorMessage="" }) => {
    return (
        <div className='w-full'>
            <input 
                id={id} 
                type={type} 
                name={name}
                value={value} 
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChange} 
                pattern={pattern}
                className={`text-white bg-[transparent] border border-[#888888] rounded-[5px] h-[45px] !w-full px-[8px] focus:outline-none ${className}`} 
            />
            {isError && (
                <div className='text-[#FF0000] w-full text-[12px] mt-[5px]'>{errorMessage}</div>
            )}
        </div>
    )
}

export default TextInput;
