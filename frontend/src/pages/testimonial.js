import React from 'react';
import Seo from "../components/shared/seo";
import InnerPageBanner from "../components/shared/InnerBanner";
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';
import { FaStar } from "react-icons/fa";

const Testimonial = () => {
    const { allContentfulTestimonials: { edges } } = useStaticQuery(graphql`
        query{
            allContentfulTestimonials {
                edges {
                    node {
                        fullName
                        review
                        customerImage {
                            gatsbyImageData
                            title
                            description
                        }
                    }
                }
            }
        }
    `)
    return (
        <>
        <Seo title="Our Testimonials" description="" />
        <InnerPageBanner title='Our Testimonials' maxWidth='472px' pages={pages} />
        <section className="s-py-sec testimonials-section">
            <div className="container m-auto px-[15px]">
                <div className="grid lg:grid-cols-2 gap-6 pt-[50px]">
                    {edges.map(({ node }, i) => (
                        <div key={i} className="mb-[70px]">
                            <div className="testimonial-items rounded-[10px] bg-[#1f1b1a] shadow md:p-10 max-md:p-5">
                                <div className="testimonial-img text-center mb-6 mt-[-95px]">
                                    <GatsbyImage
                                        image={node.customerImage.gatsbyImageData}
                                        alt={node.customerImage.description}
                                        title={node.customerImage.title}
                                        className="w-[110px] h-[110px] m-auto"
                                    />
                                </div>
                                <div className="testimonial-content relative pb-5 ">
                                    <StaticImage
                                        src="../../images/quote-icon.webp"
                                        alt="productfirst"
                                        className="w-[77px] h-[67px] absolute top-[50px] left-0 right-0 m-auto"
                                    />
                                    <h4 className="primary-clr text-center mb-[15px]">{node.fullName}</h4>
                                    <p className="text-white text-center">The attention to detail and skillful technique by Rajesh has brought the image to life on paper. It beautifully preserves the essence of the original photo while adding an artistic touch. A remarkable display of talent and a captivating reinterpretation of the subject. Well done!</p>
                                    <div className='mt-[20px]'>
                                        <ul className='flex gap-[1px] justify-center'>
                                            <li><FaStar className='text-[#D4AF37] text-[20px]' /></li>
                                            <li><FaStar className='text-[#D4AF37] text-[20px]' /></li>
                                            <li><FaStar className='text-[#D4AF37] text-[20px]' /></li>
                                            <li><FaStar className='text-[#D4AF37] text-[20px]' /></li>
                                            <li><FaStar className='text-[#D4AF37] text-[20px]' /></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        </>
    )
}

const pages = [
    {
        title: "Our Testimonials",
        handle: ""
    }
]

export default Testimonial;