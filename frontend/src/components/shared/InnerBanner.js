import React from 'react';
import innerBanner from "../../images/banner.webp";
import BreadCrumb from '../custom/breadCrumb';

const InnerPageBanner = ({ title = "", pages={} }) => {
    return (
        <section className="relative">
            <div className="relative md:py-[110px] max-md:py-[50px] bg-center bg-cover bg-no-repeat md:bg-fixed" style={{ backgroundImage: `url(${innerBanner})` }}>
                <div className='bg-opacity-info absolute w-full h-full top-0 bg-[#000] opacity-[0.6]'></div>
                <div className='heading_tittle relative'>
                    <h1 className="capitalize text-white text-center select-none">{title}</h1>
                    {pages && (
                        <BreadCrumb pages={pages} white />
                    )}
                </div>
            </div>
        </section>
    )
}

export default InnerPageBanner;