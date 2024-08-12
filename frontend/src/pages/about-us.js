import React from "react";
import Vision from "../components/about/vision";
import About from "../components/about/about";
import InnerPageBanner from "../components/shared/InnerBanner";
import Newsletter from "../components/shared/newsletter";
// import Testimonial from "../components/shared/testimonial";
import Seo from "../components/shared/seo";

const AboutUs = () => {
    return (
        <>
        <Seo title="About Us" description="" />
        <InnerPageBanner title='About Us' maxWidth='472px' pages={pages} />
        <About/>
        <Newsletter />
        <Vision />
        {/* <Testimonial /> */}
        </>
    )
};

const pages = [
    {
        title: "About Us",
        handle: ""
    }
]

export default AboutUs;