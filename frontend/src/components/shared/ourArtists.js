import React from 'react'
import { StaticImage } from 'gatsby-plugin-image';
import Cta from '../custom/cta';

const OurTeam = () => {
    return (
        <>
            <section className="s-py-sec s-pt-sec our-team-section">
                <div className="container mx-auto">
                    <div className="flex flex-wrap">
                        <div className="w-full">
                            <div className="mx-auto md:mb-[50px] max-md:mb-[20px] max-w-[600px] text-center">
                                <span className="text-[#D4AF37] mb-2 block font-semibold">Our Artists</span>
                                <h2 className="text-white mb-3">Meet Our Artists</h2>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center md:mb-[15px]">
                        <div className="w-full px-4 md:w-1/2 xl:w-1/4">
                            <div className="mx-auto md:mb-10 max-md:mb-6 w-full max-w-[370px]">
                                <div className="relative overflow-hidden rounded-lg">
                                    <StaticImage src="https://cdn.tailgrids.com/1.0/assets/images/team/team-01/image-01.jpg" alt="Artist image" className="w-full h-[400px]"/>
                                    <div className="absolute bottom-5 left-0 w-full text-center">
                                        <div className="relative mx-5 overflow-hidden rounded-lg bg-white py-4 px-3">
                                            <h5 className="text-black font-semibold">Coriss Ambady</h5>
                                            <p className="text-black text-sm">Department of Arts</p>
                                            <div>
                                                <span className="absolute left-0 bottom-0">
                                                    <StaticImage src='../../images/team-cirpic.svg' alt="cirpic icon" />
                                                </span>
                                                <span className="absolute top-0 right-0">
                                                    <StaticImage src='../../images/dottteam-icon.svg' alt="dots icon" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2 xl:w-1/4">
                            <div className="mx-auto md:mb-10 max-md:mb-6 w-full max-w-[370px]">
                                <div className="relative overflow-hidden rounded-lg">
                                    <StaticImage src="https://cdn.tailgrids.com/1.0/assets/images/team/team-01/image-02.jpg" alt="Artist image" className="w-full h-[400px]" />
                                    <div className="absolute bottom-5 left-0 w-full text-center">
                                        <div className="relative mx-5 overflow-hidden rounded-lg bg-white py-4 px-3">
                                            <h5 className="text-black font-semibold">Glorius Cristian</h5>
                                            <p className="text-black text-sm">Art Critic</p>
                                            <div>
                                                <span className="absolute left-0 bottom-0">
                                                    <StaticImage src='../../images/team-cirpic.svg' alt="cirpic icon" />
                                                </span>
                                                <span className="absolute top-0 right-0">
                                                    <StaticImage src='../../images/dottteam-icon.svg' alt="dots icon" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2 xl:w-1/4">
                            <div className="mx-auto md:mb-10 max-md:mb-6 w-full max-w-[370px]">
                                <div className="relative overflow-hidden rounded-lg">
                                    <StaticImage src="https://cdn.tailgrids.com/1.0/assets/images/team/team-01/image-03.jpg" alt="Artist image" className="w-full h-[400px]" />
                                    <div className="absolute bottom-5 left-0 w-full text-center">
                                        <div className="relative mx-5 overflow-hidden rounded-lg bg-white py-4 px-3">
                                            <h5 className="text-black font-semibold">Jackie Sanders</h5>
                                            <p className="text-black text-sm">Art Critic</p>
                                            <div>
                                                <span className="absolute left-0 bottom-0">
                                                    <StaticImage src='../../images/team-cirpic.svg' alt="cirpic icon" />
                                                </span>
                                                <span className="absolute top-0 right-0">
                                                    <StaticImage src='../../images/dottteam-icon.svg' alt="dots icon" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2 xl:w-1/4">
                            <div className="mx-auto md:mb-10 max-md:mb-6 w-full max-w-[370px]">
                                <div className="relative overflow-hidden rounded-lg">
                                    <StaticImage src="https://cdn.tailgrids.com/1.0/assets/images/team/team-01/image-04.jpg" alt="Artist image" className="w-full h-[400px]" />
                                    <div className="absolute bottom-5 left-0 w-full text-center">
                                        <div className="relative mx-5 overflow-hidden rounded-lg bg-white py-4 px-3">
                                            <h5 className="text-black font-semibold">Nikolas Brooten</h5>
                                            <p className="text-black text-sm">Art Critic</p>
                                            <div>
                                                <span className="absolute left-0 bottom-0">
                                                    <StaticImage src='../../images/team-cirpic.svg' alt="cirpic icon" />
                                                </span>
                                                <span className="absolute top-0 right-0">
                                                    <StaticImage src='../../images/dottteam-icon.svg' alt="dots icon"  />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-center'>
                        <Cta 
                            title="Meet Our Artists"
                            handle='/our-artists'
                            className='w-full max-w-[210px]'
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default OurTeam
