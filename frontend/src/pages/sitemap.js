import React from 'react'
import Seo from '../components/shared/seo';
import InnerPageBanner from '../components/shared/InnerBanner';
import { Link } from 'gatsby';

const Sitemap = () => {
    return (
        <>
            <Seo title='Sitemap' />
            <InnerPageBanner title='Sitemap' maxWidth='472px' pages={pages} />
            <section className="s-py-sec">
                <div className="container !max-w-[1024px] m-auto px-[15px]">
                    <div className='flex flex-col items-center'>
                        <Link to="/" className='md:px-[40px] max-md:px-[20px] md:py-[10px] max-md:py-[8px] bg-[#D4AF37] text-white text-[15px]'>Home</Link>
                        <div className="h-[30px] border-l border-[#d4af37]"></div>
                        <div className="lg:w-[63.5%] max-lg:w-[632px] border-b border-[#d4af37]  max-md:hidden"></div>
                        <div className="grid md:grid-cols-6 max-md:grid-cols-2 max-md:gap-[10px] md:gap-[10px] max-md:border max-md:border-[#d4af37] max-md:p-4">
                            <div className="flex flex-col items-center">
                                <div className="h-[30px] border-l border-[#d4af37] max-md:hidden"></div>
                                <Link className="px-[5px] py-[10px] w-full text-center bg-[#D4AF37] text-white text-[15px]" to="/about-us">About Us</Link>
                                <div className="flex flex-col gap-y-[10px] max-md:hidden"></div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="h-[30px] border-l border-[#d4af37] max-md:hidden"></div>
                                <Link className="px-[5px] py-[10px] w-full text-center bg-[#D4AF37] text-white text-[15px]" to="/collection">Our Collection</Link>
                                <div className="flex flex-col gap-y-[10px] max-md:hidden max-md:hidden"></div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="h-[30px] border-l border-[#d4af37] max-md:hidden"></div>
                                <Link className="px-[5px] py-[10px] w-full text-center bg-[#D4AF37] text-white text-[15px]" to="/events">Our Events</Link>
                                <div className="flex flex-col gap-y-[10px] max-md:hidden"></div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="h-[30px] border-l border-[#d4af37] max-md:hidden"></div>
                                <Link className="px-[5px] py-[10px] w-full text-center bg-[#D4AF37] text-white text-[15px]" to="/blog">Blogs</Link>
                                <div className="flex flex-col gap-y-[10px] max-md:hidden"></div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="h-[30px] border-l border-[#d4af37] max-md:hidden"></div>
                                <Link className="px-[5px] py-[10px] w-full text-center bg-[#D4AF37] text-white text-[15px]" to="/faq">FAQ's</Link>
                                <div className="flex flex-col gap-y-[10px] max-md:hidden"></div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="h-[30px] border-l border-[#d4af37] max-md:hidden"></div>
                                <Link className="px-[5px] py-[10px] w-full text-center bg-[#D4AF37] text-white text-[15px]" to="/contact-us">Contact Us</Link>
                                <div className="flex flex-col gap-y-[10px] max-md:hidden"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

const pages = [
    {
        title: "Sitemap",
        handle: ""
    }
]

export default Sitemap;