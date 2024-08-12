import React, { useContext, useState, useEffect } from 'react'
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { StoreContext } from '../../store';
import { numberWithCommas } from '../../utils/numberWithCommas';
import { GetAll } from '../../utils/getAll';
import Toastify from '../shared/toastify';

const LineItem = ({ product, key }) => {
    const { removeLineItem, updateLineItem } = useContext(StoreContext);
    const allProducts = GetAll()?.allShopifyProduct

    const [message, setMessage] = useState("")


    function addQuantity(id, quantity, title) {
        const filteredProduct = allProducts.edges.filter((item, i) => (
            item.node.title === title
        ))
        if (filteredProduct) {
            const totalInventory = filteredProduct[0]?.node?.totalInventory;

            if (totalInventory > quantity) {
                const newQuantity = quantity + 1
                updateLineItem(id, newQuantity)
            }
            else {
                setMessage("Available quantity exceeded!");

            }
        }
    }

    function removeQuantity(id, quantity) {

        const newQuantity = quantity - 1
        updateLineItem(id, newQuantity)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage("");
        }, 2000);
        return () => clearTimeout(timer);
    }, [message])

    return (
        <tr key={key} className='md:border-b md:border-[#333333] max-md:block'>
            {message &&
                <Toastify
                    message={message}
                    className={`ease-in duration-300 opacity-100 translate-x-[0%] bg-[#FF0000]`}
                />
            }
            <td data-label='Product' className='md:flex md:items-center md:gap-[20px] md:text-left p-3 max-md:block max-md:text-center'>
                <img
                    src={product?.variant?.image?.src}
                    alt={product?.title}
                    className='md:w-[100px] max-md:w-[100px] max-md:mb-2 h-auto max-md:mx-auto'
                />
                <span>{product?.title}</span>
            </td>
            <td data-label='Subtotal' className='md:text-center p-3 max-md:block max-md:text-right'>{product?.variant?.priceV2?.currencyCode} {numberWithCommas(product?.variant?.priceV2?.amount)}</td>
            <td data-label='Quantity' aria-label='Quantity' className='qty-prd-cart md:text-center p-3 max-md:block max-md:text-right'>
                <button onClick={() => removeQuantity(product?.id, product?.quantity)} aria-label='Delete'>
                    <FaMinus size="20" />
                </button>
                <input
                    type="text"
                    value={product?.quantity}
                    className="placeholder-black font-medium font-size-18 text-[#000] bg-[#fff] md:min-w-[40px] md:h-[40px] max-md:w-[60px] max-md:h-[30px] text-center p-1 focus:outline-none max-w-[80px] mx-2"
                />
                <button onClick={() => addQuantity(product?.id, product?.quantity, product?.title)} aria-label='Delete'>
                    <FaPlus size="20" />
                </button>
            </td>
            <td data-label='Subtotal' className='md:text-center p-3 max-md:block max-md:text-right'>{product?.variant?.priceV2?.currencyCode} {numberWithCommas(product?.variant?.priceV2?.amount * product?.quantity)}</td>
            <td data-label='Action' className='md:text-center p-3 max-md:block max-md:text-right'>
                <button onClick={() => removeLineItem(product?.id)} aria-label='Delete'>
                    <RiDeleteBin5Line size="20" />
                </button>
            </td>
        </tr>
    )
}

export default LineItem;