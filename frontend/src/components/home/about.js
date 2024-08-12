import React, { useState } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import Cta from '../custom/cta';

const About = ({action=false}) => {
    const [ show, setShow ] = useState(false);
    return (
        <>
        <section className="s-py-sec about-page-section bg-[#29251e]">
            <div className="container m-auto px-[15px]">
                <div className="flex md:gap-10 max-md:gap-10 max-md:flex-col items-center">
                    <div className="md:w-1/2 max-md:order-1">
                        <div className="">
                            <h1 className="h2 text-white mb-5">About <span className="primary-clr">Us</span></h1>
                            <div className=''>
                                <span 
                                    className={`text-white`} 
                                    dangerouslySetInnerHTML={{ __html: show ? content : content.slice(0, 494)}}
                                />
                                <span onClick={() => setShow(prev => !prev)} className='text-[#ae7b4f] hover:underline cursor-pointer'>{show ? " Read Less" : "... Read More"}</span>
                            </div>
                            {action && (
                                <Cta 
                                    title='Explore Now'
                                    handle='/about-us' 
                                    className='mt-[30px]'
                                />
                            )}
                        </div>
                    </div>
                    <div className="md:w-1/2 max-md:order-2">
                        <div className="text-center">
                            <StaticImage 
                                src="../../images/painting-full-img.webp"
                                alt="productfirst" 
                                className="w-full max-w-[600px] mx-auto" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="s-py-sec s-pt-sec about-page-section bg-[#29251e]">
            <div className="container m-auto px-[15px]">
                <div className="flex md:gap-10 max-md:gap-10 max-md:flex-col items-center">
                    <div className="md:w-1/2 max-md:order-2">
                        <div className="text-center">
                            <StaticImage 
                                src="../../images/big-well-pic.webp"
                                alt="productfirst" 
                                className="w-full " 
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2 max-md:order-1">
                        <div className="">
                            <h1 className="h2 text-white mb-5">How <span className="primary-clr">Kalmaashi was Born:</span> The Essence of Desire and Fulfilment </h1>
                            <p className="text-white mb-[40px]">Kalmaashi, named after the celestial 'speckled cow' of legend, known for granting all desires, embodies the fulfilment of artistic yearning. From this mystical inspiration, Kalmaashi emerges as a crucible for the revival of India's forgotten art forms. Our foundation is built upon the desire to intertwine the elegance of ancient and modern artistry, creating a tapestry of cultural revival that enriches living spaces with beauty and wisdom.</p>
                            {action && (
                                <Cta title='Explore Now' handle='/about-us' />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

const content = "Kalmaashi, inspired by the legendary celestial 'speckled cow' that grants wishes, symbolises achieving artistic dreams. This chronicle represents the concept of endless potential and creativity, which echo’s Kalmaashi's aim. We have evolved from the ashes of artistry which had faded and was forgotten long ago and  has an endeavour to represent the rich and cultural artistry of India. India's rich art forms, many of which have shrunk or been forgotten over time due to various socio-economic and cultural shifts, find a saviour in Kalmaashi. We are a unique haven where we keep traditional Indian art forms alive and give them a new lease on life. We are all about bringing the beauty and complexity of India's art history into today's world of luxury. <br/><br/>Kalmaashi is not just a name; it's a promise of luxury, depth, and intensity. Each curated piece reflects our dedication to the royal essence of art, incarnating the opulence and profound emotion that Kalmaashi stands for. Kalmashi represents craftsmanship as its soul, where we are committed to save the traditions of our originators but have goals set on the heights of modern innovation. In short, Kalmaashi is a bridge between the majesty of bygone times and today's luxury.<br/><br/>Kalmaashi's efforts in cultural revival also have an educational dimension. By exposing people to the diverse art forms of India, the foundation educates the public about the country's artistic heritage, encouraging a sense of pride and ownership. We understand that our words are a reflection of our passion and dedication to art and its patrons."

export default About;
