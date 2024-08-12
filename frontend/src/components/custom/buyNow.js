import React, { useContext } from 'react';
import { BsLightningFill } from "react-icons/bs";
import { StoreContext } from '../../store';
import { navigate } from 'gatsby';

const BuyNow = ({ title = "", shopifyId, quantity, setSuccess = () => { }, success, totalQuantity, availableForSale = false, setMessage = () => { } }) => {
    const { addLineItem, cart } = useContext(StoreContext);

    const checkoutUrl = cart?.webUrl || "";
    const checkoutToken = checkoutUrl.split("/checkouts/")[1];

    console.log("CARTTT", cart)

    function cartHandler() {
        const isExists = cart?.lineItems.filter(index => {
            return index.variant?.id === shopifyId
        })
        const existingQuantity = isExists?.length > 0 ? isExists[0].quantity : 0;

        if (existingQuantity < totalQuantity) {
            addLineItem(shopifyId, quantity);
            // setMessage("Added to Cart Successfully!");
            setSuccess(true);
            navigate(`/checkout?payment=${checkoutToken}`);
        } else {
            setMessage("Available quantity exceeded!");
            setSuccess(true);
        }
    }

    return (
        <button
            onClick={cartHandler}
            disabled={success}
            aria-label='Cart'
            className={`select-none flex text-white bg-[#ffa41c] items-center font-medium rounded-full lg:px-10 lg:py-4 max-lg:px-6 max-lg:py-3 hover:bg-[#fff] hover:text-[#ffa41c] duration-[400ms,700ms] ${availableForSale && totalQuantity !== 0 ? "pointer-events-auto" : "pointer-events-none"}`}
        >
            {availableForSale ? (
                totalQuantity !== 0 ? (
                    <><BsLightningFill className='me-1' />{title}</>
                ) : (
                    "Out of Stock!"
                )
            ) : (
                "Sold Out!"
            )}
        </button>
    )
}

export default BuyNow;