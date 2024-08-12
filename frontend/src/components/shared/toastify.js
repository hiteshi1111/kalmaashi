import React from 'react';


const Toastify = ({ message, className='' }) => {

    return (
        <div
            className={`fixed z-[111] bg-[#008000] text-white bottom-[30px] right-[0px] w-full max-w-[300px] flex items-center justify-center h-[50px] rounded-l-full ${className}`}
        >{message}</div>
    )
}

export default Toastify;