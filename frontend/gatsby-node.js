const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const blogs = await graphql(`
    {
        shopifyCollection(products: {elemMatch: {tags: {eq: "blog"}}}) {
            products {
                title
                handle
                vendor
                featuredImage {
                    gatsbyImageData
                }
                descriptionHtml
                publishedAt
                seo {
                    description
                    title
                }
            }
        }
    }
    `)

    const products = await graphql(`
    {
        allShopifyProduct(filter: {handle: {nin: ["events", "blogs"]}}) {
            edges {
                node {
                    handle
                    title
                    descriptionHtml
                    media {
                        ... on ShopifyMediaImage {
                            id
                            image {
                                gatsbyImageData
                            }
                        }
                    }
                    featuredImage {
                        gatsbyImageData
                        altText
                    }
                    shopifyId
                    vendor
                    variants {
                        title
                        shopifyId
                        price
                        compareAtPrice
                        availableForSale
                        inventoryQuantity
                    }
                    seo {
                        description
                        title
                    }
                }
            }
        }
    }
    `)

    const events = await graphql(`
    {
        allShopifyProduct(filter: {tags: {eq: "events"}, totalInventory: {eq: 0}}) {
            edges {
                node {
                    handle
                    title
                    descriptionHtml
                    metafields {
                        value
                        key
                    }
                    media {
                        ... on ShopifyMediaImage {
                            id
                            image {
                                gatsbyImageData
                            }
                        }
                    }
                    featuredImage {
                        gatsbyImageData
                        altText
                    }
                    seo {
                        description
                        title
                    }
                }
            }
        }
    }
    `)

    const collections = await graphql(`
    {
        allShopifyCollection(filter: {handle: {ne: "events"}}) {
            edges {
                node {
                    title
                    handle
                    products {
                        title
                        handle
                        featuredImage {
                            gatsbyImageData
                            altText
                        }
                        variants {
                            compareAtPrice
                            price
                        }
                    }
                }
            }
        }
    }
    `)

    // Create pages for each markdown file.
    products.data.allShopifyProduct.edges.forEach(({node}) => {
        createPage({
            path: `/product/${node.handle}`,
            component: path.resolve(`src/templates/product.js`),
            context: {
                id: node.handle,
                data: node
            },
        })
    })
    collections.data.allShopifyCollection.edges.forEach(({node}) => {
        createPage({
            path: `/collection/${node.handle}`,
            component: path.resolve(`src/templates/collection.js`),
            context: {
                id: node.handle,
                data: node
            },
        })
    })
    blogs.data.shopifyCollection.products.forEach((item) => {
        createPage({
            path: `/blog/${item.handle}`,
            component: path.resolve(`src/templates/blog.js`),
            context: {
                ...item
            },
        })
    })
    events.data.allShopifyProduct.edges.forEach(({node}) => {
        createPage({
            path: `/event/${node.handle}`,
            component: path.resolve(`src/templates/event.js`),
            context: {
                data: node
            },
        })
    })
}