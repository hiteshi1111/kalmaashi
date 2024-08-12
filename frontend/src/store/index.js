import React, { createContext, useEffect, useState } from 'react';
import Client from 'shopify-buy';
import { GetRequest } from '../utils/requests';

//INITIALIZE CLIENT TO RETURN CONTENT IN STORE'S PRIMARY LANGUAGE
const client = Client.buildClient({
    domain: process.env.SHOPIFY_APP_URL,
    storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_TOKEN
});

const defaultStoreContext = {
    cartQuantity: 0,
    cart: {},
    addLineItem: () => { },
    removeLineItem: () => { },
    updateLineItem: () => { },
    addDiscount: () => { },
    removeDiscount: () => { },
    userData: null,
    setUserData: () => { },
    trigger: 0,
    setTrigger: () => { },
    addAddress: () => { },
    resetCartHandler: () => { },
    activeCollection: "",
    setActiveCollection: () => { },
    searchKey: "",
    setSearchKey: () => { },
    filteredSearch: [],
    setFilteredSearch: () => { }
}

export const StoreContext = createContext(defaultStoreContext);

const Provider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    const [cart, setCart] = useState(null);
    const [cartQuantity, setCartQuantity] = useState(0);

    const [trigger, setTrigger] = useState(0);
    const [activeCollection, setActiveCollection] = useState("");

    const [searchKey, setSearchKey] = useState("");
    const [filteredSearch, setFilteredSearch] = useState([]);

    //FETCHES CHECKOUT ON PAGE RENDER
    useEffect(() => {
        fetchCheckout();
    }, [trigger]);

    //CREATES CHECKOUT TOKEN URL
    const fetchCheckout = async () => {
        const isBrowser = typeof window !== 'undefined'
        const existingCheckoutId = isBrowser ? localStorage.getItem('k-checkout') : null
        if (existingCheckoutId) {
            const checkout = await client.checkout.fetch(existingCheckoutId);
            setCartQuantity(checkout.lineItems.length)
            setCart(checkout)
        } else {
            try {
                const checkout = await client.checkout.create();
                localStorage.setItem('k-checkout', checkout.id)
            } catch (e) {
                localStorage.setItem('k-checkout', null)
            }
        }
    };

    //ADDS LINEITEM TO CART
    const addLineItem = async (variantId, quantity) => {
        const lineItemsToAdd = [{ variantId, quantity }];
        const updatedCart = await client.checkout.addLineItems(cart.id, lineItemsToAdd);
        const checkout = await client.checkout.fetch(cart.id);
        setCartQuantity(checkout.lineItems.length)
        setCart(updatedCart);
    };

    //UPDATE LINEITEM IN CART
    const updateLineItem = async (id, quantity) => {
        const lineItemsToUpdate = [{ id, quantity }];
        const updatedCart = await client.checkout.updateLineItems(cart.id, lineItemsToUpdate);
        const checkout = await client.checkout.fetch(cart.id);
        setCartQuantity(checkout.lineItems.length)
        setCart(updatedCart);
    };

    //REMOVE LINEITEM FROM CART
    const removeLineItem = async (variantId) => {
        const lineItemsToDelete = [variantId];
        const updatedCart = await client.checkout.removeLineItems(cart.id, lineItemsToDelete);
        const checkout = await client.checkout.fetch(cart.id);
        setCartQuantity(checkout.lineItems.length)
        setCart(updatedCart);
    };

    //ADD DISCOUNT TO CART ITEMS
    const addDiscount = async (discountCode) => {
        const updatedCart = await client.checkout.addDiscount(cart.id, discountCode);
        if (updatedCart.userErrors.length > 0) {
            return { applied: false, message: "Coupon Code is Invalid!" };
        } else {
            setCart(updatedCart);
            return { applied: true };
        }
    };

    //REMOVES DISCOUNT TO CART ITEMS
    const removeDiscount = async () => {
        const updatedCart = await client.checkout.removeDiscount(cart.id);
        setCart(updatedCart);
    };

    //ADD ADDRESS TO CHECKOUT
    const addAddress = async (shippingAddress) => {
        const updatedCart = await client.checkout.updateShippingAddress(cart.id, shippingAddress);
        setCart(updatedCart);
    };

    let shopifyToken;
    if (typeof window !== 'undefined') {
        shopifyToken = localStorage.getItem('sh-kal-ac');
    }

    //FETCHES DATA WITH TOKEN
    useEffect(() => {
        if (shopifyToken) {
            GetRequest(`${process.env.GATSBY_API_URL}/api/customer/token/` + shopifyToken).then(response => {
                setUserData(response.data?.data?.customer);
            }).catch(err => {
                console.log(err);
            })
        } else {
            setUserData(null);
        }
    }, [shopifyToken]);

    //RESET CART ON SUCCESSFUL ORDER
    function resetCartHandler() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('k-checkout');
        }
        setCart(null);
        setCartQuantity(0)
    }

    return (
        <StoreContext.Provider
            value={{
                cart,
                cartQuantity,
                userData,
                setUserData,
                addLineItem,
                updateLineItem,
                removeLineItem,
                addDiscount,
                removeDiscount,
                trigger,
                setTrigger,
                addAddress,
                resetCartHandler,
                activeCollection,
                setActiveCollection,
                searchKey,
                setSearchKey,
                filteredSearch,
                setFilteredSearch
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export default Provider;