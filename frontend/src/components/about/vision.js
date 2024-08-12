import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';

const Vision = () => {
    return (
        <section className="s-py-sec">
            <div className="container m-auto px-[15px]">
                <div className="flex items-center max-md:flex-col md:mb-20 max-md:mb-10">
                    <div className="md:w-1/2 max-md:order-2">
                        <div className="text-center">
                            <StaticImage
                                src="../../images/ourvision.webp"
                                alt="aboutuspic"
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2 max-md:order-1">
                        <div className="md:ps-10">
                            <h2 className="text-white mb-5"><span className="primary-clr">Our Mission:</span> The Heart of Kalmaashi</h2>
                            <p className="text-white mb-8">At the core of Kalmaashi's existence is a commitment to educate, inspire, and enrich lives by bridging the gap between India's rich artistic legacy and contemporary aesthetics. We pledge to uphold sustainability, authenticity, and excellence, ensuring every art piece we curate not only decorates a space but also narrates the rich history and unsung stories of its creators. Kalmaashi stands as a guardian of tradition, celebrating the depth and intensity of Indian artistry.</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center max-md:flex-col md:mb-20 max-md:mb-10">
                    <div className="md:w-1/2">
                        <div className="md:pe-10">
                            <h2 className="text-white mb-5"><span className="primary-clr">Our Goal:</span> Crafting the Future of Art</h2>
                            <p className="text-white mb-8">Kalmaashi is dedicated to achieving our vision and mission through comprehensive educational outreach and public engagement. We are committed to empowering artisans, providing them with a royal platform to showcase their work, sustain their livelihoods, and keep their rich traditions thriving. Our goal is to cultivate a deeper appreciation and understanding of these artistic treasures, ensuring their legacy endures for future generations.</p>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <div className="text-center">
                            <StaticImage
                                src="../../images/ourcommunity.webp"
                                alt="aboutuspic"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center max-md:flex-col max-md:flex-col md:mb-20 max-md:mb-10">
                    <div className="md:w-1/2 max-md:order-2">
                        <div className="text-center">
                            <StaticImage
                                src="../../images/collection-img-three.webp"
                                alt="aboutuspic"
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2 max-md:order-1">
                        <div className="md:ps-10">
                            <h2 className="text-white mb-5">The Royal, Opulent Essence of Kalmaashi</h2>
                            <p className="text-white mb-8">Kalmaashi is not just a name; it's a promise of luxury, depth, and intensity. Each curated piece reflects our dedication to the royal essence of art, embodying the opulence and profound emotion that Kalmaashi stands for. Our commitment to authenticity and excellence is unwavering, as we aim to connect deeply with our audience, offering more than just art but a rich, emotional experience.</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center max-md:flex-col">
                    <div className="md:w-1/2">
                        <div className="md:pe-10">
                            <h2 className="text-white mb-5">Our Commitment to You</h2>
                            <p className="text-white mb-4">Kalmaashi is a bridge between the past's grandeur and today's luxury. We understand that our words are a reflection of our passion and dedication to art and its patrons. As curators of India's artistic heritage, we take our role seriously, ensuring that each interaction with Kalmaashi is meaningful, enriching, and reflective of our deep commitment to artistry and elegance.</p>
                            <p className='text-white mb-8'>We invite you to explore Kalmaashi and experience the pinnacle of luxury and cultural revival. Join us in our journey to redefine the appreciation of art, making every creation a witness to the timeless beauty and profound depth of India's artistic legacy.</p>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <div className="text-center">
                            <StaticImage
                                src="../../images/about-us03.jpg"
                                alt="aboutuspic"
                                className="w-full md:h-[500px] max-md:h-[300px]"
                            />
                        </div>
                    </div>
                </div>


            </div>
        </section>
    )
}

export default Vision;