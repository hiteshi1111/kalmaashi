import React, { useContext, useState, useEffect } from 'react'
import { LiaUserEditSolid } from "react-icons/lia";
import { MdEditOff } from "react-icons/md";
import TextInput from '../custom/textInput';
import { StoreContext } from '../../store';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { PutRequest } from '../../utils/requests';
import Toastify from '../shared/toastify';
import { navigate } from 'gatsby';

const Profile = () => {

    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState({
        message: "",
        success: false
    });
    const { userData, setUserData, setTrigger } = useContext(StoreContext);

    const idParts = userData?.id.split('/');

    const [formInput, setFormInput] = useState({
        firstName: userData?.firstName || "",
        lastName: userData?.lastName || "",
        email: userData?.email || "",
        phone: userData?.phone || ""
    })

    const firstNameHandler = (e) => {
        const inputValue = e.target.value;
        const alphaValue = inputValue.replace(/[^A-Za-z]/g, '');
        if (alphaValue.length <= 30) {
            setFormInput(prevState => ({ ...prevState, firstName: alphaValue }));
            setError(prevState => ({ ...prevState, message: "" }));
        }
    };

    const lastNameHandler = (e) => {
        const inputValue = e.target.value;
        const alphaValue = inputValue.replace(/[^A-Za-z]/g, '');
        if (alphaValue.length <= 30) {
            setFormInput(prevState => ({ ...prevState, lastName: alphaValue }));
            setError(prevState => ({ ...prevState, message: "" }));
        }
    };

    function profileUpdate(e) {
        setDisabled(false)
        e.preventDefault()
        setError(prevState => ({ ...prevState, message: "" }));
        if (!formInput.firstName || !formInput.lastName) {
            setError(prevState => ({ ...prevState, message: "Fields must not be empty!" }))
        } else {
            const userID = idParts[idParts?.length - 1];
            PutRequest(`${process.env.GATSBY_API_URL}/api/customer/updateCustomer/${userID}`,{
                first_name: formInput.firstName,
                last_name: formInput.lastName
            }).then(response => {
                setError(prevState => ({ ...prevState, success: true }));
            }).catch(err => {
                console.log("err", err)
                setError(prevState => ({ ...prevState, message: err?.data ? err.data.message : "Something went wrong. Try again later!" }));
                const timer = setTimeout(() => {

                    setError((prevState) => ({ ...prevState, message: "" }));
                    setDisabled(true);
                    setFormInput((prevState) => ({
                        ...prevState,
                        firstName: userData?.firstName || "",
                        lastName: userData?.lastName || "",
                    }));
                }, 3000);
                return () => clearTimeout(timer);
            })
        }
    }

    useEffect(() => {
        if (error.success) {
            const timer = setTimeout(() => {
                setError((prevState) => ({ ...prevState, success: false }));
                setDisabled(true);
                setTrigger(prev => prev + 1)
            }, 2000);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error.success])

    function logoutHandler() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('sh-kal-ac');
        }
        setUserData(null);
        navigate("/login");
    }

    return (
        <section className="s-py-sec">
            <div className="container m-auto px-[15px]">
                <div id="profile">
                    <div className="flex-auto">
                        <div className='flex justify-between gap-2 mb-10'>
                            <div>
                                <h4 className="text-white mb-3">Profile Information</h4>
                                <hr className='footer-hr-line' />
                            </div>
                            <div className='mt-2 flex items-center gap-[30px]'>
                                <button onClick={() => setDisabled(prev => !prev)} className="h-[40px] w-[40px] rounded-full border border-[#fff] flex justify-center items-center">
                                    {disabled ? (
                                        <LiaUserEditSolid className='text-white h-6 w-6 cursor-pointer' />
                                    ) : (
                                        <MdEditOff className='text-white h-6 w-6 cursor-pointer' />
                                    )}
                                </button>
                                <button onClick={logoutHandler} className="text-white flex items-center bg-[#D4AF37] px-[10px] py-[5px] rounded-[5px]">Logout <RiLogoutCircleRLine className="ml-[10px]" /> </button>
                            </div>
                        </div>
                        <p className={`text-[14px] text-left text-[#e6bf8c] font-normal mb-[10px] mt-5 ${error.message ? 'block' : 'hidden '}`}>{error.message}</p>
                        {error.success && (
                            <Toastify message="Account details updated!" />
                        )}
                        <div className="flex flex-wrap ">
                            <div className="flex max-md:flex-col w-full md:gap-5">
                                <div className="relative w-full mb-5">
                                    <label htmlFor="first-name" className="block text-white mb-2">First Name*</label>
                                    <div className="relative w-full">
                                        <TextInput
                                            id="first-name"
                                            type="text"
                                            value={formInput.firstName}
                                            onChange={(e) => firstNameHandler(e)}
                                            disabled={disabled}
                                        />
                                        {/* <input type="text" name="uname" id="uname" placeholder="User Name*" className="text-white bg-[transparent] border border-[#888888] rounded-[10px] w-full md:p-4 max-md:p-3 focus:outline-none" /> */}
                                    </div>
                                </div>
                                <div className="relative w-full mb-5">
                                    <label htmlFor="last-name" className="block text-white mb-2">Last Name</label>
                                    <div className="relative w-full">
                                        <TextInput
                                            id="last-name"
                                            type="text"
                                            value={formInput.lastName}
                                            onChange={(e) => lastNameHandler(e)}
                                            disabled={disabled}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex max-md:flex-col w-full md:gap-5">
                                <div className="relative w-full mb-5 md:mb-0">
                                    <label htmlFor="email" className="block text-white mb-2">Email*</label>
                                    <div className="relative w-full">
                                        <TextInput
                                            id="email"
                                            type="email"
                                            value={formInput.email}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="relative w-full mb-5 md:mb-0">
                                    <label htmlFor="phone" className="block text-white mb-2">Phone*</label>
                                    <div className="relative w-full">
                                        <TextInput
                                            id="phone"
                                            type="phone"
                                            value={formInput.phone}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>


                        </div>
                        {!disabled &&
                            <div className='flex pb-[20px] mt-[20px] my-[10px] justify-end'>
                                <button type='button' onClick={profileUpdate} className="flex text-white bg-primary-clr items-center font-medium rounded-full lg:px-10 lg:py-4 max-lg:px-6 max-lg:py-3 hover:bg-[#fff] hover:text-[#000] duration-[400ms,700ms]">Update Profile</button>
                            </div>
                        }
                        <div className='flex border-b border-[#333333] pb-[25px] mt-[20px] my-[10px] justify-end'> </div>
                    </div>
                </div>

            </div >
        </section >
    )
}

export default Profile;