import React, { useContext } from 'react'
import { StoreContext } from '../store';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { FaStar } from "react-icons/fa";
import InnerPageBanner from '../components/shared/InnerBanner';

const Search = () => {
    const { searchKey, filteredSearch } = useContext(StoreContext);
    // function resetHandler() {
    //     setSearchKey("");
    //     setFilteredSearch([])
    // }
    const pages = [
        {
            title: "Search",
            handle: ""
        }
    ]
    return (
        <>
        <InnerPageBanner 
            title={filteredSearch.length === 0 ? "No results" : `Searched ${filteredSearch.length} Results for "${searchKey}"`} 
            pages={pages}
        />
        <section className="s-py-sec">
            <div className='container m-auto px-[15px]'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-8 max-md:gap-10'>
                {filteredSearch.length>0 && filteredSearch.map((item, i) => (
                    <Link to={`/product/${item.handle}`} className="w-full">
                     <div className="product-list">
                            <div className="relative overflow-hidden">
                                <div className="cursor-pointer relative pt-[140%]">
                                    <GatsbyImage image={item.featuredImage.gatsbyImageData}  alt={item.title}
                                    className="w-full h-full object-center object-cover !absolute top-0 left-0"/>
                                </div>      
                                <div className="quick-view-btn absolute left-0 right-0 bottom-[0]">
                                    <button aria-label='Quick View' className='bg-primary-clr text-white w-full text-center px-4 py-2 cursor-pointer'>Quick View</button>
                                </div>
                            </div>
                            <div className="prt-title mt-4">
                                <h5 className="text-white text-center font-poppins font-size-18">{item.title}</h5>
                                <div className='prd-reviews-start my-2'>
                                    <ul className='flex justify-center gap-[1px]'>
                                        <li><FaStar className='text-[#D4AF37] text-[20px]' /></li>
                                        <li><FaStar className='text-[#D4AF37] text-[20px]' /></li>
                                        <li><FaStar className='text-[#D4AF37] text-[20px]' /></li>
                                        <li><FaStar className='text-[#D4AF37] text-[20px]' /></li>
                                        <li><FaStar className='text-[#D4AF37] text-[20px]' /></li>
                                    </ul>
                                </div>
                                <div className='prd-price'>
                                    <p className='text-white text-center'>INR {item.variants[0].price}</p>
                                </div>
                            </div>
                        </div>
                     </Link>
                     ))}
                </div>
            </div>



            {/* <h3 className='text-white text-center mb-[30px]'>Searched {filteredSearch.length} Results for "{searchKey}"</h3> */}
            {/* <div className='flex gap-[10px] max-w-[700px] mx-auto'>
                <TextInput 
                    value={searchKey}
                    placeholder='search'
                    onChange={(e) => setSearchKey(e.target.value)}
                    className='rounded-none'
                />
                <button className='bg-[#D4AF37] text-white h-[45px] w-[200px]'>
                    Search
                </button>
            </div> */}
            {/* <div className='grid grid-cols-4 mt-[50px] gap-[30px]'>
                {filteredSearch.length>0 && filteredSearch.map((item, i) => (
                    <Link to={`/product/${item.handle}`} >
                        <GatsbyImage 
                            image={item.featuredImage.gatsbyImageData}
                            alt={item.title}
                        />
                        <h4 className='text-white'>{item.title}</h4>
                    </Link>
                ))}
            </div> */}
        </section>
        </>
    )
}

export default Search;