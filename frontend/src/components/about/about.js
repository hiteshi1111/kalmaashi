import React from "react";
import { StaticImage } from 'gatsby-plugin-image';

const About = () => {
    return (
        <section className="s-py-sec about-page-section">
            <div className="container m-auto px-[15px]">
                <div className="flex items-center max-md:flex-col md:mb-20 max-md:mb-14">
                    <div className="md:w-1/2">
                        <div className="md:pe-10">
                            <h2 className="text-white mb-5">How <span className="primary-clr">Kalmaashi was Born:</span> The Essence of Desire and Fulfilment </h2>
                            <p className="text-white mb-8">Kalmaashi, named after the celestial 'speckled cow' of legend, known for granting all desires, embodies the fulfilment of artistic yearning. From this mystical inspiration, Kalmaashi emerges as a crucible for the revival of India's forgotten art forms. Our foundation is built upon the desire to intertwine the elegance of ancient and modern artistry, creating a tapestry of cultural revival that enriches living spaces with beauty and wisdom.</p>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <div className="text-center">
                            <StaticImage 
                                src="../../images/about-us1.webp"
                                alt="aboutuspic" 
                                className="w-full" 
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center max-md:flex-col md:mb-20 max-md:mb-10">
                    <div className="md:w-1/2 max-md:order-2">
                        <div className="text-center">
                        <StaticImage 
                            src="../../images/hero.webp"
                            alt="aboutuspic" 
                            className="w-full" 
                        />
                        </div>
                    </div>
                    <div className="md:w-1/2 max-md:order-1">
                        <div className="md:ps-10">
                            <h2 className="text-white mb-5">Who is <span className="primary-clr">Kalmaashi?</span></h2>
                            <p className="text-white mb-8">Kalmaashi is a unique place where we keep traditional Indian art alive and give it a new spark. We are all about bringing the beauty and complexity of India's art history into today's world of luxury. Our goal is to provide a special platform for those who appreciate the rich and powerful art forms that come from our culture. By doing this, Kalmaashi serves as a bridge from the past to the present, blending the art from long ago with the high standards of art today. We make sure that the timeless art of India doesn't just survive but thrives, making it extraordinary.</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center max-md:flex-col">
                    <div className="md:w-1/2">
                        <div className="md:pe-10">
                            <h2 className="text-white mb-5"><span className="primary-clr">Our Vision:</span> A Beacon of Cultural Renaissance</h2>
                            <p className="text-white mb-8">Kalmaashi aspires to be the luminary of cultural rebirth, celebrating the opulence and depth of India's artistic heritage. We envision a future where the splendour of ancient crafts and contemporary art forms amalgamate, illuminating homes and hearts worldwide. Our vision extends beyond reviving forgotten art; we aim to integrate a diverse spectrum of artistry, focusing on quality, luxury, and the profound narrative of each piece.</p>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <div className="text-center">
                            <StaticImage
                                src="../../images/event-pic.webp"
                                alt="aboutuspic"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;