import React from "react";
import hero from "../../images/large-bg.webp"
import Cta from "../custom/cta";
import { StaticImage } from "gatsby-plugin-image";

const Hero = () => {
    return (
        <section className="hero-section-info 2xl:mt-[-170px] max-2xl:mt-[-140px] ">
            <div className="hero-banner-info bg-cover bg-no-repeat bg-center flex items-center relative before:content-[''] before:bg-[#000] before:absolute before:top-0 before:left-0 before:right-0 before:h-[100%] before:w-full before:opacity-40" style={{ backgroundImage: `url(${hero})` }}>
                <div className="container mx-auto px-[15px] max-2xl:!mt-[140px] 2xl:!mt-40">
                    <div className='py-10 text-white mb-[30px] text-center'>
                        <div className="hero-title mb-[20px] animate fadeInUp one-delays select-none">
                            <StaticImage 
                                src="../../images/logo-desk.webp"
                                alt="kalmaashi"
                                className="w-full 2xl:max-w-[650px] max-2xl:max-w-[450px]"
                            />
                        </div>
                        <p className="lg:mb-[35px] max-lg:mb-[30px] font-size-20 italic animate fadeInUp two-delays select-none">Discover the world through original paintings</p>
                        <div className="text-center">
                            <Cta title="Explore Now" handle="/collection" className="m-auto" animate/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;