import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { GetAll } from '../../utils/getAll';

const Collection = () => {
    const data = GetAll();
    const filteredCollection = data.allShopifyCollection.edges.filter(({node}) => {
        return node.title.includes("|");
    })
    const extractFirstPart = (title) => {
        const titleParts = title.split('|');
        return titleParts[1].trim(); 
    };
    return (
        <section className="s-py-sec collections-section-info">
            <div className="container mx-auto px-[15px]">
                <div className='flex md:gap-8 max-md:gap-8 max-md:flex-col md:mb-10'>
                    <div className="md:w-1/2 relative">
                        <Link aria-label="collection" to="/collection" className="block collection-items mb-[32px]">
                            <div className="collection-item-info relative cursor-pointer overflow-hidden">
                                <GatsbyImage 
                                    image={filteredCollection[0]?.node.image.gatsbyImageData}
                                    alt={filteredCollection[0]?.node.image.altText}
                                    className="w-full xl:h-[550px] lg:h-[400px] max-lg:h-[320px] object-cover object-center" 
                                />
                                <div className="collection-subtxt absolute left-0 bottom-0 lg:px-[30px] lg:mb-[30px] max-lg:px-[15px] max-lg:mb-[15px]">
                                    <h3 className="text-[#fff] lg:mb-[15px] max-lg:mb-[10px] animate fadeInUp one-delays"> {extractFirstPart(filteredCollection[0]?.node.title)}</h3>
                                    <p className="text-[#fff] font-size-20 italic animate fadeInUp two-delays">{filteredCollection[0]?.node.description}</p>
                                </div>
                            </div>
                        </Link>
                        <Link to="/collection" aria-label="collection" className="block collection-items">
                            <div className="collection-item-info relative cursor-pointer overflow-hidden">
                                <GatsbyImage 
                                    image={filteredCollection[1]?.node.image.gatsbyImageData}
                                    alt={filteredCollection[1]?.node.image.altText}
                                    className="w-full xl:h-[450px] lg:h-[350px] max-lg:h-[320px] object-cover object-center" 
                                />
                                <div className="collection-subtxt absolute left-0 bottom-0 px-[30px] mb-[30px]">
                                    <h3 className="text-[#fff] lg:mb-[15px] max-lg:mb-[10px] animate fadeInUp one-delays"> {extractFirstPart(filteredCollection[1]?.node.title)}</h3>
                                    <p className="text-[#fff] font-size-20 italic animate fadeInUp two-delays">{filteredCollection[1]?.node.description}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="md:w-1/2 relative">
                        <Link to="/collection" aria-label="collection" className="block collection-items mb-[32px]">
                            <div className="collection-item-info relative cursor-pointer overflow-hidden">
                                <GatsbyImage 
                                    image={filteredCollection[2]?.node.image.gatsbyImageData}
                                    alt={filteredCollection[2]?.node.image.altText}
                                    className="w-full xl:h-[450px] lg:h-[350px] max-lg:h-[320px] object-cover object-center"
                                />
                                <div className="collection-subtxt absolute left-0 bottom-0 px-[30px] mb-[30px]">
                                    <h3 className="text-[#fff] lg:mb-[15px] max-lg:mb-[10px] animate fadeInUp one-delays"> {extractFirstPart(filteredCollection[2]?.node.title)}</h3>
                                    <p className="text-[#fff] font-size-20 italic animate fadeInUp two-delays">{filteredCollection[2]?.node.description}</p>
                                </div>
                            </div>
                        </Link>
                        <Link to="/collection" aria-label="collection" className="block collection-items">
                            <div className="collection-item-info relative cursor-pointer overflow-hidden">
                                <GatsbyImage 
                                    image={filteredCollection[3]?.node.image.gatsbyImageData}
                                    alt={filteredCollection[3]?.node.image.altText}
                                    className="w-full xl:h-[550px] lg:h-[400px] max-lg:h-[320px] object-cover object-center"
                                />
                                <div className="collection-subtxt absolute left-0 bottom-0 px-[30px] mb-[30px]">
                                    <h3 className="text-[#fff] lg:mb-[15px] max-lg:mb-[10px] animate fadeInUp one-delays"> {extractFirstPart(filteredCollection[3]?.node.title)}</h3>
                                    <p className="text-[#fff] font-size-20 italic animate fadeInUp two-delays">{filteredCollection[3]?.node.description}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Collection;