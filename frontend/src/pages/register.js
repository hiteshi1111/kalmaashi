import React, { useState, useEffect } from "react";
import { StaticImage } from "gatsby-plugin-image";
import { PostRequest } from "../utils/requests";
import { checkEmptyFields, validateEmail, validatePassword, validatePhone } from "../utils/formFunctions";
import Loader from "../components/shared/loader";
import Toastify from "../components/shared/toastify"
import { Link, navigate } from "gatsby";
import Seo from "../components/shared/seo";
import InnerPageBanner from "../components/shared/InnerBanner";
import TextInput from "../components/custom/textInput";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    let shopifyToken;
    if (typeof window !== 'undefined') {
        shopifyToken = localStorage.getItem('sh-kal-ac');
    }

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState({
        message: "",
        success: false
    });
    const [formInput, setFormInput] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPass, setShowPass] = useState({
        pass: false,
        confirmPass: false
    });

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

    const handlePhoneInputChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/[^0-9+]/g, '');
        if (numericValue.length <= 10) {
            setFormInput(prevState => ({ ...prevState, phone: numericValue }));
            setError((prevState) => ({ ...prevState, message: '' }));
        }
    };

    function validationHandler() {
        setDisabled(true)
        setError(prevState => ({ ...prevState, message: "" }));
        if (checkEmptyFields(formInput)) {
            setError(prevState => ({ ...prevState, message: "Fields must not be empty!" }));
            setDisabled(false);
        } else if (!validatePhone(formInput.phone)) {
            setError(prevState => ({ ...prevState, message: "Phone number is invalid!" }));
            setDisabled(false);
        } else if (!validateEmail(formInput.email)) {
            setError(prevState => ({ ...prevState, message: "Email is invalid!" }));
            setDisabled(false);
        } else if (!validatePassword(formInput.password)) {
            setError(prevState => ({ ...prevState, message: "Password should contain atleast 8 characters and must contain one uppercase, one lowercase, one digit and one special character!" }));
            setDisabled(false);
        } else if (formInput.password !== formInput.confirmPassword) {
            setError(prevState => ({ ...prevState, message: "Confirm Password should be same as Password!" }));
            setDisabled(false);
        } else {
            PostRequest(`${process.env.GATSBY_API_URL}/api/customer/register`, {
                firstName: formInput.firstName,
                lastName: formInput.lastName,
                email: formInput.email,
                phoneNumber: formInput.phone,
                password: formInput.password,
                passwordConfirmation: formInput.confirmPassword
            }).then(response => {
                setError(prevState => ({ ...prevState, success: true }));
            }).catch(err => {
                if (err?.data?.message?.passwordConfirmation === "must match the provided password") {
                    setError(prevState => ({ ...prevState, message: "Confirm Password must match the provided password!" }));
                } else if (err?.data?.message?.email === "has already been taken") {
                    setError(prevState => ({ ...prevState, message: "Email has already been taken!" }));
                } else if (err?.data?.message?.phone === "Phone has already been taken") {
                    setError(prevState => ({ ...prevState, message: "Phone has already been taken" }));
                } else {
                    setError(prevState => ({ ...prevState, message: err?.data?.message || "Something went wrong. Try again later!" }));
                }
                setDisabled(false);
            })

        }
    }

    useEffect(() => {
        if (error.success) {
            const timer = setTimeout(() => {
                setFormInput((prevState) => ({
                    ...prevState,
                    firstName: "",
                    lastName: "",
                    phone: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                }))
                setError((prevState) => ({ ...prevState, success: false }));
                setDisabled(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [error.success])

    useEffect(() => {
        if (shopifyToken) {
            navigate("/account");
        }
    }, [shopifyToken])

    return (
        <>
            <Seo title="Register" description="" />
            <InnerPageBanner title='Register' maxWidth='472px' pages={pages} />
            <section className="s-py-sec">
                <div className="container m-auto px-[15px]">
                    <div className="relative login-form max-w-[800px] m-auto bg-light-clr rounded-[10px] md:py-14 max-md:py-8 md:px-10 max-md:px-5">
                        {disabled && (<Loader />)}
                        <div className="flex justify-center mb-8">
                            <StaticImage
                                src="../images/logo-desk.webp"
                                alt="logo"
                                className="w-[200px]"
                            />
                        </div>
                        <p className={`text-[14px] text-left text-[#e6bf8c] font-normal mb-[10px] ${error.message ? 'block' : 'hidden '}`}>{error.message}</p>
                        <Toastify 
                            message="Account Created Successfully!" 
                            className={`ease-in duration-300 ${error.success ? "opacity-100 translate-x-[0%]" : "opacity-0 translate-x-[100%]"}`} 
                        />
                        <div>
                            <div className="flex max-md:flex-col w-full md:gap-5">
                                <div className="relative w-full mb-5">
                                    <label htmlFor="first-name" className="block text-white mb-2">First Name*</label>
                                    <div className="relative w-full">
                                        <TextInput id="first-name" type="text" value={formInput.firstName} onChange={(e) => firstNameHandler(e)} />
                                    </div>
                                </div>
                                <div className="relative w-full mb-5">
                                    <label htmlFor="last-name" className="block text-white mb-2">Last Name</label>
                                    <div className="relative w-full">
                                        <TextInput id="last-name" type="text" value={formInput.lastName} onChange={(e) => lastNameHandler(e)} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex max-md:flex-col w-full md:gap-5">
                                <div className="relative w-full mb-5">
                                    <label htmlFor="mobile-number" className="block text-white mb-2">Phone*</label>
                                    <div className="relative w-full flex">
                                        <div className="text-white px-[5px] flex justify-center items-center border border-[#888888] rounded-l-[10px] border-r-0">
                                            +91
                                        </div>
                                        <TextInput
                                            id="mobile-number"
                                            type="text"
                                            value={formInput.phone}
                                            onChange={(e) => handlePhoneInputChange(e)}
                                            className="rounded-l-none border-l-0"
                                        />
                                    </div>
                                </div>
                                <div className="relative w-full mb-5">
                                    <label htmlFor="email" className="block text-white mb-2">Email*</label>
                                    <div className="relative w-full">
                                        <TextInput id="email" type="text" value={formInput.email} onChange={(e) => { setFormInput(prevState => ({ ...prevState, email: e.target.value })); }} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex max-md:flex-col w-full md:gap-5">
                                <div className="relative w-full mb-5">
                                    <label htmlFor="password" className="block text-white mb-2">Password</label>
                                    <div className="relative w-full">
                                        <TextInput id="password" type={showPass.pass ? "text" : "password"} value={formInput.password} onChange={(e) => { setFormInput(prevState => ({ ...prevState, password: e.target.value })); }} />
                                        <div className='pwd-eye-icon absolute top-[50%] right-[15px] translate-x-[0px] translate-y-[-50%] cursor-pointer cursor-pointer h-[20px]'>
                                            <button
                                                type="button"
                                                onClick={() => setShowPass(prevState => ({ ...prevState, pass: !showPass.pass }))}>
                                                {showPass.pass ?
                                                    <FaEyeSlash size={20} className='text-[#fff]' />
                                                    :
                                                    <FaEye size={20} className='text-[#fff]' />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative w-full mb-5">
                                    <label htmlFor="confirm-password" className="block text-white mb-2">Confirm Password</label>
                                    <div className="relative w-full">
                                        <TextInput id="confirm-password" type={showPass.confirmPass ? "text" : "password"} value={formInput.confirmPassword} onChange={(e) => { setFormInput(prevState => ({ ...prevState, confirmPassword: e.target.value })); }} />
                                        <div className='pwd-eye-icon absolute top-[50%] right-[15px] translate-x-[0px] translate-y-[-50%] cursor-pointer cursor-pointer h-[20px]'>
                                            <button
                                                type="button"
                                                onClick={() => setShowPass(prevState => ({ ...prevState, confirmPass: !showPass.confirmPass }))}>
                                                {showPass.confirmPass ?
                                                    <FaEyeSlash size={20} className='text-[#fff]' />
                                                    :
                                                    <FaEye size={20} className='text-[#fff]' />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='text-center md:mt-7 max-md:mt-4 md:mb-14 max-md:mb-10'>
                                <button type="button" className="flex justify-center items-center w-full h-[50px] px-2 max-w-[250px] m-auto text-white bg-primary-clr font-medium rounded-full hover:bg-[#fff] hover:text-[#000] duration-[400ms,700ms]" onClick={validationHandler}>Register</button>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-white">Already have an an account? <Link to="/login" className="primary-clr underline">Log In</Link></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};

const pages = [
    {
        title: "Register",
        handle: ""
    }
]

export default Register;