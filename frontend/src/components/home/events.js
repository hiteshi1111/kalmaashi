import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react'
import { GetEvents } from '../../utils/getEvents';
import formatDateTime from '../../utils/formatDateTime';
import Cta from '../custom/cta';

const Events = () => {
    const allEvents = GetEvents();
    const singleEvent = allEvents.filter(index => {
        return index.totalInventory !== 0;
    })[0]
    const object = {};
    singleEvent?.metafields?.forEach(item => {
        object[item.key] = item.value;
    });
    return (
        <section className="s-py-sec events-section">
            <div className="container m-auto px-[15px]">
                <div className="flex md:gap-10 max-md:gap-10 max-md:flex-col">
                    <div className="md:w-2/5">
                        <div className="mt-3 relative pt-[100%]">
                            <GatsbyImage
                                image={singleEvent?.featuredImage.gatsbyImageData} 
                                alt={singleEvent?.title}
                                title={singleEvent?.title}
                                className="w-full h-full !absolute top-0 left-0 object-center object-contain" 
                            />
                        </div>
                    </div>
                    <div className="md:w-3/5">
                        <div className="">
                            <h2 className="text-white mb-3">Featured Events</h2>
                            <div className="flex items-center gap-7 border-y border-[#333] py-2 mb-5">
                                <h2 className="primary-clr">{singleEvent?.title}</h2>
                            </div>
                            <div className="flex md:gap-10 max-md:gap-6 max-md:flex-col md:mb-[50px] max-md:mb-[30px]">
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
                                    </ul>
                                </div>
                                {object.address && (
                                    <div className="md:w-1/2">
                                        <h5 className="text-white mb-4">Venue</h5>
                                        <p className="text-white">{object.address}</p>
                                    </div>
                                )}
                            </div>
                            <Cta title='Get Ticket' handle='/events' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Events;
