import React from 'react'
import InnerPageBanner from '../components/shared/InnerBanner';
import ProductSection from '../components/product'; 

const Collection = ({ pageContext }) => {
    const title = pageContext.data.title.includes('|') ? pageContext.data.title.split('|')[1] : pageContext.data.title;
    const pages = [
        {
            title: "Our Collection",
            handle: "/collection"
        },
        {
            title: title,
            handle: ""
        }
    ]
    return (
        <>
            <InnerPageBanner title={title} maxWidth='472px' pages={pages} />
            <ProductSection products={pageContext.data.products} />
        </>
    )
}

export default Collection;