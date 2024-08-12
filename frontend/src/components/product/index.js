import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import ReactPaginate from 'react-paginate';
import SaleTag from '../shared/saleTag';
import { numberWithCommas } from '../../utils/numberWithCommas';

const Product = ({products}) => {
    const itemsPerPage = 8;
    const [itemOffset, setItemOffset] = useState(0);
    const [ currentPage, setCurrentPage ] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);
    
    const handlePageClick = (event) => {
        setCurrentPage(event.selected)
        const newOffset = (event.selected * itemsPerPage) % products.length;
        setItemOffset(newOffset);
    };

    return (
        <section className="s-py-sec product-tabs-section">
            <div className="container m-auto px-[15px]">
                <Items currentItems={currentItems} />
            </div>
            <div className='w-full flex justify-center mt-[80px]'>
                <ReactPaginate
                    breakLabel="..."
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}  
                    pageCount={pageCount}
                    previousLabel={<FaArrowLeftLong size={20} className={`mr-[10px] ${currentPage !== 0 && "text-[#D4AF37]"}`} />}
                    nextLabel={<FaArrowRightLong size={20} className={`ml-[10px]`} />}
                    renderOnZeroPageCount={null}
                    className="text-white flex"
                    previousClassName='flex items-center'
                    nextClassName='flex items-center'
                    pageLinkClassName='select-none bg-black h-[35px] w-[40px] flex justify-center items-center rounded-[2px] cursor-pointer text-[18px] mx-[5px]'
                    activeLinkClassName="!bg-[#D4AF37] h-[35px] w-[40px] flex justify-center items-center rounded-[2px] cursor-pointer text-[18px]"
                />
            </div>
        </section>
    )
}

function Items({ currentItems }) {
    return (
        currentItems.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-8 max-md:gap-10'>
                {currentItems.map((product, i) => (
                    <Link key={i} className="w-full" to={`/product/${product.handle}`} aria-label={product.title} >
                        <div className="product-list">
                            <div className="relative overflow-hidden">
                                {product.variants[0].compareAtPrice > product.variants[0].price && (
                                    <SaleTag />
                                )}
                                <div className="cursor-pointer relative pt-[140%]">
                                    <GatsbyImage 
                                        image={product.featuredImage.gatsbyImageData}
                                        alt={product.featuredImage.altText}
                                        className="w-full h-full object-center object-cover !absolute top-0 left-0"
                                    />
                                </div>      
                                <div className="quick-view-btn absolute left-0 right-0 bottom-[0]">
                                    <button aria-label='Quick View' className='bg-primary-clr text-white w-full text-center px-4 py-2 cursor-pointer'>Quick View</button>
                                </div>
                            </div>
                            <div className="prt-title mt-4">
                                <h5 className="text-white text-center font-poppins font-size-18">{product.title}</h5>
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
                                    <p className={`text-white font-medium font-size-18 text-center`}>
                                        {product.variants[0].compareAtPrice > product.variants[0].price && (
                                            <span className='prd-strike text-[#9B9B9B] line-through pe-[5px]'>INR {numberWithCommas(product.variants[0].compareAtPrice)}</span>
                                        )}
                                        <span className='reqular-price'>INR {numberWithCommas(product.variants[0].price)}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        ):(
            <p className='text-white text-center w-full'>Nothing to show!</p>
        )
    );
}

export default Product;