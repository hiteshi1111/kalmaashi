import { Link } from 'gatsby';
import React from 'react'
import socialData from "../../data/info.json";
import { BiLogoFacebook } from 'react-icons/bi';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const SocialMedia = ({className=""}) => {
    return (
        <>
        {data.map((item,  i) => (
            <Link
                key={i}
                to={item.handle} 
                aria-label={item.title} 
                target="_blank" 
                className={`flex justify-center items-center w-[40px] h-[40px] rounded-full hover:scale-[1.1] bg-primary-clr cursor-pointer ${className}`}
            >{item.icon}</Link>
        ))}
        </>
    )
}

const data = [
    {
        title: "Facebook",
        handle: socialData.facebook,
        icon: <BiLogoFacebook className='w-[28px] h-[28px] text-white' />
    },
    {
        title: "Twitter",
        handle: socialData.twitter,
        icon: <FaTwitter className='w-[22px] h-[22px] text-white' />
    },
    {
        title: "Instagram",
        handle: socialData.instagram,
        icon: <FaInstagram className='w-[22px] h-[22px] text-white' />
    },
    {
        title: "Youtube",
        handle: socialData.youtube,
        icon: <FaYoutube className='w-[22px] h-[22px] text-white' />
    },
]

export default SocialMedia;