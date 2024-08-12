import React, { useState } from 'react'
import InnerPageBanner from '../components/shared/InnerBanner';
import { GatsbyImage } from 'gatsby-plugin-image';
import Seo from '../components/shared/seo';
import formatDateTime from '../utils/formatDateTime';
import { GetEvents } from '../utils/getEvents';
import { Link } from 'gatsby';
import { shopifyRichtext } from '../utils/shopifyRichtext';

const Events = () => {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const allEvents = GetEvents();
    const activeEvents = allEvents.filter(index => {
        return index.totalInventory !== 0;
    });
    const inActiveEvents = allEvents.filter(index => {
        return index.totalInventory === 0;
    });
    // console.log("activeEvents", activeEvents)
    return (
        <>
            <Seo title="Our Events" description="" />
            <InnerPageBanner title='Our Events' maxWidth='472px' pages={pages} />
            <section className="s-py-sec s-pb-sec">
                <div className="container m-auto px-[15px]">
                    <div className="mb-5">
                        {/* <p className="text-[#D4AF37] mb-1">Coming Soon</p> */}
                        <h2 className="text-white">Featured Events</h2>
                    </div>
                    {activeEvents.map((event, i) => {
                        const object = {};
                        event.metafields.forEach(item => {
                            object[item.key] = item.value;
                        });
                        const htmlContent = event.descriptionHtml.substring(0, event.descriptionHtml.indexOf('audience reach') + 15);

                        return (
                            <div key={i} className={`flex md:gap-10 max-md:gap-8 max-md:flex-col mt-[20px] md:mb-[100px] max-md:mb-[50px] first:mt-0 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                                <div className="md:w-1/2">
                                    <div className='mb-5 relative pt-[90%]'>
                                        <GatsbyImage
                                            image={event.featuredImage.gatsbyImageData}
                                            alt={event.title}
                                            title={event.title}
                                            className="w-full h-full !absolute top-0 left-0 object-center object-contain"
                                        />
                                    </div>
                                    <div className="text-white mb-3 richtext" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                                </div>
                                <div className="md:w-1/2">
                                    <div className="flex items-center gap-7 border-y border-[#333] py-2 mb-5">
                                        <h3 className="primary-clr">{event.title}</h3>
                                    </div>
                                    {object.secondary_description && (
                                        <p className='text-white mt-5 mb-5' dangerouslySetInnerHTML={{ __html: shopifyRichtext(object.secondary_description) }} />
                                    )}
                                    <div className="flex md:gap-10 max-md:gap-6 max-md:flex-col mb-8">
                                        <div className="md:w-1/2">
                                            <h5 className="text-white mb-4">Details</h5>
                                            <ul>
                                                {object.start_date && (
                                                    <li className="text-white mb-1">Start: <span className="clr-888888">{formatDateTime(object.start_date)}</span></li>
                                                )}
                                                {object.end_date && (
                                                    <li className="text-white mb-1">End: <span className="clr-888888">{formatDateTime(object.end_date)}</span></li>
                                                )}
                                                {object.event_category && (
                                                    <li className="text-white mb-1">Event Category: <span className="clr-888888">{object.event_category}</span></li>
                                                )}
                                                {object.event_tags && (
                                                    <li className="text-white mb-1">Event Tags: <span className="clr-888888">{object.event_tags}</span></li>
                                                )}
                                                {/* <li className="text-white mb-1">Total Tickets: <span className="clr-888888">{event.totalInventory}</span></li> */}
                                            </ul>
                                        </div>

                                        <div className="md:w-1/2">
                                            <h5 className="text-white mb-4">Organizer</h5>
                                            <p className='text-[#D4AF37] mb-2 font-size-18 font-medium'>{event.vendor}</p>
                                            <ul>
                                                <li className="text-white mb-1">Phone: <span className="clr-888888">{object.phone_}</span></li>
                                                <li className="text-white mb-1">Email: <span className="clr-888888">{object.email}</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap gap-[20px] w-full items-center justify-between mb-[30px]'>
                                        <div className='flex flex-wrap gap-[15px] items-center'>
                                            {event.variants.length > 1 && event.variants.map((variant, i) => (
                                                <button key={i} className='border border-[#888888] rounded-l-full px-[10px] cursor-pointer' onClick={() => setSelectedTicket(variant.shopifyId)}>
                                                    <input
                                                        id={variant.title}
                                                        type='radio'
                                                        value={variant.shopifyId}
                                                        checked={selectedTicket === variant.shopifyId}
                                                        className='cursor-pointer'
                                                    />
                                                    <label htmlFor={variant.title} className='cursor-pointer select-none text-white text-[14px] ml-[10px]'>{variant.title} {variant.price}</label>
                                                </button>
                                            ))}
                                        </div>
                                        {/* <button
                                            disabled={event.variants.length > 1 ? selectedTicket ? false: true : false}
                                            onClick={() => buyNowHandler(event.variants.length > 1 ? selectedTicket : event.variants[0])}
                                            className='text-white bg-[#D4AF37] px-[20px] py-[8px] rounded-full'
                                        >Book Now</button> */}
                                        <Link
                                            to="/talent-hunt-2024"
                                            className='text-white bg-[#D4AF37] px-[20px] py-[8px] rounded-full'
                                        >Book Now</Link>
                                    </div>
                                    {/* <div className="block">
                                        <div className="w-full">
                                            <h5 className="text-white mb-4">Venue</h5>
                                            <p className='text-[#D4AF37] mb-5 font-medium'>{object.address}</p>
                                            <iframe
                                                className="md:h-[300px] max-md:h-[250px]"
                                                title="Embedded Location"
                                                src={object.venue}
                                                width="100%"
                                                allowfullscreen=""
                                                loading="lazy"
                                                referrerpolicy="no-referrer-when-downgrade"
                                            ></iframe>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            <section className="s-py-sec">
                <div className="container m-auto px-[15px]">
                    <div className="mb-5">
                        <h2 className="text-white">Previous Events</h2>
                    </div>
                    <div className="flex md:gap-10 max-md:gap-10 max-md:flex-col">
                        {inActiveEvents.map((event, i) => {
                            const startDate = event.metafields.filter(item => {
                                return item.key === "start_date"
                            })[0].value;
                            const endDate = event.metafields.filter(item => {
                                return item.key === "end_date"
                            })[0].value;
                            return (
                                <Link key={i} className="md:w-1/3 bg-light-clr" to={`/event/${event.handle}`} aria-label={event.title}>
                                    <div className='event-lists'>
                                        <div className='mb-5'>
                                            <GatsbyImage
                                                image={event.featuredImage.gatsbyImageData}
                                                alt={event.title}
                                                className="w-full"
                                            />
                                        </div>
                                        <div className='px-5 pb-7'>
                                            <h5 className='text-[#D4AF37] mb-3 cursor-pointer'>{event.title}</h5>
                                            <p className='clr-888888 mb-3'>{formatDateTime(startDate)} - {formatDateTime(endDate)}</p>
                                            <p className='text-white'>{event.descriptionHtml}</p>
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
        title: "Events",
        handle: ""
    }
]

export default Events;