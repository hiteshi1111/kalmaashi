import React, { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import { GatsbyImage } from 'gatsby-plugin-image';
import QuantityButton from '../components/custom/quantityButton';
import AddToCart from '../components/custom/addToCart';
// import BuyNow from '../components/custom/buyNow';
import Toastify from '../components/shared/toastify';
import { numberWithCommas } from '../utils/numberWithCommas';
import { GetAll } from '../utils/getAll';
import SaleTag from '../components/shared/saleTag';
import { Link } from 'gatsby';
import Seo from '../components/shared/seo';

const Product = ({ pageContext }) => {
    const [quantity, setQuantity] = useState(1);
    const [success, setSuccess] = useState(false);
    const { allShopifyProduct } = GetAll();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccess(false);
            setMessage("");
        }, 2000);
        return () => clearTimeout(timer);
    }, [success])

    useEffect(() => {
        const filtered = allShopifyProduct.edges.filter(({ node }) => {
            return (
                node.handle !== pageContext.data.handle &&
                !node.collections.some(collection => collection.title === "Blogs" || collection.title === "Events")
            );
        })
        setFilteredProducts(filtered.slice(0, 4))
    }, [allShopifyProduct, pageContext])

    return (
        <>
            <Seo title={pageContext.data.title} />
            {/* Products Section */}
            <section className="relative s-py-sec max-md:pt-[30px]">
                <Toastify
                    message={message}
                    className={`ease-in duration-300 ${success ? "opacity-100 translate-x-[0%]" : "opacity-0 translate-x-[100%]"} ${!message.includes("Added to Cart") && "bg-[#FF0000]"}`}
                />
                <div className="container m-auto px-[15px]">
                    <div className="flex md:gap-8 max-md:gap-10 max-md:flex-col mb-10">
                        <div className="md:w-1/2">
                            <div className="cursor-pointer relative scroll-barcss-info max-md:flex max-md:flex-nowrap max-md:gap-[15px]">
                                {pageContext.data.media.map((item, i) => (
                                    <GatsbyImage
                                        image={item.image.gatsbyImageData}
                                        alt='images'
                                        className="w-full block mb-[20px] max-md:min-w-[80%]"
                                    />
                                ))}
                                {/* <GatsbyImage 
                                    image={pageContext.data.featuredImage.gatsbyImageData}
                                    alt={pageContext.data.featuredImage.altText}
                                    className="w-full h-full !absolute object-center object-contain top-0 left-0" 
                                /> */}
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="md:sticky md:top-[50px]">
                                <h3 className='text-[#D4AF37] mb-4'>{pageContext.data.title}</h3>
                                <div className='prd-price mb-5 text-white font-medium font-size-18'>
                                    {pageContext.data.variants[0].compareAtPrice > pageContext.data.variants[0].price && (
                                        <span className='prd-strike text-[#9B9B9B] line-through pe-[5px]'>INR {numberWithCommas(pageContext.data.variants[0].compareAtPrice)}</span>
                                    )}
                                    <span className='reqular-price'>INR {numberWithCommas(pageContext.data.variants[0].price)}</span>
                                </div>
                                <hr className='border-y border-[#333]' />
                                {/* <p className='text-white mt-5 mb-5'>Discover the rich tapestry of culture, heritage, and creativity at the Kalmashi Art and History Museum. Nestled in the heart of India, our museum stands as a beacon of enlightenment, inviting you to embark on a captivating....</p> */}
                                <ul className='my-5'>
                                    <li className='text-white mb-1'><span className='font-medium'>Artwork code:</span> IY1613</li>
                                    <li className='text-white mb-1'><span className='font-medium'>Painting:</span> Acrylic on Board</li>
                                    <li className='text-white mb-1'><span className='font-medium'>Size:</span> 22.0 X 30.0 inch (WxH)</li>
                                    <li className='text-white mb-1'><span className='font-medium'>Art by:</span> {pageContext.data.vendor}</li>
                                    <li className='text-white mb-1'><span className='font-medium'>Artist certificate:</span> Available</li>
                                    <li className='text-white mb-1'><span className='font-medium'>Created in:</span> 2023</li>
                                    <li className='text-white mb-1'><span className='font-medium'>Original artwork:</span> Yes</li>
                                    <li className='text-white mb-1'><span className='font-medium'>Print Available:</span> No</li>
                                    <li className='text-white mb-1'><span className='font-medium'>In stock:</span> {pageContext.data.variants[0].inventoryQuantity}</li>

                                </ul>
                                <hr className='border-y border-[#333]' />
                                <div className='prd-qty mt-5'>
                                    <h5 className='text-white mb-2 font-poppins'>Quantity:</h5>
                                    <div className='qty-info flex max-w-[160px]'>
                                        <QuantityButton
                                            quantity={quantity}
                                            setQuantity={setQuantity}
                                            totalAvailable={pageContext.data.variants[0].inventoryQuantity}
                                            shopifyId={pageContext.data.variants[0].shopifyId}
                                        />
                                    </div>

                                </div>
                                <div className='flex flex-wrap gap-4 mt-10'>
                                    <AddToCart
                                        title='Add to Cart'
                                        shopifyId={pageContext.data.variants[0].shopifyId}
                                        quantity={quantity}
                                        setSuccess={setSuccess}
                                        success={success}
                                        totalQuantity={pageContext.data.variants[0].inventoryQuantity}
                                        availableForSale={pageContext.data.variants[0].availableForSale}
                                        setMessage={setMessage}
                                    />
                                    {/* <BuyNow
                                        title='Buy Now'
                                        shopifyId={pageContext.data.variants[0].shopifyId}
                                        quantity={quantity}
                                        setSuccess={setSuccess}
                                        success={success}
                                        totalQuantity={pageContext.data.variants[0].inventoryQuantity}
                                        availableForSale={pageContext.data.variants[0].availableForSale}
                                        setMessage={setMessage}
                                    /> */}
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </section>
            {/* End Products Section */}

            {/* Description Products Section */}
            <section className="s-py-sec s-pt-sec">
                <div className="container m-auto px-[15px]">
                    <ul id="tabs" className="flex flex-wrap md:gap-10 max-md:gap-5 w-full mb-5">
                        <li id="default-tab" href="#first" className="active-line text-[18px] max-md:text-[16px] text-white cursor-pointer relative">Description</li>
                    </ul>
                    <hr className='border-y border-[#333]' />
                    <div className="mt-10">
                        {pageContext.data.descriptionHtml ? (
                            <div dangerouslySetInnerHTML={{ __html: pageContext.data.descriptionHtml }} className='text-white richtext' />
                        ) : (
                            <div className='text-white'>No description</div>
                        )}
                    </div>
                </div>
            </section>
            {/* End Description Products Section */}

            {/* Related Products Section */}
            <section className="s-py-sec s-pt-sec ">
                <div className="container m-auto px-[15px]">
                    <h2 className='text-white md:mb-10 max-md:mb-6 text-center'>Related Products</h2>
                    <div className="flex md:gap-8 max-md:gap-10 max-md:flex-col mb-10">
                        {filteredProducts.map(({ node }, i) => (
                            <Link to={`/product/${node.handle}`} key={i} className="md:w-1/4">
                                <div className="product-list">
                                    <div className="relative overflow-hidden">
                                        {node.variants[0].compareAtPrice && node.variants[0].compareAtPrice > node.variants[0].price && (
                                            <SaleTag />
                                        )}
                                        <div className="prd-img-info cursor-pointer relative pt-[130%]">
                                            <GatsbyImage
                                                image={node.featuredImage.gatsbyImageData}
                                                alt={node.title}
                                                className="w-full h-full object-cover object-center !absolute top-0 left-0"
                                            />
                                        </div>
                                        <div className="quick-view-btn absolute left-0 right-0 bottom-[0]">
                                            <button aria-label='Quick View' className='bg-primary-clr text-white w-full text-center px-4 py-2 cursor-pointer'>Quick View</button>
                                        </div>
                                    </div>
                                    <div className="prt-title mt-4">
                                        <h5 className="text-white text-center font-poppins font-size-18">{node.title}</h5>
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
                                            <p className='text-white text-center font-medium font-size-18'>
                                                {node.variants[0].compareAtPrice && (
                                                    <span className='prd-strike text-[#9B9B9B] line-through pe-[5px]'>INR {numberWithCommas(node.variants[0].compareAtPrice)}</span>
                                                )}
                                                <span className='reqular-price'>INR {numberWithCommas(node.variants[0].price)}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            {/* End Related Products Section */}
        </>
    )
}

export default Product;