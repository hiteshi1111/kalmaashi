import React, { useState } from 'react'
import Seo from '../components/shared/seo';
import InnerPageBanner from "../components/shared/InnerBanner";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const Faq = () => {
    const [expanded, setExpanded] = useState(0);
    function toggleHandler(i) {
        if (expanded === i){
            setExpanded(null);
        }else{
            setExpanded(i);
        }
    }
    return (
        <>
            <Seo title='FAQs'/>
            <InnerPageBanner title='FAQs' maxWidth='472px' pages={pages} />
            <section className="s-py-sec">
                <div className="container !max-w-[1000px] m-auto px-[15px]">
                    {dummyData.map((row, i) => (
                        <div key={i} className='faq-info mb-5'>
                            <button onClick={() => toggleHandler(i)} className='w-full bg-light-clr px-5 py-4 text-left cursor-pointer rounded-md shadow-[0_3px_10px_5px_rgba(0,0,0,0.1)] transition-all duration-200'>
                                <div className='faq-title flex justify-between items-center'>
                                    <h5 className='text-white'>{row.title}</h5>
                                    {expanded === i ? (
                                        <FaChevronUp size="15" color='#fff'/>
                                    ):(
                                        <FaChevronDown size="15" color='#fff'/>
                                    )}
                                </div>
                            </button>
                            <div className={`ease-linear duration-300 faq-content px-5 ${expanded === i ? "opacity-100 mt-5 pb-5": "opacity-0 mt-0 pb-0 max-h-[0px]"}`}>
                                <p 
                                    dangerouslySetInnerHTML={{__html: row.description}} 
                                    className='text-white select-none'
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

const dummyData = [
    {
        title: "What is Kalmaashi Arts Painting?",
        description: "Kalmaashi is an online platform dedicated to the world of arts and painting. We provide a space for artists to showcase and sell their paintings, and for art enthusiasts to discover and purchase unique artworks."
    },
    {
        title: "How can I buy a painting on Kalmaashi?",
        description: "To purchase a painting, simply browse our gallery, select the artwork you love, and click on the Buy Now or Add to Cart button. Follow the checkout process to complete your purchase."
    },
    {
        title: "How do artists join Kalmaashi and showcase their work?",
        description: "Artists can join Kalmaashi by creating an account and uploading their artworks through the artist dashboard. Once approved, their paintings will be featured on our platform, reaching a wider audience."
    },
    {
        title: "What types of paintings are available on Kalmaashi?",
        description: "Kalmaashi features a diverse range of paintings, including but not limited to abstract art, landscapes, portraits, and contemporary pieces. We aim to showcase a variety of styles to cater to different tastes."
    },
    {
        title: "How is shipping handled for purchased paintings?",
        description: "Shipping details and options are provided during the checkout process. Artists are responsible for shipping their artworks, and shipping costs are determined by the artist or in accordance with our shipping policy."
    },
    {
        title: "Can I return a purchased painting?",
        description: "Returns are subject to the artist's return policy, which should be clearly outlined on the product page. Please review the artist's policies before making a purchase."
    },
    {
        title: "How do I contact Kalmaashi for support?",
        description: "For any inquiries or support, you can reach out to us through our Contact Page or by emailing info@kalmaashi.com. Our support team is ready to assist you."
    },
    {
        title: "How are prices determined for paintings on Kalmaashi?",
        description: "Prices are set by the individual artists. Each artist has the flexibility to determine the value of their artworks based on factors such as size, medium, and artistic merit."
    },
    {
        title: "Is it safe to make transactions on Kalmaashi?",
        description: "Yes, Kalmaashi takes security seriously. We use industry-standard encryption to protect your personal and financial information during transactions. Your privacy and security are our top priorities."
    },
    {
        title: "How can I stay updated on new paintings and artists?",
        description: "Subscribe to our newsletter to receive regular updates on new paintings, featured artists, and upcoming events. You can also follow us on social media platforms for the latest news and announcements."
    }
]

const pages = [
    {
        title: "FAQs",
        handle: ""
    }
]

export default Faq;