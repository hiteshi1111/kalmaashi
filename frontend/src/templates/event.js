import React from 'react'
import Seo from '../components/shared/seo';
import eventvideo from "../videos/pro-video1.mp4"
import formatDateTime from '../utils/formatDateTime';
import { GatsbyImage } from 'gatsby-plugin-image';
import InnerPageBanner from "../components/shared/InnerBanner";

const Event = ({pageContext}) => {
    const object = {};
    pageContext.data.metafields.forEach(item => {
        object[item.key] = item.value;
    });

    const pages = [
        {
            title: "Event",
            handle: "/events"
        },
        {
            title: pageContext.data.title,
            handle: ""
        }
    ]

    return (
        <>
        <Seo title={pageContext.data.title} />
        <InnerPageBanner title={pageContext.data.title} maxWidth='472px' pages={pages} />
        <section className="previews-event-page">
            <div className="container m-auto px-[15px] s-py-sec">
                <div className='w-full mx-auto'>
                    <div className='flex md:gap-10 max-md:gap-10 max-md:flex-col'>
                        <div className='md:w-3/5'>
                            <h2 className='text-white'>{pageContext.data.title}</h2>
                            <p className='text-white'>{pageContext.data.descriptionHtml}</p>
                            <div className='flex md:gap-10 max-md:gap-6 max-md:flex-col mt-7 mb-5'>
                                <div className='md:w-1/2'>
                                    <h5 className="text-white mb-4">Details</h5>
                                    <ul>
                                        {object.start_date && (
                                            <li className="text-white mb-1">Started On: <span className="clr-888888">{formatDateTime(object.start_date)}</span></li>
                                        )}
                                        {object.end_date && (
                                            <li className="text-white mb-1">Ended On: <span className="clr-888888">{formatDateTime(object.end_date)}</span></li>
                                        )}
                                        {object.event_category && (
                                            <li className="text-white mb-1">Event Category: <span className="clr-888888">{object.event_category}</span></li>
                                        )}
                                        {object.event_tags && (
                                            <li className="text-white mb-1">Event Tags: <span className="clr-888888">{object.event_tags}</span></li>
                                        )}
                                    </ul>
                                </div>
                                <div className="md:w-1/2">
                                    <h5 className="text-white mb-4">Organizer</h5>
                                    <p className="text-[#D4AF37] mb-2 font-size-18 font-medium">VP Ventures</p>
                                    <ul>
                                        <li className="text-white mb-1">Phone: <span className="clr-888888">{object.phone_}</span></li>
                                        <li className="text-white mb-1">Email: <span className="clr-888888">{object.email}</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className='w-full'>
                                <h5 className="text-white mb-4">Venue</h5>
                                <p className="text-[#D4AF37] mb-5 font-medium">{object.address}</p>
                            </div>

                        </div>
                        <div className='md:w-2/5'>
                            <video width="100%" controls className='w-full h-[700px] object-cover' >
                                <source src={eventvideo} type="video/mp4"/>
                                <track src="captions.vtt" kind="captions" srclang="en" label="English captions"/>
                                Your browser does not support the video tag.
                            </video>     
                        </div>
                    </div>
                    <div className='mt-10 text-white'>
                        <h2 className='!mb-[30px]'>Event Gallery</h2>
                        {/* <div className='flex flex-wrap gap-[10px] w-full'>
                            {pageContext.data.media.map((item, i) => (
                                <div key={i} className='relative pt-[50%] w-[40%]'>
                                    <GatsbyImage 
                                        image={item.image.gatsbyImageData}
                                        alt={pageContext.data.title}
                                        className='!absolute top-0 left-0 object-center object-cover w-full h-full event-gallery'
                                    />
                                </div>
                            ))}
                        </div> */}
                        <div className='event-gallery'>
                            {pageContext.data.media.map((item, i) => (
                                <div key={i} className='relative img-responsive'>
                                    <GatsbyImage 
                                        image={item.image.gatsbyImageData}
                                        alt={pageContext.data.title}
                                        className='object-center object-cover w-full h-full'
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div> 
        </section>
        </>
    )
}

export default Event;