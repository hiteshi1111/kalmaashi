import { Link } from 'gatsby';
import React from 'react';
import { FaRightLong } from "react-icons/fa6";

const Cta = ({title="", handle="", onClick=()=>{}, action=false, className="", animate=false }) => {
    return (
        action ? (
            <button 
                onClick={onClick}
                aria-label={title}
                className={`flex text-white bg-primary-clr items-center font-medium rounded-full lg:px-10 lg:py-4 max-lg:px-6 max-lg:py-3 hover:bg-[#fff] hover:text-[#000]  ${className} ${animate && "duration-[400ms,700ms]"}`}
            >{title}<FaRightLong className="ml-[10px]" /></button>
        ):(
            <Link 
                to={handle}
                aria-label={title}
                className={`flex justify-center items-center h-[50px] text-white bg-primary-clr items-center font-medium rounded-full hover:bg-[#fff] hover:text-[#000] max-w-[180px] ${className} ${animate && "duration-[400ms,700ms] animate fadeInUp three-delays"}`}
            >{title}<FaRightLong className="ml-[10px]" /></Link>
        )
    )
}

export default Cta;