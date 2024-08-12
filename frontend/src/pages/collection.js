import React, { useContext, useEffect, useState } from 'react'
import InnerPageBanner from '../components/shared/InnerBanner';
import CollectionSection from "../components/collection";
import { graphql } from 'gatsby';
import Seo from '../components/shared/seo';
import { StoreContext } from '../store';

const Collection = ({data}) => {
    const [filters, setFilters] = useState([]);
    const [filteredCollection, setFilteredCollection] = useState([]);
    const { activeCollection } = useContext(StoreContext);

    useEffect(() => {
        const uniqueFilters = Array.from(new Set(data.allShopifyCollection.edges.map(item => item.node.title.split(' | ')[0])));
        setFilters(uniqueFilters); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        const filtered = data.allShopifyCollection.edges.filter(index => {
            return index.node.title.includes(activeCollection);
        })
        setFilteredCollection(filtered);
    }, [activeCollection, data]);

    return (
        <>
        <Seo title="Our Collection" description="" />
        <InnerPageBanner title='Our Collection' maxWidth='472px' pages={pages} />
        <FilterBar filters={filters} />
        <CollectionSection filteredCollection={filteredCollection} />
        </>
    )
}

function FilterBar({filters}) {
    const { activeCollection, setActiveCollection } = useContext(StoreContext);
    return(
        <>
            <section className="s-py-sec s-pb-sec">
                <div className="container m-auto px-[15px]">
                    <div className='flex flex-wrap justify-center gap-5 py-[10px]'>
                        <button 
                            onClick={() => setActiveCollection("")} 
                            aria-label="All" 
                            className={`text-[#000] py-3 px-7 ${activeCollection === "" ? "bg-[#D4AF37] text-[#fff]" : "bg-[#fff]"}`}
                        >All</button>
                        {filters.map((item, i) => (
                            <button 
                                key={i} 
                                onClick={() => setActiveCollection(item)} 
                                aria-label={item} 
                                className={`text-[#000] py-3 px-7 ${activeCollection === item ? "bg-[#D4AF37] text-[#fff]" : "bg-[#fff]"}`}
                            >{item}</button>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export const query = graphql`
    query  {
        allShopifyCollection(filter: {handle: {nin: ["events", "blogs", "bestsellers", "featured"]}}) {
            edges {
                node {
                    title
                    handle
                    image {
                        gatsbyImageData
                        altText
                    }
                }
            }
        }
    }
`

const pages = [
    {
        title: "Our Collection",
        handle: ""
    }
]

export default Collection;