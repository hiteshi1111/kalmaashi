import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-use";

const Seo = ({ title = "", description = "" }) => {

    const { pathname } = useLocation();

    return (
        <Helmet>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width"></meta>
            <title>{title || "Kalmaashi"}</title>
            <meta name="description" content={description || ""} />
            <meta property="og:title" content={title || "Kalmaashi"} />
            <meta property="og:description" content={description} />
            <link rel="canonical" href={`https://www.kalmaashi.com${pathname}`} />
            <script id="easebuzz-checkout" defer strategy="off-main-thread" src="https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/v2.0.0/easebuzz-checkout-v2.min.js"></script>
        </Helmet>
    )
}

export default Seo;
