import { graphql, useStaticQuery } from 'gatsby';

export const GetBlogs = () => {
    const data = useStaticQuery(graphql`
        query{
            shopifyCollection(products: {elemMatch: {tags: {eq: "blog"}}}) {
                products {
                    title
                    handle
                    vendor
                    featuredImage {
                        gatsbyImageData
                    }
                    publishedAt
                    metafield(key: "secondary_description", namespace: "custom") {
                        value
                    }
                }
            }
        }
    `)

    return data.shopifyCollection.products;
}