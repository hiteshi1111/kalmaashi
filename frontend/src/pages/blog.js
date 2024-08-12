import React from 'react'
import Seo from '../components/shared/seo';
import InnerPageBanner from '../components/shared/InnerBanner';
import { Link } from 'gatsby';
import formatDateTime from '../utils/formatDateTime';
import { GetBlogs } from '../utils/getBlogs';
import { GatsbyImage } from 'gatsby-plugin-image';
import { shopifyRichtext } from '../utils/shopifyRichtext';

const Blogs = () => {
    const blogsData = GetBlogs();
    return (
        <>
        <Seo title='Blogs'/>
        <InnerPageBanner title='Blogs' maxWidth='472px' pages={pages} />
        <section className="s-py-sec">
                <div className="container m-auto px-[30px] md:px-[15px] lg:px-[30px]">
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] xl:gap-[30px]'>
                        {blogsData.length > 0 && blogsData.map((article, index) => {
                            return (
                                <Link to={`/blog/${article.handle}`} key={index} className='w-full blog-list-info bg-light-clr rounded p-4 shadow-[0px_0px_25px_0px_rgba(0,0,0,0.15)]' aria-label={article.title}>
                                    <div className='blog-img-info mb-3 relative pt-[50%]'>
                                        <GatsbyImage
                                            image={article.featuredImage.gatsbyImageData}
                                            title={article.title}
                                            alt={article.title}
                                            className="w-full rounded-lg cursor-pointer object-center object-cover h-full !absolute top-0 left-0"
                                        />
                                    </div>
                                    <div className='blog-content-info lg:p-4 flex flex-col justify-between' >
                                        <h4 className='text-[#fff] mb-3 cursor-pointer hover:text-[#D4AF37]'>{article.title}</h4>
                                        <p className='text-white mt-5 mb-5' dangerouslySetInnerHTML={{ __html: shopifyRichtext(article.metafield.value) }} />
                                        <div className='flex justify-between max-md:flex-col gap-3 blog-autor-info mt-5 pt-5 border-t border-[#333]'>
                                            <p className="text-[#000] font-semibold text-[#fff]">Author:<span className="font-normal"> Kalmaashi</span></p>
                                            <p className="text-[#000] font-semibold text-[#fff]">Published At:<span className="font-normal"> {formatDateTime(article.publishedAt, false)}</span></p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

const pages = [
    {
        title: "Blogs",
        handle: "/blog"
    }
]

export default Blogs;