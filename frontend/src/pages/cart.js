import React, { useContext } from 'react';
import InnerPageBanner from '../components/shared/InnerBanner';
import { StoreContext } from '../store';
import LineItem from '../components/cart/lineItem';
import { Link } from 'gatsby';
import EmptyCart from '../components/cart/emptyCart';
import { numberWithCommas } from "../utils/numberWithCommas";

const Cart = () => {
    return (
        <>
            <InnerPageBanner title='Cart' maxWidth='472px' pages={pages} />
            <CartDetails />
        </>
    )
}

function CartDetails() {
    const { cart } = useContext(StoreContext);
    // const checkoutUrl = cart?.webUrl || "";
    // const checkoutToken = checkoutUrl.split("/checkouts/")[1];

    console.log("CARTTT", cart)

    return (
        <section className="s-py-sec">
            <div className="container m-auto px-[15px]">
                <h4 className='text-white select-none'>My Cart</h4>
                <div className='flex mt-[15px] my-[50px]'>
                    <div className='h-[2px] w-[40px] bg-[#D4AF37]' />
                    <div className='h-[2px] w-[97%] bg-[#333333]' />
                </div>
                {cart?.lineItems.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <table className='text-white w-full table-info'>
                        <thead className='max-md:hidden'>
                            <tr className='w-full border-b border-[#333333]'>
                                <th className='text-left w-[45%] font-size-18 font-normal font-eagle p-3'>Product</th>
                                {/* <th className='w-[10%] font-size-18 font-normal font-eagle p-3'>Price</th> */}
                                <th className='w-[15%] font-size-18 font-normal font-eagle p-3'>Price</th>
                                <th className='w-[20%] font-size-18 font-normal font-eagle p-3'>Quantity</th>
                                <th className='w-[15%] font-size-18 font-normal font-eagle p-3'>Sub Total</th>
                                <th className='w-[10%] font-size-18 font-normal font-eagle p-3'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart?.lineItems.map((item, i) => (
                                <LineItem product={item} key={i} />
                            ))}
                        </tbody>
                    </table>
                )}
                {cart?.lineItems.length !== 0 && (
                    <div className='max-w-[500px] ms-auto mt-[50px]'>
                        <div className='bg-light-clr rounded-[10px] pt-6 pb-8'>
                            <h4 className='text-white border-b border-[#333333] px-[20px] pb-3 select-none'>Cart Total</h4>
                            <div className='px-5 pt-5'>
                                <table className='text-white w-full'>
                                    <tr className='w-full border-b border-[#333333]'>
                                        <th className='text-left w-[50%] font-size-18 font-normal p-3 select-none'>Sub Total</th>
                                        <td className='text-right w-[50%] font-size-18 p-3'>{cart?.totalPrice.currencyCode} {numberWithCommas(cart?.lineItemsSubtotalPrice.amount)}</td>
                                    </tr>
                                    <tr className='w-full border-b border-[#333333]'>
                                        <th className='text-left w-[50%] font-size-18 font-normal p-3 select-none'>Discount</th>
                                        <td className='text-right w-[50%] font-size-18 p-3'>{cart?.discountApplications[0]?.value?.percentage ? `${cart?.discountApplications[0].value.percentage}%` : cart?.discountApplications[0]?.value?.amount ? `INR ${cart?.discountApplications[0].value.amount}` : "---"}</td>
                                    </tr>
                                    <tr className='w-full border-b border-[#333333]'>
                                        <th className='text-left w-[50%] font-size-18 font-normal p-3 select-none'>Total</th>
                                        <td className='text-right w-[50%] font-size-18 p-3'>{cart?.totalPrice.currencyCode} {numberWithCommas(cart?.totalPrice.amount)}</td>
                                    </tr>
                                </table>
                                <div className='mt-7 md:px-5'>
                                    <Link
                                        // to={cart?.webUrl} 
                                        // to={`/checkout?payment=${checkoutToken}`}
                                        to="/contact-us"
                                        aria-label='Checkout'
                                        className={`w-full text-center justify-center flex text-white bg-primary-clr items-center font-medium rounded-full lg:px-10 lg:py-4 max-lg:px-6 max-lg:py-3 hover:bg-[#fff] hover:text-[#000] duration-[400ms,700ms] select-none ${cart?.lineItems.length === 0 && "pointer-events-none"}`}
                                    >Proceed to Checkout</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

const pages = [
    {
        title: "Cart",
        handle: ""
    }
]

export default Cart;