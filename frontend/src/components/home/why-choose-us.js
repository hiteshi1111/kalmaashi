import React from 'react'
import Cta from '../custom/cta';
import choosebg from "../../images/choose-bg123.jpg"
import { StaticImage } from 'gatsby-plugin-image';
import { FaStar, FaPaintBrush } from "react-icons/fa";


const WhyChooseUs = () => {
    return (
        <>
            <section className="s-py-sec s-pt-sec">
                <div className="container mx-auto px-[15px]">
                    <div className="flex md:gap-10 max-md:gap-10 max-md:flex-col h-full">
                        <div className="md:w-1/2">
                            <div className="h-full flex justify-center flex-col bg-[#29251e] lg:px-[50px] max-lg:px-[20px] lg:py-[70px] max-lg:py-[50px] bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${choosebg})` }}>
                                <h3 className='text-white mb-[10px]'>What Sets Us Apart?</h3>
                                <p className='text-white mb-[20px]'>Kalmaashi provides you with a platform, where you not only get the chance to show your creativity but also get exquisite artworks like paintings, sculptures, hand crafts etc from sophisticated and gifted artists around the globe. We have a lot more for you to offer.</p>
                                <ul className='mb-[30px]'>
                                    <li className='text-white flex items-baseline gap-[5px] mb-[10px]'><span className='mr-[5px]'><FaPaintBrush className='text-[#D4AF37]' /></span>Global Arena for Artistic Collaboration.</li>
                                    <li className='text-white flex items-baseline gap-[5px] mb-[10px]'><span className='mr-[5px]'><FaPaintBrush className='text-[#D4AF37]' /></span>Diverse artforms-one roof.</li>
                                    <li className='text-white flex items-baseline gap-[5px] mb-[10px]'><span className='mr-[5px]'><FaPaintBrush className='text-[#D4AF37]' /></span>Artistic hub for all.</li>
                                    <li className='text-white flex items-baseline gap-[5px] mb-[10px]'><span className='mr-[5px]'><FaPaintBrush className='text-[#D4AF37]' /></span>Supporting Creators.</li>
                                    <li className='text-white flex items-baseline gap-[5px] mb-[10px]'><span className='mr-[5px]'><FaPaintBrush className='text-[#D4AF37]' /></span>Material Diversity, Creative Liberty.</li>
                                    <li className='text-white flex items-baseline gap-[5px] mb-[10px]'><span className='mr-[5px]'><FaPaintBrush className='text-[#D4AF37]' /></span>Revival of forgotten art forms.</li>
                                </ul>
                                <div>
                                    <Cta title='Discover Now' handle='/testimonial'/>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="h-full flex justify-center flex-col bg-[#29251e] lg:px-[50px] max-lg:px-[20px] lg:py-[70px] max-lg:py-[50px]">
                                <h3 className='text-white mb-[30px]'>What Clients Say</h3>
                                <div className="">
                                    <div className='mb-[20px]'>
                                        <ul className='flex gap-[1px]'>
                                            <li><FaStar className='text-[#D4AF37] text-[20px]' /></li>
                                            <li><FaStar className='text-[#D4AF37] text-[20px]' /></li>
                                            <li><FaStar className='text-[#D4AF37] text-[20px]' /></li>
                                            <li><FaStar className='text-[#D4AF37] text-[20px]' /></li>
                                            <li><FaStar className='text-[#D4AF37] text-[20px]' /></li>
                                        </ul>
                                    </div>
                                    <div className='mb-[30px]'>
                                        <p className='text-white italic md:text-[18px]'>"Working with Kalmaashi Art Painting was an absolute delight from start to finish. Their personalized approach and attention to detail made the entire process effortless. The final artwork exceeded my expectations and added a touch of elegance to my space. I highly recommend them to anyone seeking exquisite artistry."</p>
                                    </div>
                                    <div className='flex gap-[15px] items-center'>
                                        <div>
                                            <StaticImage
                                            src="../../images/testimonial-pic1.webp"
                                            alt="productfirst"
                                            className="md:w-[90px] md:min-w-[90px] md:h-[90px] max-md:w-[60px] max-md:min-w-[60px] max-md:h-[60px] m-auto"
                                        />
                                        </div>
                                        <div>
                                            <h5 className='text-[#D4AF37]'>James W.</h5>
                                            <p className='text-white text-sm'>Featured Artist</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default WhyChooseUs
