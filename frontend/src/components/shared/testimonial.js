import React from 'react';
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';

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
        <section className="s-py-sec s-pt-sec testimonials-section">
            <div className="container m-auto px-[15px]">
                <h2 className="text-white text-center mb-20 pb-10">Our Testimonials</h2>
                <div className="flex items-center md:gap-20 max-md:gap-20 max-md:flex-col">
                    {edges.map(({ node }, i) => (
                        <div key={i} className="md:w-1/3 max-md:mb-5">
                            <div className="testimonial-items border rounded-[10px] p-5">
                                <div className="testimonial-img text-center mb-6 mt-[-75px]">
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
                                    <h4 className="primary-clr text-center mb-10">{node.fullName}</h4>
                                    <p className="text-white text-center max-w-[315px] m-auto">{node.review}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonial;