import React, { useEffect, useState } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import SaleTag from '../shared/saleTag';
import { GetAll } from '../../utils/getAll';


const Products = () => {
    const { allShopifyCollection: { edges } } = GetAll();
    const tabs = ["Featured", "Bestsellers"];
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [ activeCollection, setActiveCollection ] = useState([]);
    
    useEffect(() => {
        const filtered = edges.filter(({node}) => {
            return node.handle === activeTab.toLowerCase();
        })
        setActiveCollection(filtered[0].node.products.slice(0, 4))
    },[activeTab, edges])

    return (
        <section className="s-py-sec s-pt-sec product-tabs-section">
            <div className="container m-auto px-[15px]">
                <div className='mb-[40px]'>
                    <h2 className="text-white mb-[10px]">Featured Collections</h2>
                    <p className="text-white mb-[20px]">At Kalmaashi, we discover the intensity of the heritage of art, featuring both ancient and modern art forms of today. Each of our collections is curated in a way that narrates the unique tales, weaving together the threads of classical artistry and post-modern art. Delve deeper into our premium collection and immerse yourself in the splendour of cultural charm.</p>
                    <h5 className="text-white mb-[10px]">The spirit of Legacy & Modern Narratives:</h5>
                    <p className="text-white mb-[10px]">Explore the intensity of tradition through our exceptional collection, which are tales of heritage, centuries old artistry that has endured the erosion of time and now has brought at the forefront of today’s luxury. We invite you to witness our royal masterpieces and admire their beauty by getting a chance to own them.</p>
                    <p className="text-white mb-[10px]">Uncover the dynamic conversations between modern ideas and traditional designs. Our collection showcases the spirit of today’s artisans in blending the techniques of their ancestors in accordance with today's art.</p>
                </div>
                <div className="product-tabs-info">
                    <div className="flex flex-wrap gap-2 w-full">
                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                className={`text-[18px] max-md:text-[16px] md:rounded-[30px] max-md:rounded-[8px] md:px-10 max-md:px-4 md:py-3 max-md:py-2 cursor-pointer ${activeTab === tab ? "bg-primary-clr text-white" : "text-white"}`}
                                onClick={() => setActiveTab(tab)}
                            >{tab}</button>
                        ))}
                    </div>
                    <div className="mt-10">
                        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-[25px]">
                            {activeCollection.length > 0 && activeCollection.map((product, index) => (
                                <Link to={`/product/${product.handle}`} key={index} aria-label={product.title} >
                                    <div className="product-list">
                                        <div className="relative overflow-hidden">
                                            {product.variants[0].compareAtPrice && product.variants[0].compareAtPrice > product.variants[0].price && (
                                                <SaleTag />
                                            )}
                                            <div className="prd-img-info cursor-pointer relative pt-[140%]">
                                                <GatsbyImage
                                                    image={product.featuredImage.gatsbyImageData}
                                                    alt={product.featuredImage.altText}
                                                    className="w-full object-center object-cover h-full !absolute top-0 left-0 "
                                                />
                                            </div>
                                            <div className="quick-view-btn absolute left-0 right-0 bottom-[0]">
                                                <button aria-label='Quick View' className='bg-primary-clr text-white w-full text-center px-4 py-2 cursor-pointer'>Quick View</button>
                                            </div>
                                        </div>
                                        <div className="prt-title mt-4">
                                            <h5 className="text-white text-center font-poppins font-size-18">{product.title}</h5>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Products;
