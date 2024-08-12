import React, { useState } from 'react';
import { Link } from 'gatsby';
import { IoLogoWhatsapp } from "react-icons/io";
import { MdCall, MdEmail, MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowDown } from "react-icons/md";

const FloatingActions = () => {
    const [show, setShow] = useState(false);
    return (
        <div className={`fixed top-[50%] z-[49] grid transition-[0.8s] ease-in right-[0px]`} >
            <div className={`${!show && "animate-bounce"}`}>
                <button
                    aria-label='Action'
                    className={`cursor-pointer h-[40px] w-[40px] text-[16px] flex justify-center items-center bg-[#f0f0f0] ${!show && "h-[40px] w-[40px] rounded-full shadow-md shadow-[#000244]"}`}
                    onClick={() => setShow(prev => !prev)}
                >
                    {show ? (
                        <MdKeyboardDoubleArrowDown size="30px" />
                    ) : (
                        <MdKeyboardDoubleArrowRight size="25px" color='#ae7b4f' />
                    )}
                </button>
            </div>
            <div className={`bg-[#f0f0f0] ${show ? "block shadow-box" : "hidden"}`}>
                <Link to="/contact-us" className='bg-[#D4AF37] h-[40px] w-[40px] flex justify-center items-center' aria-label='Contact Us'>
                    <MdEmail color='#fff' size="20px" />
                </Link>
                <Link to="tel:+917087300675" className='bg-[#fff] h-[40px] w-[40px] flex justify-center items-center' aria-label='Mobile Number'>
                    <MdCall size="20px" />
                </Link>
                <Link to="https://wa.me/917087300675" target="_blank" className='bg-[#26D367] h-[40px] w-[40px] flex justify-center items-center' aria-label='WhatsApp'>
                    <IoLogoWhatsapp color='#fff' size="20px" />
                </Link>
            </div>
        </div>
    )
}

export default FloatingActions;