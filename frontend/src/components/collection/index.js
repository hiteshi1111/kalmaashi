import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

const Collection = ({filteredCollection}) => {
    return (
        <section className="s-py-sec s-pt-sec">
            <div className="container m-auto px-[15px] pt-10">
                <div id="collection">
                    <div className="flex flex-wrap">
                        {filteredCollection.map((item) =>
                            <Link aria-label={item.node.title.split("|")[1]} to={`/collection/${item.node.handle}`} className="w-full md:w-1/3 px-4 mb-[35px]">
                                <div className="bg-light-clr">
                                    <div className="relative pt-[80%]">
                                        <GatsbyImage 
                                            image={item.node.image.gatsbyImageData}
                                            alt={item.node.image.altText}
                                            className="w-full h-full object-center object-cover !absolute top-0 left-0"
                                        />
                                    </div>
                                    <div className="p-[15px]">
                                        <h5 className="primary-clr text-center">{item.node.title.split("|")[1]}</h5>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Collection;