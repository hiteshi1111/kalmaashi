import React from "react";
import Hero from "../components/home/hero";
import About from "../components/home/about";
import Products from "../components/home/products";
import Collection from "../components/home/collection";
import Events from "../components/home/events";
import Blogs from "../components/home/blogs";
import Instagram from "../components/home/instagram";
// import Testimonial from "../components/shared/testimonial";
import Newsletter from "../components/shared/newsletter";
import Seo from "../components/shared/seo";
import OurTeam from "../components/shared/ourArtists";
import WhyChooseUs from "../components/home/why-choose-us";

const IndexPage = () => {
  return (
    <>
      <Seo title="Kalmaashi" description="" />
      <Hero />
      <About action/>
      <Collection />
      <Products />
      <WhyChooseUs/>
      <Newsletter />
      <Events />
      {/* <Testimonial /> */}
      <OurTeam/>
      <Instagram />
      <Blogs />
  </>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>