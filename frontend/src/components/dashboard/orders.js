import React, { useContext, useEffect, useState } from "react";
import { GetRequest } from "../../utils/requests";
import { StoreContext } from "../../store";
import formatDateTime from "../../utils/formatDateTime";

const Orders = () => {
    const [ orders, setOrders ] = useState([]);
    const { userData } = useContext(StoreContext);
    const customerId = userData?.id.split("/Customer/")[1];

    useEffect(() => {
        if (customerId) {
            GetRequest(`${process.env.GATSBY_API_URL}/api/order/` + customerId).then(response => {
                setOrders(response.data.orders || []);
            }).catch(err => {
                console.log(err);
            })
        }
    },[customerId])

    return (
        <>
            <section className="s-py-sec s-pt-sec">
                <div className="container m-auto px-[15px] pt-[90px]">
                    <div>
                        <h4 className='text-white mb-3'>My Orders</h4>
                        <hr className='footer-hr-line' />
                    </div>
                    {orders.length > 0 ? (
                        <table className='text-white w-full table-info table-brd-none mt-8'>
                            <thead className='max-md:hidden'>
                                <tr className='w-full border-b border-[#333333]'>
                                <th className='w-[10%] font-size-18 font-normal font-eagle p-3 text-left'>ID</th>
                                    <th className='text-left w-[35%] font-size-18 font-normal font-eagle p-3'>Product</th>
                                    <th className='w-[10%] font-size-18 font-normal font-eagle p-3'>Price</th>
                                    <th className='w-[10%] font-size-18 font-normal font-eagle p-3'>Quantity</th>
                                    {/* <th className='w-[20%] font-size-18 font-normal font-eagle p-3'>Total Price</th> */}
                                    <th className='w-[10%] font-size-18 font-normal font-eagle p-3'>Ordered At</th>
                                    <th className='w-[15%] font-size-18 font-normal font-eagle p-3'>Payment Status</th>
                                    <th className='w-[15%] font-size-18 font-normal font-eagle p-3'>Fulfillment Status</th>

                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((item, i) => (
                                    <>
                                    {item.line_items.map((subItem, subIndex) => (
                                        <tr key={i} className={`md:border-[#333333] max-md:block ${subIndex === 0 ? 'border-t border-t-[#333333]' : ''}`}>
                                            <td data-label='Price' className='md:text-left p-3 max-md:block max-md:text-right last:opacity-0'>{item.name}</td>
                                            <td data-label='Product' className='md:items-center md:text-left p-3 max-md:block max-md:text-center'>
                                                <span>{subIndex + 1}. {subItem.title}</span>
                                            </td>
                                            {/* <td data-label='Ordered_At' className='md:text-center p-3 max-md:block max-md:text-right'>{subItem.ordered_at}</td> */}
                                            <td data-label='Price' className='md:text-center p-3 max-md:block max-md:text-right'>{item.currency} {subItem.price}</td>
                                            <td data-label='Quantity' className='md:text-center p-3 max-md:block max-md:text-right'>{subItem.quantity}</td>
                                            {/* <td data-label='Total' className='md:text-center p-3 max-md:block max-md:text-right capitalize'>{item.currency} {item.total_price}</td> */}
                                            <td data-label='Subtotal' className='md:text-center p-3 max-md:block max-md:text-right'>{formatDateTime(item.created_at, false)}</td>
                                            <td data-label='Subtotal' className='md:text-center p-3 max-md:block max-md:text-right capitalize'>{item.financial_status}</td>
                                            <td data-label='Subtotal' className='md:text-center p-3 max-md:block max-md:text-right capitalize'>{item.fulfillment_status || "Unfulfilled"}</td>
                                        </tr>
                                    ))}
                                    {/* <tr className="total-price-tr border-b border-b-[#333333] w-full">
                                        <td colSpan={5} data-label='Total' className='md:text-right p-3 max-md:block max-md:text-right'>
                                            <div className="primary-clr max-md:float-left font-medium block">Fulfillment Status: <span className="text-white capitalize">{item.fulfillment_status || "---"} </span> </div>
                                        </td>
                                    </tr> */}
                                    </>
                                ))}
                            </tbody>
                        </table>
                    ):(
                        <div className="text-white flex justify-center mt-8">No Orders to show!</div>
                    )}
                </div>
            </section>
        </>
    )
};

export default Orders;