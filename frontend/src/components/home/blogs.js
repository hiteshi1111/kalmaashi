import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { GetBlogs } from '../../utils/getBlogs';
import { Link } from 'gatsby';
import { shopifyRichtext } from '../../utils/shopifyRichtext';
import formatDateTime from '../../utils/formatDateTime';

const Blogs = () => {
    const allBlogs = GetBlogs();
    return (
        <section className="s-py-sec s-pt-sec blog-section">
            <div className="container m-auto px-[15px]">
                <div className="text-center">
                    <h2 className="text-white mb-10">Latest Blog Posts</h2>
                </div>
                <div className="flex max-md:flex-col lg:gap-10 max-lg:gap-5">
                    {allBlogs.slice(0, 3).map((node, i) => (
                        <Link aria-label={node.title} to={`/blog/${node.handle}`} key={i} className="md:w-1/3 relative max-md:mb-5">
                            <div className="blog-list-info bg-[#1f1b1a] rounded p-4 shadow-[0px_0px_25px_0px_rgba(0,0,0,0.15)]">
                                <div className="blog-img-info mb-3 ">
                                    <GatsbyImage
                                        image={node.featuredImage.gatsbyImageData}
                                        alt={node.featuredImage.description}
                                        title={node.featuredImage.title}
                                        className="w-full rounded-lg cursor-pointer object-center object-cover md:h-[300px]"
                                    />
                                </div>
                                <div className="blog-content-info lg:p-4 max-lg:pt-3">
                                    <h4 className="text-white mb-3 cursor-pointer hover:primary-clr">{node.title}</h4>
                                    <div className="blog-autor-info mb-3">
                                        <p className="text-[#888]">{node.vendor} | {formatDateTime(node.publishedAt, false)}</p>
                                    </div>
                                    <p className="text-white">{node.shortDescription}</p>
                                    <p className='text-white mt-5 mb-5' dangerouslySetInnerHTML={{ __html: shopifyRichtext(node.metafield.value) }} />
                                </div>    
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Blogs;