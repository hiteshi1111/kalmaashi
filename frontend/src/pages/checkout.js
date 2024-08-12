import React, { useContext, useEffect, useState } from 'react';
import LabelledTextInput from '../components/custom/labelledTextInput';
import TextInput from '../components/custom/textInput';
import { StoreContext } from '../store';
import { numberWithCommas } from '../utils/numberWithCommas';
import { GetRequest, PostRequest } from '../utils/requests';
import CheckoutLoader from '../components/shared/checkoutLoader';
import Loader from '../components/shared/loader';
import StateInput from '../components/custom/stateInput';
import statesData from "../data/indianStates.json";
import { checkEmptyFields } from '../utils/formFunctions';
import { navigate } from "gatsby";

const Checkout = () => {
    const key = process.env.EASEBUZZ_KEY;
    const mode = process.env.EASEBUZZ_MODE;
    const { cart, userData, addDiscount, removeDiscount, resetCartHandler, setTrigger } = useContext(StoreContext);
    const [ couponCode, setCouponCode ] = useState("");
    const [ shippingAddress, setShippingAddress ] = useState({
        first_name: userData?.firstName,
        last_name: userData?.lastName,
        address1: "",
        city: "",
        province: "Andaman and Nicobar Islands",
        country: "India",
        zip: "",
        phone: userData?.phone,
        province_code: "AN",
        country_code: "IN",
        country_name: "India"
    });
    const [ disabled, setDisabled ] = useState(false);
    const [ error, setError ] = useState({
        discount: false,
        message: ""
    });        

    const [ success, setSuccess ] = useState({
        discount: false,
        ordered: false
    })

    // UPDATES PROVINCE CODE ON THE BASIS OF SELECTED PROVINCE
    useEffect(() => {
        const foundState = statesData.find(item => item.state === shippingAddress.province);
        setShippingAddress(prevState => ({ ...prevState, province_code: foundState.code }))
    },[shippingAddress.province])

    //NAVIGATES TO HOME PAGE AFTER SUCCESSFUL ORDER
    useEffect(() => {
        if(success.ordered){
            const timer = setTimeout(() => {
                navigate("/");
            }, 5000);
            return () => clearTimeout(timer);
        }
    },[success.ordered])

    //HANDLES DISCOUNT ON CHANGE
    function discountChangeHandler(coupon){
        setError(prevState => ({...prevState, discount: false, message: ""}));
        const upper = coupon.toUpperCase();
        if (upper.length < 10){
            setCouponCode(upper)
        }
    }

    //ADD DISCOUNT TO CART ON CLICK
    async function addDiscountHandler() {
        setError(prevState => ({...prevState, discount: false, message: ""}));
        if(!couponCode){
            setError(prevState => ({...prevState, discount: true, message: "Discount field is empty!"}));
        }else{
            const response = await addDiscount(couponCode);
            if (response.applied){
                setSuccess(prevState => ({...prevState, discount: true}));
            }else{
                setError(prevState => ({...prevState, discount: true, message: response.message}));
            }
        }
    }

    //REMOVE DISCOUNT FROM CART ON CLICK
    async function removeDiscountHandler() {
        removeDiscount();
        setCouponCode("");
        setSuccess(prevState => ({...prevState, discount: false}));
    }

    //FETCHES EXISTING APPLIED DISCOUNT
    useEffect(() => {
        if (cart?.discountApplications.length> 0) {
            setSuccess(prevState => ({...prevState, discount: true}));
        }
    },[cart])

    //CREATES DRAFT ORDER IN SHOPIFY AND INITIATE PAYMENT FUNCTION
    function draftOrderHandler() {
        setDisabled(true);
        setError(prevState => ({ ...prevState, empty: false, message: "" }));
        const id = userData?.id;
        const numberId = id?.split('/');
        const customerId = numberId ? numberId[numberId.length - 1] : null;   
        const customerDetail = {
            firstName: userData?.firstName,
            phone: userData?.phone,
            email: userData?.email
        }
        const payload = {
            lineItems: cart.lineItems,
            discount: cart?.discountApplications.length > 0 ? {
                "description": "",
                "value_type": "fixed_amount",
                "value": cart?.discountApplications[0].value.amount,
                "amount": cart?.discountApplications[0].value.amount,
                "title": cart?.discountApplications[0].code
            }: null,
            customerDetail,
            shippingAddress
        }

        if (checkEmptyFields(shippingAddress)){
            setError(prevState => ({ ...prevState, empty: true, message: `Fill the shipping address` }));
            setDisabled(false);
        }else{
            PostRequest(`${process.env.GATSBY_API_URL}/api/order/draft/${customerId}`, payload).then(response => {
                initiatePaymentProcess(response.data.draftOrderId, response.data.paymentToken);
            }).catch(err => {
                console.log("error", err)
                setError(prevState => ({...prevState, order: true, message: "error doing payment"}));
                alert("error doing payment")
            })
        }
    }

    //INTEGRATE EASEBUZZ SCRIPT FOR PAYMENT AND COMPLETE THE DRAFT ORDER  IN SHOPIFY
    const initiatePaymentProcess = (draftOrderId, token) => {
        window.handlePaymentResponse = (response) => {
            const stat = response.status;
            if (stat === "success") {
                GetRequest(`${process.env.GATSBY_API_URL}/api/order/complete/${draftOrderId}`).then(response => {
                    if (response.data.draft_order.status === "completed"){
                        setDisabled(false);
                        resetCartHandler();
                        setTrigger(prev => prev+1)
                        setSuccess(prevState => ({ ...prevState, ordered: true }));
                    } else if (response.data.draft_order.status === "dropped"){
                        setError(prevState => ({ ...prevState, message: `Payment has been cancelled!` }));
                        setDisabled(false);
                    } else{
                        setError(prevState => ({ ...prevState, message: `Payment has been ${response.data.draft_order.status}` }));
                        setDisabled(false);
                    }
                }).catch(err => {
                    setError(prevState => ({ ...prevState, message: "Payment done but order incompleted!" }));
                    setDisabled(false);
                });
            } else {
                setError(prevState => ({ ...prevState, message: "Unable to do payment!" }));
                setDisabled(false);
            }
        };

        const script1 = document.createElement("script");
        script1.src = "https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/v2.0.0/easebuzz-checkout-v2.min.js";
        script1.id = "easebuzz-checkout";
        script1.defer = true;
        
        script1.onload = () => {
            const script2 = document.createElement("script");
            script2.type = "text/javascript";
            script2.textContent = `
                var easebuzzCheckout = new EasebuzzCheckout('${key}', '${mode}');
                var options = {
                    access_key: '${token}',
                    onResponse: (response) => {
                        window.handlePaymentResponse(response);
                    },
                    theme: "#123456"
                };
                easebuzzCheckout.initiatePayment(options);
            `;
            document.head.appendChild(script2);
        };
        document.head.appendChild(script1);
    };
    
    console.log(userData)
    // SHOWS LOADER UNTIL CART OBJECT IS FETCHED
    if (!cart){
        return (
            <div className='h-[500px]'>
                <Loader className='bg-[#160100]' />
            </div>
        )
    }
    return (
        <div className='w-full relative'>
            {/* IF ORDER IS PLACED SUCCESSFULLY */}
            {success.ordered ? (
                <div className='max-w-[1200px] mx-auto min-h-[500px] py-[50px] flex items-center justify-center flex-col'>
                    <CheckoutLoader />
                    <h3 className='text-[#D4AF37] text-center mt-[10px]'>Your Order has been successfully placed!</h3>
                </div>
            ):(
                //WHEN ORDERING
                <div className='md:px-[30px] max-md:px-[15px] max-w-[1200px] mx-auto md:pt-[100px] max-md:pt-[50px] md:pb-[150px] max-md:pb-[70px]'>
                    {/* SHOWS LOADER IF PAY BUTTON IS CLICKED */}
                    {disabled && (
                        <Loader />
                    )}
                    {!error.discount && error.message && (
                        <p className='text-[#FF0000] mb-[10px]'>{error.message}</p>
                    )}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:gap-[50px] max-lg:gap-[30px]'>
                        <div> 
                            <div>
                                <h3 className='text-white'>Contact Details</h3>
                                <div className='mt-[30px] grid gap-[20px]'>
                                    <LabelledTextInput 
                                        value={userData ? `${userData?.firstName} ${userData?.lastName}` : ""}
                                        placeholder='Full Name'
                                        disabled
                                    />
                                    <LabelledTextInput 
                                        value={userData?.email || ""}
                                        placeholder='Email'
                                        disabled
                                    />
                                    <LabelledTextInput 
                                        value={userData?.phone || ""}
                                        placeholder='Phone'
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className='mt-[35px]'>
                                <h3 className='text-white'>Delivery Address</h3>
                                <div className='mt-[30px] grid gap-[20px]'>
                                    <LabelledTextInput 
                                        value={shippingAddress.address1}
                                        placeholder='Address'
                                        disabled={disabled}
                                        onChange={(e) => setShippingAddress(prevState => ({ ...prevState, address1: e.target.value }))}
                                    />
                                    <LabelledTextInput 
                                        value={shippingAddress.city}
                                        placeholder='City'
                                        disabled={disabled}
                                        onChange={(e) => setShippingAddress(prevState => ({ ...prevState, city: e.target.value }))}
                                    />
                                    <StateInput 
                                        value={shippingAddress.province}
                                        disabled={disabled}
                                        setShippingAddress={setShippingAddress}
                                    />
                                    <LabelledTextInput 
                                        value={shippingAddress.zip}
                                        placeholder='Pincode'
                                        disabled={disabled}
                                        onChange={(e) => setShippingAddress(prevState => ({ ...prevState, zip: e.target.value }))}
                                    />
                                    <LabelledTextInput 
                                        value={shippingAddress.country}
                                        placeholder='Country'
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <h3 className='text-white'>Shipping method</h3>
                                <div className='grid gap-[10px] mt-[30px]'>
                                    {shipping.map((item, i) => (
                                        <div key={i} className='text-white flex justify-between items-center border border-[#D4AF37] px-[10px] py-[10px]'>
                                            <span>{item.title}</span>
                                            <span>{item.price !== 0 ? `INR ${item.price}` : "Free"}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='mt-[35px]'>
                                <h3 className='text-white'>Discount</h3>
                                <div className='flex mt-[20px] gap-[10px] relative'>
                                    <TextInput
                                        value={cart?.discountApplications.length> 0 ? cart.discountApplications[0].code : couponCode}
                                        placeholder='Coupon Code'
                                        className={`rounded-none ${error.discount && "border-[#FF0000]"}`}
                                        onChange={(e) => discountChangeHandler(e.target.value)}
                                        isError={error.discount}
                                        errorMessage={error.message}
                                        disabled={success.discount}
                                    />
                                    {success.discount && (
                                        <button 
                                            onClick={removeDiscountHandler} 
                                            className='absolute right-[115px] inset-y-[7px] text-white text-[18px] cursor-pointer bg-[#aaaaaa7a] h-[30px] w-[30px] rounded-full'
                                        >X</button>
                                    )}
                                    <button
                                        onClick={addDiscountHandler}
                                        className='h-[45px] w-[120px] flex justify-center items-center text-white bg-[#D4AF37] uppercase text-[14px]'
                                    >{success.discount ? "Applied" : "Apply"}</button>
                                </div>
                            </div>
                            <div className='mt-[35px]'>
                                <h3 className='text-white'>Payment</h3>
                                <div className='grid gap-[10px] mt-[20px] border border-[#D4AF37] px-[10px] py-[10px]'>
                                    <div className='text-white flex justify-between items-center'>
                                        <span>Subtotal</span>
                                        <span>{cart?.lineItemsSubtotalPrice.currencyCode} {numberWithCommas(cart?.lineItemsSubtotalPrice.amount)}</span>
                                    </div>
                                    {cart?.discountApplications.length> 0 && (
                                        <div className='flex justify-between items-center'>
                                            <span className='text-[14px] text-[#D4AF37]'>Discount ({cart.discountApplications[0].code})</span>
                                            <span className='text-[14px] text-[#D4AF37]'>- {cart?.discountApplications[0].value.currencyCode} {cart.discountApplications[0].value.amount}</span>
                                        </div>
                                    )}
                                    <div className='text-white flex justify-between items-center'>
                                        <span>Shipping</span>
                                        <span>FREE</span>
                                    </div>
                                    <div className='text-white flex justify-between items-center'>
                                        <span>Estimated Taxes</span>
                                        <span>{cart?.totalTaxV2.currencyCode} {numberWithCommas(cart?.totalTaxV2.amount)}</span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-[#D4AF37] text-[24px]'>Total</span>
                                        <span className='text-[#D4AF37] text-[24px]'>{cart?.totalPriceV2.currencyCode} {numberWithCommas(cart?.totalPriceV2.amount)}</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={draftOrderHandler} className='bg-[#D4AF37] w-full h-[50px] mt-[50px] text-[16px] font-semibold uppercase'>
                                Pay Now      
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const shipping = [
    {
        title: "Standard",
        price: 0
    }
]

export default Checkout;