import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';

const Instagram = () => {
  return (
    <>
        <section className="s-py-sec s-pt-sec instagram-section">
                <div className="container m-auto px-[15px]">
                    <h5 className="text-white text-center mb-1 primary-clr uppercase">instagram Gallery</h5>
                    <Link to="https://www.instagram.com/kalmaashi_/" target="_blank" aria-label="instagram"><h2 className="text-white text-center mb-10">@kalmaashi_</h2></Link>
                    <div className="gallery-info">
                        <ul className="flex">
                            <li>
                              <StaticImage
                                src="../../images/productfirst.webp"
                                alt="productfirst"
                                className="w-full"
                              />
                            </li>
                            <li>
                              <StaticImage
                                src="../../images/product2.webp"
                                alt="productfirst"
                                className="w-full"
                              />
                            </li>
                            <li>
                              <StaticImage
                                src="../../images/product3.webp"
                                alt="productfirst"
                                className="w-full"
                              />
                            </li>
                            <li>
                              <StaticImage
                                src="../../images/product4.webp"
                                alt="productfirst"
                                className="w-full"
                              />
                            </li>
                            <li>
                              <StaticImage
                                src="../../images/productfirst.webp"
                                alt="productfirst"
                                className="w-full"
                              />
                            </li>
                            <li>
                              <StaticImage
                                src="../../images/product2.webp"
                                alt="productfirst"
                                className="w-full"
                              />
                            </li>
                        </ul>
                    </div>
                </div>
        </section>
    </>
  )
}

export default Instagram;