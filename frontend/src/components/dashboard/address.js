import React, { useContext, useState, useEffect } from 'react'
import { MdDelete, MdOutlineAddHomeWork, MdOutlineCancel } from "react-icons/md";
import TextInput from '../custom/textInput';
import { StoreContext } from '../../store';
import { PostRequest, DeleteRequest } from '../../utils/requests';
import Toastify from '../shared/toastify';

const Address = () => {
    const [error, setError] = useState({
        message: "",
        success: false
    });

    const { userData, setTrigger } = useContext(StoreContext);
    const idParts = userData?.id.split('/');

    const [addAddress, setAddAddress] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [deleteId, setDeleteId] = useState("")

    const [formInput, setFormInput] = useState({
        phone: "",
        address: "",
        zip: "",
        city: "",
        country: "",
    });

    // const firstNameHandler = (e) => {
    //     const inputValue = e.target.value;
    //     const alphaValue = inputValue.replace(/[^A-Za-z]/g, '');
    //     if (alphaValue.length <= 30) {
    //         setFormInput(prevState => ({ ...prevState, firstName: alphaValue }));
    //         // setError(prevState => ({ ...prevState, message: "" }));
    //     }
    // };

    const phoneNumberHandler = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/[^0-9+]/g, '');

        if (numericValue.length <= 10) {
            setFormInput((prevState) => ({ ...prevState, phone: numericValue }));
            setError((prevState) => ({ ...prevState, message: '' }));
        }
    };

    const zipCodeHandler = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, '');

        if (numericValue.length <= 6) {
            setFormInput((prevState) => ({ ...prevState, zip: numericValue }));
            setError(prevState => ({ ...prevState, message: "" }));
        }
    };

    const addressHandler = (e) => {
        const inputValue = e.target.value;
        setFormInput(prevState => ({ ...prevState, address: inputValue }));
        setError(prevState => ({ ...prevState, message: "" }));
    };

    const cityNameHandler = (e) => {
        const inputValue = e.target.value;
        const alphaValue = inputValue.replace(/[^A-Za-z]/g, '');
        setFormInput(prevState => ({ ...prevState, city: alphaValue }));
        setError(prevState => ({ ...prevState, message: "" }));
    };

    const countryNameHandler = (e) => {
        const inputValue = e.target.value;
        const alphaValue = inputValue.replace(/[^A-Za-z]/g, '');
        setFormInput(prevState => ({ ...prevState, country: alphaValue }));
        setError(prevState => ({ ...prevState, message: "" }));
    };

    function handleAddAddress(e) {
        e.preventDefault()
        setAddAddress(true);
        if (!formInput.phone || !formInput.address || !formInput.city || !formInput.zip || !formInput.country) {
            setError(prevState => ({ ...prevState, message: "Fields must not be empty!" }))
        } else if (formInput.zip.length !== 6) {
            setError(prevState => ({ ...prevState, message: "Pincode is invalid!" }));
        } else if (formInput.address.length > 200) {
            setError(prevState => ({ ...prevState, message: "Address should have max Length of 200!" }));
        } else if (formInput.city.length > 50) {
            setError(prevState => ({ ...prevState, message: "City should have max Length of 50!" }));
        } else if (formInput.address.country > 50) {
            setError(prevState => ({ ...prevState, message: "Country should have max Length of 50!" }));
        } else {
            const userID = idParts[idParts?.length - 1];
            PostRequest(`${process.env.GATSBY_API_URL}/api/customer/addAddress/${userID}`,
                {
                    phone: formInput.phone,
                    address: formInput.address,
                    zip: formInput.zip,
                    city: formInput.city,
                    country: formInput.country,
                }
            ).then(response => {
                setError(prevState => ({ ...prevState, success: true }));
            }).catch(err => {
                setError(prevState => ({ ...prevState, message: err?.data ? err.data.message : "Something went wrong. Try again later!" }));

                const timer = setTimeout(() => {
                    setError((prevState) => ({ ...prevState, message: "" }));
                    setAddAddress(false);
                    setFormInput((prevState) => ({
                        ...prevState,
                        phone: "",
                        address: "",
                        zip: "",
                        city: "",
                        country: "",
                    }));

                }, 3000);
                return () => clearTimeout(timer);

            })
        }
    }

    useEffect(() => {
        if (error.success) {
            const timer = setTimeout(() => {
                setFormInput((prevState) => ({
                    ...prevState,
                    phone: "",
                    address: "",
                    zip: "",
                    city: "",
                    country: "",
                }))
                setError((prevState) => ({ ...prevState, success: false }));
                setAddAddress(false);
                setTrigger(prev => prev + 1)
            }, 2000);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error.success])

    function handleDeleteAddress(id) {
        const numericPart = id.match(/\d+/);
        if (numericPart) {
            const address_id = numericPart[0];
            if (address_id) {
                setConfirm(true)
                setDeleteId(address_id)
            }
        }
    }

    function confirmDelete() {
        const userID = idParts[idParts?.length - 1];
        DeleteRequest(`${process.env.GATSBY_API_URL}/api/customer/removeAddress/${userID}/${deleteId}`).then(response => {
            setConfirm(false)
            setTrigger(prev => prev + 1)
        }).catch(err => {
            console.log("err", err)
        })
    }

    return (
        <section className="">
            <div className="container m-auto px-[15px]">
                <div id="address">
                    <div className="flex-auto">
                        <div className='flex justify-between gap-2 mb-10'>
                            <div>
                                <h4 className="text-white mb-3">Manage Addresses</h4>
                                <hr className='footer-hr-line' />
                            </div>
                            <button onClick={() => setAddAddress(prev => !prev)} className='mt-2  items-center gap-[30px]'>
                                {addAddress ? (
                                    <div className="text-white flex items-center bg-[#D4AF37] px-[10px] py-[5px] rounded-[5px]">Cancel <MdOutlineCancel className="ml-[10px]" /> </div>
                                ):(
                                    <div className="text-white flex items-center bg-[#D4AF37] px-[10px] py-[5px] rounded-[5px]">Add a New Address <MdOutlineAddHomeWork className="ml-[10px]" /> </div>
                                )}
                            </button>
                        </div>
                        {addAddress ? (
                            <>
                                <p className={`text-[14px] text-left text-[#e6bf8c] font-normal mb-[10px] mt-5 ${error.message ? 'block' : 'hidden '}`}>{error.message}</p>
                                {error.success && (
                                    <Toastify message="Address added successfully!" />
                                )}
                                <div className="flex flex-wrap">

                                    {/* <div className="flex max-md:flex-col w-full md:gap-5">

                                <div className="flex max-md:flex-col w-full md:gap-5">
                                    <div className="relative w-full mb-5">
                                        <label htmlFor="first-name" className="block text-white mb-2">Name*</label>
                                        <div className="relative w-full">
                                            <TextInput
                                                id="first-name"
                                                type="text"
                                                value={formInput.first_name}
                                                onChange={(e) => setFormInput((prevState) => ({ ...prevState, first_name: e.target.value }))}
                                            />
                                        </div>
                                    </div>
                                    <div className="relative w-full mb-5">
                                        <label htmlFor="last-name" className="block text-white mb-2">Phone*</label>
                                        <div className="relative w-full">
                                            <TextInput
                                                id="last-name"
                                                type="text"
                                                value={formInput.last_name}
                                                onChange={(e) => setFormInput((prevState) => ({ ...prevState, last_name: e.target.value }))}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                                    <div className="flex max-md:flex-col w-full md:gap-5">
                                        <div className="flex max-md:flex-col w-full md:gap-5">
                                            <div className="relative w-full mb-5">
                                                <label htmlFor="country" className="block text-white mb-2">Phone</label>
                                                <div className="relative w-full">
                                                    <TextInput
                                                        id="phone"
                                                        type="text"
                                                        value={formInput.phone}
                                                        onChange={(e) => phoneNumberHandler(e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative w-full mb-5">
                                            <label htmlFor="zip" className="block text-white mb-2">Zip</label>
                                            <div className="relative w-full">
                                                <TextInput
                                                    id="zip"
                                                    type="text"
                                                    value={formInput.zip}
                                                    onChange={(e) => zipCodeHandler(e)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex max-md:flex-col w-full md:gap-5">
                                        <div className="relative w-full mb-5">
                                            <label htmlFor="country" className="block text-white mb-2">Address</label>
                                            <div className="relative w-full">
                                                <textarea
                                                    id="address"
                                                    type="text"
                                                    value={formInput.address}
                                                    onChange={(e) => addressHandler(e)}
                                                    className="text-white bg-[transparent] border border-[#888888] rounded-[10px] h-[90px] pt-2 !w-full px-[8px] focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex max-md:flex-col w-full md:gap-5">
                                        <div className="flex max-md:flex-col w-full md:gap-5">
                                            <div className="relative w-full mb-5">
                                                <label htmlFor="country" className="block text-white mb-2">City</label>
                                                <div className="relative w-full">
                                                    <TextInput
                                                        id="city"
                                                        type="text"
                                                        value={formInput.city}
                                                        onChange={(e) => cityNameHandler(e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex max-md:flex-col w-full md:gap-5">
                                            <div className="relative w-full mb-5">
                                                <label htmlFor="country" className="block text-white mb-2">Country</label>
                                                <div className="relative w-full">
                                                    <TextInput
                                                        id="country"
                                                        type="text"
                                                        value={formInput.country}
                                                        onChange={(e) => countryNameHandler(e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex pb-[20px] mt-[20px] my-[10px] justify-end'>
                                    <button onClick={handleAddAddress} className="flex text-white bg-primary-clr items-center font-medium rounded-full lg:px-10 lg:py-4 max-lg:px-6 max-lg:py-3 hover:bg-[#fff] hover:text-[#000] duration-[400ms,700ms]">Add Address</button>
                                </div>
                            </>
                        ):(
                            <>
                                {userData?.addresses?.edges.map((item) => (
                                    < div className='w-full h-200  mx-auto border border-[#333333] text-white px-8 flex justify-between items-center'>
                                        <div className='py-8'>
                                            <div className='flex gap-8 pb-4'>
                                                {/* <p>Kusum Lata</p> */}
                                                <p>{item?.node?.phone}</p>
                                            </div>
                                            <p>{item?.node?.address1}, {item?.node?.city}, {item?.node?.country} - {item?.node?.zip}</p>

                                        </div>
                                        <button onClick = {() => handleDeleteAddress(item?.node?.id)} aria-label='Delete'>
                                            <MdDelete className='text-white h-6 w-6 cursor-pointer' />
                                        </button>
                                        {
                                            confirm && (
                                                <>
                                                    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50`}>
                                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-md">
                                                            <p className="mb-4 text-black">Are you sure you want to delete this address?</p>
                                                            <div className="flex justify-end">
                                                                <button className="mr-2 px-4 py-2 text-white bg-red-500 rounded-md" onClick={confirmDelete}>
                                                                    Confirm
                                                                </button>
                                                                <button className="px-4 py-2 text-white bg-gray-500 rounded-md" onClick={() => setConfirm(false)}>
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                    </div>
                                ))}
                            </>
                        )}
                        <div className='flex border-b border-[#333333] pb-[25px] mt-[20px] my-[10px] justify-end'> </div>
                    </div>
                </div>
            </div >
        </section >
    )
}

export default Address;