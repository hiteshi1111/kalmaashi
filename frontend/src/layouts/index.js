import React, { useEffect } from "react";
import { Link } from "gatsby";
import { FaStar, FaClock, FaRegEnvelope } from "react-icons/fa";
import { HiEmojiHappy } from "react-icons/hi";
import { MdLocationPin, MdPhone, MdPlayArrow } from "react-icons/md";
import { FaAnglesUp } from "react-icons/fa6";
import { StaticImage } from "gatsby-plugin-image";
import Provider from "../store";
import Header from "./header";
import { useLocation } from "react-use";
import infoData from "../data/info.json";
import useScrollPosition from "../hooks/useScrollPosition";
import FloatingActions from "../components/shared/floatingAction";
import SocialMedia from "../components/shared/socialMedia";

const Layout = ({ children }) => {

    const scrollPosition = useScrollPosition();

    const { pathname } = useLocation();

    // disable inspect on site + disable right click on site on windows
    useEffect(() => {
        const disableRightClick = (e) => {
            e.preventDefault();
        }
        document.addEventListener("contextmenu", disableRightClick);

        const disableKeys = (e) => {
            if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && e.keyCode === 73)) {
                e.preventDefault();
            }
        };
        document.addEventListener("keydown", disableKeys);

        return () => {
            document.removeEventListener("contextmenu", disableRightClick);
            document.removeEventListener("keydown", disableKeys);
        }
    }, [])

    // Disable Cmd + Option + I on Safari
    useEffect(() => {
        const disableDevTools = (e) => {
            if (e.metaKey && e.altKey && e.keyCode === 73) {
                e.preventDefault();
            }
        };
        document.addEventListener("keydown", disableDevTools);
        return () => {
            document.removeEventListener("keydown", disableDevTools);
        };
    }, []);

    const currentYear = new Date().getFullYear();

    const windowScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <Provider>
            <Header />
            {children}
            <footer className={pathname === "/talent-hunt-2024/" && "hidden"}>
                <div className="bg-[#160100]">
                    {/* Top Footer*/}
                    <div className="bg-[#160100] py-6"></div>
                    <div className="container mx-auto px-[15px] mt-[-44px]">
                        <div className='flex max-md:flex-col xl:gap-20 max-xl:gap-4'>
                            <div className="md:w-1/3 relative">
                                <div className="bg-[#fff] flex rounded-[10px] p-4">
                                    <FaStar className="mt-2 text-[#D4AF37] min-w-[40px] h-[38px]" />
                                    <div className="ml-[10px]">
                                        <h5 className="font-poppins font-semibold text-[#D4AF37]">5.0 Google My Business Rating</h5>
                                        <p className="">Out of 5 Stars, 1270 Reviews</p>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-1/3 relative">
                                <div className="bg-[#fff] flex rounded-[10px] p-4">
                                    <HiEmojiHappy className="mt-1 text-[#D4AF37] min-w-[46px] h-[46px]" />
                                    <div className="ml-[7px]">
                                        <h5 className="font-poppins font-semibold text-[#D4AF37]">100% Client Satisfaction Index</h5>
                                        <p>Out of  1500+ Global Clients</p>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-1/3 relative">
                                <div className="bg-[#fff] flex rounded-[10px] p-4">
                                    <FaClock className="mt-2 text-[#D4AF37] min-w-[36px] h-[36px]" />
                                    <div className="ml-[10px]">
                                        <h5 className="font-poppins font-semibold text-[#D4AF37]">150K+ Hrs Teaching Experience</h5>
                                        <p>Art Education Since 2014</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Footer*/}
                    <div className="container mx-auto px-[15px] md:pt-[70px] max-md:pt-[60px] md:pb-[50px] max-md:pb-[40px]">
                        <div className="flex md:gap-8 max-md:gap-10 max-md:flex-col">
                            <div className="md:w-1/4">
                                <div className="first-col-footer">
                                    <Link to="/" aria-label='Kalmaashi'>
                                        <StaticImage
                                            src="../images/k-logo-600.png"
                                            alt="logo"
                                            className="w-[190px]"
                                        />
                                    </Link>
                                    <p className="text-white mt-[20px] mb-[30px]">Art has been a great matter of interest in almost all the areas of the world, however with time the awareness about the richness of art has faded.</p>
                                    <div className="flex flex-wrap gap-2">
                                        <SocialMedia />
                                    </div>
                            </div>
                        </div>
                        {footerLinks.map((item, i) => (
                            <div key={i} className="md:w-1/4">
                                <div className="footer-links-col">
                                    <h4 className='text-white font-medium mb-2'>{item.title}</h4>
                                    <hr className='footer-hr-line' />
                                    <ul className="md:mt-[35px] max-md:mt-[24px]">
                                        {item.links.map((item, i) => (
                                            <li className='mb-[10px] text-white' key={i}>
                                                <Link className={`flex gap-2 cursor-pointer ${pathname === `${item.handle}/` ? "primary-clr" : ""}`} to={item.handle}>
                                                    <MdPlayArrow size={26} color="#D4AF37" className='' />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                        <div className="md:w-1/4">
                            <div className="footer-contact-info">
                                <h4 className='text-white font-medium mb-2'>Contact Info</h4>
                                <hr className='footer-hr-line' />
                                <ul className="md:mt-[35px] max-md:mt-[24px]">
                                    <li className='mb-[20px] text-white'>
                                        <div className="flex gap-1" >
                                            <MdLocationPin size={40} color="#D4AF37" className="min-w-[26px]" />
                                            <span>{infoData.address}</span>
                                        </div>
                                    </li>
                                    <li className='mb-[20px] text-white'>
                                        <Link to={`mailto:${infoData.email}`} className="flex gap-3 cursor-pointer" >
                                            <FaRegEnvelope size={20} color="#D4AF37" className="min-w-[20px]" />
                                            <span>{infoData.email}</span>
                                        </Link>
                                    </li>
                                    <li className='mb-[20px] text-white'>
                                        <Link to={`tel:${infoData.phone}`} className="flex gap-2 cursor-pointer">
                                            <MdPhone size={24} color="#D4AF37" className="min-w-[20px]" />
                                            <span>{infoData.phone}</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Bottom Footer*/}
            <div className="bg-[#ae7b4f]">
                <div className="container mx-auto px-[15px] py-[18px]">
                    <p className="text-white text-center text-[15px]">Copyright © {currentYear} by VP Ventures. All Rights Reserved</p>
                </div>
            </div>
            {scrollPosition > 600 && (
                <button
                    className='itms-center fixed group md:right-[30px] md:bottom-[50px] duration-500 right-[15px] bottom-[15px] bg-[#fff] hover:bg-[#ae7b4f] w-[50px] h-[50px] shadow-md rounded-[10px] shadow-[#000]'
                    onClick={windowScrollToTop}
                    aria-label="scroll to top"
                >
                    <FaAnglesUp className="text-[#ae7b4f] group-hover:text-white mx-auto text-xl" />
                </button>
            )}
            <FloatingActions />
        </footer>
        </Provider >
    )
};

const footerLinks = [
    {
        title: "Our Collections",
        links: [
            {
                title: "Bestsellers",
                handle: "/collection/bestsellers"
            },
            {
                title: "Featured",
                handle: "/collection/featured"
            },
            {
                title: "Oil Painting",
                handle: "/collection/abstract-art-oil-painting"
            },
            {
                title: "Glass Painting",
                handle: "/collection/abstract-art-glass-painting"
            },
            {
                title: "Religious",
                handle: "/collection/modern-art-religious"
            },
            {
                title: "Nature",
                handle: "/collection/modern-art-nature"
            }
        ]
    },
    {
        title: "Useful Links",
        links: [
            {
                title: "Our Events",
                handle: "/events"
            },
            {
                title: "Contact Us",
                handle: "/contact-us"
            },
            {
                title: "Blogs",
                handle: "/blog"
            },
            {
                title: "FAQs",
                handle: "/faq"
            },
            {
                title: "Privacy Policy",
                handle: "/privacy-policy"
            },
            {
                title: "Terms & Conditions",
                handle: "/terms-conditions"
            },
            {
                title: "Sitemap",
                handle: "/sitemap"
            }
        ]
    }
]

export default Layout;