import React, { useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { StoreContext } from '../../store';

const AddToCart = ({ title = "", shopifyId, quantity, setSuccess = () => { }, success, totalQuantity, availableForSale = false, setMessage = () => { } }) => {
    const { addLineItem, cart } = useContext(StoreContext);

    function cartHandler() {
        const isExists = cart?.lineItems.filter(index => {
            return index.variant?.id === shopifyId
        })
        const existingQuantity = isExists?.length > 0 ? isExists[0].quantity : 0;

        if (existingQuantity < totalQuantity) {
            addLineItem(shopifyId, quantity);
            setMessage("Added to Cart Successfully!");
            setSuccess(true);
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
            className={`select-none flex text-white bg-primary-clr items-center font-medium rounded-full lg:px-10 lg:py-4 max-lg:px-6 max-lg:py-3 hover:bg-[#fff] hover:text-[#D4AF37] duration-[400ms,700ms] ${availableForSale && totalQuantity !== 0 ? "pointer-events-auto" : "pointer-events-none"}`}
        >
            {availableForSale ? (
                totalQuantity !== 0 ? (
                    <><FaShoppingCart className='me-1' />{title}</>
                ) : (
                    "Out of Stock!"
                )
            ) : (
                "Sold Out!"
            )}
        </button>
    )
}

export default AddToCart;