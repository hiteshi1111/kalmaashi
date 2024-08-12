import React from 'react'
import Seo from '../components/shared/seo';
import BreadCrumb from '../components/custom/breadCrumb';
import formatDateTime from '../utils/formatDateTime';
import { GatsbyImage } from 'gatsby-plugin-image';

const Blog = ({ pageContext }) => {
    const pages = [
        {
            title: "Blog",
            handle: "/blog"
        },
        {
            title: pageContext?.title,
            handle: ""
        }
    ]
    return (
        <>
            <Seo title='Blog'/>
            <div className='bg-black-img s-py-sec'>
                <h1 className='text-white md:text-[34px] max-md:text-[26px] capitalize font-bold w-full text-center select-none'>{pageContext?.title}</h1>
                <BreadCrumb pages={pages} white />
            </div>
            <section className="single-blog-page bg-light-black-clr md:pt-[60px] max-md:pt-[40px] md:pb-[100px] max-md:pb-[50px]">
                <div className="container m-auto px-[15px]">
                    <div className='w-full mx-auto !max-w-[1200px] px-[10px] lg:px-[30px] !pt-[10px]'>
                        <div className='relative pt-[40%] w-full'>
                            <GatsbyImage 
                                image={pageContext?.featuredImage.gatsbyImageData}
                                alt={pageContext?.title}
                                title={pageContext?.title}
                                className='!absolute top-0 left-0 w-full h-full object-center object-cover'
                            />
                        </div>
                        <div dangerouslySetInnerHTML={{__html: pageContext?.descriptionHtml}} className='mt-10 text-white' />
                    </div>
                    <div className='w-full mx-auto !max-w-[1200px] px-[10px] lg:px-[30px] !pt-[10px]'>
                        <div className='flex justify-between max-md:flex-col gap-3 blog-autor-info mt-5 py-5 border-y border-[#333]'>
                            <p className="text-[#000] font-semibold text-[#fff]">Author: <span class="font-normal">{pageContext.vendor}</span></p>
                            {pageContext?.publishedAt && (
                                <p className="text-[#000] font-semibold text-[#fff]">Published At: <span class="font-normal">{formatDateTime(pageContext?.publishedAt, false)}</span></p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Blog;