import React, { useContext, useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-use';
import { FaUser, FaSearch, FaShoppingBag, FaEnvelope, FaTwitter, FaYoutube, FaInstagram, } from "react-icons/fa";
import { IoCall, IoMenu, IoClose } from "react-icons/io5";
import { Link, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { StoreContext } from '../store';
import { GetAll } from '../utils/getAll';
import { MdOutlineSearchOff } from "react-icons/md";
import infoData from "../data/info.json";
import { BiLogoFacebook } from "react-icons/bi";

const Header = () => {
    const { allShopifyProduct } = GetAll();
    const { pathname } = useLocation();
    const { cartQuantity, userData, searchKey, setSearchKey, filteredSearch, setFilteredSearch } = useContext(StoreContext);
    const [showSearch, setShowSearch] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const allProducts = allShopifyProduct.edges;
    const searchContainerRef = useRef(null);

    useEffect(() => {
        const key = searchKey.toLowerCase();
        if (searchKey.length > 0) {
            // let collectionFiltered = allCollection.filter(({ node }) => {
            //     return node?.title?.toLowerCase().includes(key);
            // }).map(({ node }) => ({ ...node, path: `/collection/` }));
            let productsFiltered = allProducts.filter(({ node }) => {
                return node?.title?.toLowerCase().includes(key) || node?.vendor?.toLowerCase().includes(key);
            }).map(({ node }) => ({ ...node, path: `/product/` }));
            // let blogsFiltered = allBlogs.filter(({ node }) => {
            //     return node?.title?.toLowerCase().includes(key) || node?.shortDescription?.toLowerCase().includes(key);
            // }).map(({ node }) => ({ ...node, path: `/blog/` }));
            // let eventsFiltered = allEvents.filter((node) => {
            //     return node?.title?.toLowerCase().includes(key);
            // }).map((node) => ({ title: node.title, path: `/events`, handle: "/" }));
            let filtered = [...productsFiltered];
            setFilteredSearch(filtered);
        } else {
            setFilteredSearch([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchKey, allProducts]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setShowSearch(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', openDrawer);
        return () => {
            document.body.classList.remove('overflow-visible');
        };
    }, [openDrawer]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (filteredSearch.length > 0){
                navigate("/search");
                setShowSearch(false);
            }
        }
    };

    return (
        <div className={`${pathname === "/" && "transparent-header-info"} ${pathname === "/talent-hunt-2024/" && "hidden"}`}>
            <header>
                {/* Top Header Info  */}
                <div className="max-lg:hidden relative z-10 border-b border-solid border-[#b48759]/[60%]">
                    <div className="container m-auto px-[15px] py-[8px] flex justify-between gap-4">
                        <div className="flex items-center">
                            <div className='flex items-center'>
                                <FaEnvelope className='text-[#D4AF37]' />
                                <Link 
                                    to={`mailto:${infoData.email}`} 
                                    className="ml-2 text-[#fff]/80 cursor-pointer max-xl:text-[14px]"
                                >{infoData.email}</Link>
                            </div>
                            <div className='flex items-center text-[#fff]/80'>
                                <span className='mx-4'>|</span>
                            </div>
                            <div className='flex items-center'>
                                <IoCall className='text-[#D4AF37]' />
                                <Link 
                                    to={`tel:${infoData.phone}`} 
                                    className="ml-2 text-[#fff]/80 cursor-pointer max-xl:text-[14px]"
                                >{infoData.phone}</Link>
                            </div>
                        </div>
                        <div className='items-center'>
                            <div className="flex flex-wrap gap-2">
                                <Link 
                                    to={infoData.facebook} 
                                    target="_blank" 
                                    aria-label='Facebook'
                                    className="flex justify-center items-center w-[30px] h-[30px] rounded-full hover:scale-[1.1] bg-primary-clr cursor-pointer"
                                ><BiLogoFacebook className='w-[20px] h-[20px] text-white' /></Link>
                                <Link 
                                    to={infoData.twitter} 
                                    target="_blank" 
                                    aria-label='Twitter'
                                    className="flex justify-center items-center w-[30px] h-[30px] rounded-full hover:scale-[1.1] bg-primary-clr cursor-pointer"
                                ><FaTwitter className='w-[16px] h-[16px] text-white' /></Link>
                                <Link 
                                    to={infoData.instagram} 
                                    target="_blank" 
                                    aria-label='Instagram'
                                    className="flex justify-center items-center w-[30px] h-[30px] rounded-full hover:scale-[1.1] bg-primary-clr cursor-pointer"
                                ><FaInstagram className='w-[16px] h-[16px] text-white' /></Link>
                                <Link 
                                    to={infoData.youtube} 
                                    target="_blank" 
                                    aria-label='Youtube'
                                    className="flex justify-center items-center w-[30px] h-[30px] rounded-full hover:scale-[1.1] bg-primary-clr cursor-pointer"
                                ><FaYoutube className='w-[16px] h-[16px] text-white' /></Link>
                            </div>
                            {/* <div className='flex items-center'>
                                <IoNavigate className='text-white' />
                                <span className="ml-2 text-[#fff] max-xl:text-[14px]">{infoData.address}</span>
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* Navbar Header Info  */}
                <div className="navbar-header-info w-full z-10 relative">
                    <div className="container m-auto px-[15px] py-[10px]">
                        <div className="flex justify-between items-center gap-4">
                            <Link to="/" aria-label='Kalmaashi'>
                                <StaticImage
                                    src="../images/k-logo-600.webp"
                                    alt="logo"
                                    className="2xl:w-[160px] max-2xl:w-[115px]"
                                />
                            </Link>
                            <nav className='primary-menu'>
                                <div className="lg:hidden">
                                    <button
                                        aria-label='Menu'
                                        className="block pointer text-[#fff] hover:text-[#fff] focus:text-[#fff] text-3xl focus:outline-none"
                                        onClick={() => setOpenDrawer(true)}
                                    >
                                        <IoMenu />
                                    </button>
                                </div>
                                <div className={`${openDrawer ? "block" : "hidden"} lg:flex items-center max-lg:pb-5 max-lg:fixed max-lg:left-0 max-lg:right-0 max-lg:top-0 max-lg:w-full max-lg:h-[100%] max-lg:bg-[#160100] max-lg:overflow-hidden max-lg:overflow-y-auto z-50`}>
                                    <div className="lg:hidden text-right p-3">
                                        <button
                                            aria-label='Close'
                                            className="pointer text-[#fff] hover:text-[#fff] focus:text-[#fff] text-3xl focus:outline-none"
                                            onClick={() => setOpenDrawer(false)}
                                        >
                                            <IoClose />
                                        </button>
                                    </div>
                                    <ul className="list-none lg:flex items-center flex-wrap lg:justify-end max-lg:text-center max-lg:pt-7 max-lg:mb-7">
                                        {navLinks.map((link, i) => (
                                            <li key={i} className="relative">
                                                <Link
                                                    to={link.handle}
                                                    onClick={() => setOpenDrawer(false)}
                                                    className={`text-[#fff] inline-block px-[15px] py-[5px] hover:primary-clr ${pathname === `${link.handle}/` && "primary-clr"}`}
                                                >{link.title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="lg:hidden flex gap-[24px] max-lg:justify-center lg:ml-10 lg:me-[15px] items-center">
                                        <div className='flex gap-[10px] items-center relative'>
                                            <button
                                                aria-label='search'
                                                onClick={() => {
                                                    setShowSearch(prev => !prev);
                                                    setSearchKey("");
                                                    setFilteredSearch([]);
                                                }}
                                                className="text-[#fff] hover:primary-clr cursor-pointer"><FaSearch />
                                            </button>
                                            <div ref={searchContainerRef} className={`ease-in-out duration-300 max-md:max-w-[208px] absolute bg-light-clr lg:right-[-20px] max-lg:left-[-56px] top-[35px] rounded-full  before:content-[""] before:absolute before:w-[0px] before:h-[0px] lg:before:right-[20px] max-lg:before:left-[56px] before:top-[-9px] before:border-l-[7px] before:border-l-[transparent] before:border-solid before:border-r-[7px] before:border-r-[transparent] before:border-b-[10px] before:border-r-[#fff] ${showSearch ? "opacity-100 translate-y-[0%]" : "opacity-0 translate-y-[-30%]"}`}>
                                                <input
                                                    type="text"
                                                    placeholder='Search...'
                                                    value={searchKey}
                                                    onChange={(e) => setSearchKey(e.target.value)}
                                                    maxLength={30}
                                                    className={`h-[40px] border bg-light-clr text-white caret-white px-[15px] text-[14px] rounded-[30px] transition-all duration-300 max-md:max-w-[208px]`}
                                                />
                                                <div className={`-z-10 px-[10px] absolute top-[20px] left-0 bg-light-clr text-white w-[100%] max-h-[200px] overflow-y-auto grid ${showSearch ? "block" : "hidden"} ${filteredSearch.length > 0 && "pt-7"}`}>
                                                    {filteredSearch.length > 0 && filteredSearch.map((item, i) => (
                                                        <Link
                                                            key={i}
                                                            to={`${item.path}${item.handle}`}
                                                            onClick={() => setOpenDrawer(false)}
                                                            className='py-[10px] text-[14px] border-b last:border-none border-[#aaa] px-[5px]'
                                                        >{item.title}</Link>
                                                    ))}
                                                    {searchKey.length > 3 && filteredSearch.length === 0 && (
                                                        <p className='pt-10 pb-[10px] text-[14px] justify-between border-b last:border-none border-[#aaa] px-[5px] justify-center flex items-center'>No Results <MdOutlineSearchOff size={20} /> </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <Link 
                                            to={userData ? "/account" : "/login"} 
                                            onClick={() => setOpenDrawer(false)} 
                                            aria-label={userData ? "account" : "login"}
                                            className="text-[#fff] hover:primary-clr cursor-pointer"
                                        ><FaUser /></Link>
                                        <Link to="/cart" onClick={() => setOpenDrawer(false)} className="relative text-[#fff] hover:primary-clr cursor-pointer">
                                            <FaShoppingBag />
                                            <span className="absolute text-[14px] top-[-13px] left-[10px] bg-[#D4AF37] text-black h-[20px] w-[20px] flex justify-center items-center rounded-full select-none">{cartQuantity}</span>
                                        </Link>
                                    </div>
                                </div>
                            </nav>
                            <div className="max-lg:hidden flex gap-[24px] max-lg:justify-center lg:ml-10 lg:me-[15px] items-center">
                                <div className='flex gap-[10px] items-center relative'>
                                    <button
                                        aria-label='search'
                                        onClick={() => {
                                            setShowSearch(prev => !prev);
                                            setSearchKey("");
                                            setFilteredSearch([]);
                                        }}
                                        className="text-[#fff] hover:primary-clr cursor-pointer"><FaSearch />
                                    </button>
                                    <div ref={searchContainerRef} className={`ease-in-out duration-300 max-md:max-w-[208px] absolute bg-light-clr lg:right-[-20px] max-lg:left-[-56px] top-[35px] rounded-full  before:content-[""] before:absolute before:w-[0px] before:h-[0px] lg:before:right-[20px] max-lg:before:left-[56px] before:top-[-9px] before:border-l-[7px] before:border-l-[transparent] before:border-solid before:border-r-[7px] before:border-r-[transparent] before:border-b-[10px] before:border-r-[#fff] ${showSearch ? "opacity-100 translate-y-[0%]" : "opacity-0 translate-y-[-30%]"}`}>
                                        <input
                                            type="text"
                                            placeholder='Search...'
                                            value={searchKey}
                                            onChange={(e) => setSearchKey(e.target.value)}
                                            maxLength={30}
                                            onKeyPress={handleKeyPress}
                                            className={`h-[40px] border bg-light-clr text-white caret-white px-[15px] text-[14px] rounded-[30px] transition-all duration-300 max-md:max-w-[208px]`}
                                        />
                                        <div className={`-z-10 px-[10px] absolute top-[20px] left-0 bg-light-clr text-white w-[100%] max-h-[200px] overflow-y-auto grid ${showSearch ? "block" : "hidden"} ${filteredSearch.length > 0 && "pt-7"}`}>
                                            {filteredSearch.length > 0 && filteredSearch.map((item, i) => (
                                                <Link
                                                    key={i}
                                                    to={`${item.path}${item.handle}`}
                                                    onClick={() => setShowSearch(false)}
                                                    className='py-[10px] text-[14px] border-b last:border-none border-[#aaa] px-[5px]'
                                                >{item.title}</Link>
                                            ))}
                                            {searchKey.length > 3 && filteredSearch.length === 0 && (
                                                <p className='pt-10 pb-[10px] text-[14px] justify-between border-b last:border-none border-[#aaa] px-[5px] justify-center flex items-center'>No Results <MdOutlineSearchOff size={20} /> </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <Link to={userData ? "/account" : "/login"} onClick={() => setOpenDrawer(false)} className="text-[#fff] hover:primary-clr cursor-pointer"><FaUser /></Link>
                                <Link to="/cart" onClick={() => setOpenDrawer(false)} className="relative text-[#fff] hover:primary-clr cursor-pointer">
                                    <FaShoppingBag />
                                    <span className="absolute text-[14px] top-[-13px] left-[10px] bg-[#D4AF37] text-black h-[20px] w-[20px] flex justify-center items-center rounded-full select-none">{cartQuantity}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

const navLinks = [
    {
        title: "OUR COLLECTION",
        handle: "/collection"
    },
    {
        title: "OUR EVENTS",
        handle: "/events"
    },
    {
        title: "OUR ARTISTS",
        handle: "/our-artists"
    },
    {
        title: "ABOUT US",
        handle: "/about-us"
    },
    {
        title: "CONTACT US",
        handle: "/contact-us"
    }
]

export default Header;