import React, { useEffect } from 'react'
import CustomerProfile from "../components/dashboard/profile";
import CustomerOrders from "../components/dashboard/orders"
import Seo from "../components/shared/seo";
import InnerPageBanner from "../components/shared/InnerBanner";
import { navigate } from 'gatsby';

const Account = () => {
    let shopifyToken;
    if (typeof window !== 'undefined') {
        shopifyToken = localStorage.getItem('sh-kal-ac');
    }
    useEffect(() => {
        if (!shopifyToken) {
            navigate("/login");
        }
    },[shopifyToken])
    return (
        <>
            <Seo title="My Account" description="" />
            <InnerPageBanner title='My Account' maxWidth='472px' pages={pages} />
            <CustomerProfile />
            {/* <CustomerAddresses/> */}
            <CustomerOrders />
        </>
    )
}

const pages = [
    {
        title: "Account",
        handle: ""
    }
]

export default Account;