import { StaticImage } from 'gatsby-plugin-image';
import React, { useState, useRef } from 'react';
import TextInput from '../components/custom/textInput';
import { checkEmptyFields, validateEmail, validatePhone } from '../utils/formFunctions';
import { PostRequest } from '../utils/requests';
import { FaCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import ReCAPTCHA from "react-google-recaptcha";
import Loader from '../components/shared/loader';

const TalentHunt = () => {
    const SITE_KEY = process.env.CAPTCHA;
    // const key = process.env.EASEBUZZ_KEY;
    // const mode = process.env.EASEBUZZ_MODE;
    const [status, setStatus] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [recaptchaValue, setRecaptchaValue] = useState('');
    const captchaRef = useRef();

    const [formInput, setFormInput] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        phone: "",
        email: ""
    })
    const [error, setError] = useState({
        captcha: false,
        message: "",
        success: false
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

    const handleCaptchaChange = value => {
        setRecaptchaValue(value);
        setError({
            captcha: false,
            message: ''
        })
    }

    // function submitHandler() {
    //     setDisabled(true);
    //     setError(prevState => ({ ...prevState, message: "" }));
    //     if (checkEmptyFields(formInput)) {
    //         setError(prevState => ({ ...prevState, message: "Fields must not be empty!" }));
    //         setDisabled(false);
    //     }else if (!recaptchaValue) {
    //         setError(prevState => ({ ...prevState, captcha:true, message: "Please verify you are not a robot.", }))
    //         setDisabled(false);
    //     }else if (!validatePhone(formInput.phone)) {
    //         setError(prevState => ({ ...prevState, message: "Phone number is invalid!" }));
    //         setDisabled(false);
    //     } else if (!validateEmail(formInput.email)) {
    //         setError(prevState => ({ ...prevState, message: "Email is invalid!" }));
    //         setDisabled(false);
    //     }else {
    //         PostRequest(`${process.env.GATSBY_API_URL}/api/candidate/draft`, {
    //             firstName: formInput.firstName,
    //             lastName: formInput.lastName,
    //             email: formInput.email,
    //             phone: formInput.phone,
    //             birthDay: formattedBirthday
    //         }).then(resp => {
    //             PostRequest(`${process.env.GATSBY_API_URL}/api/payment/`, {
    //                 firstName: formInput.firstName,
    //                 email: formInput.email,
    //                 phone: formInput.phone
    //             }).then(response => {
    //                 initiatePaymentProcess(response.data.data, resp.data.candidateId);
    //             }).catch(err => {
    //                 setError(prevState => ({ ...prevState, message: err.data }));
    //                 setDisabled(false);
    //             });
    //         }).catch(err => {
    //             setError(prevState => ({ ...prevState, message: err.data || "Something went wrong!" }));
    //             setDisabled(false);
    //         });
    //     }
    // }


    function submitHandler() {
        setDisabled(true);
        setError(prevState => ({ ...prevState, message: "" }));
        if (checkEmptyFields(formInput)) {
            setError(prevState => ({ ...prevState, message: "Fields must not be empty!" }));
            setDisabled(false);
        } else if (!recaptchaValue) {
            setError(prevState => ({ ...prevState, captcha: true, message: "Please verify you are not a robot.", }))
            setDisabled(false);
        } else if (!validatePhone(formInput.phone)) {
            setError(prevState => ({ ...prevState, message: "Phone number is invalid!" }));
            setDisabled(false);
        } else if (!validateEmail(formInput.email)) {
            setError(prevState => ({ ...prevState, message: "Email is invalid!" }));
            setDisabled(false);
        } else {
            PostRequest(`${process.env.GATSBY_API_URL}/api/candidate/draft`, {
                firstName: formInput.firstName,
                lastName: formInput.lastName,
                email: formInput.email.toLowerCase(),
                phone: formInput.phone,
                birthDay: formattedBirthday
            }).then(response => {
                setStatus(response.status);
                setDisabled(false);
            }).catch(err => {
                // console.log("err", err)
                setError(prevState => ({ ...prevState, message: err?.data || "Something went wrong!" }));
                setDisabled(false);
            });
        }
    }

    const birthday = formInput.dob ? new Date(formInput.dob) : "";
    const formattedBirthday = birthday ? birthday.toISOString() : "";

    // const initiatePaymentProcess = (token, candidateId) => {
    //     window.handlePaymentResponse = (response) => {
    //         const txnid = response.txnid;
    //         const stat = response.status;
    //         if (stat === "success") {
    //             PostRequest(`${process.env.GATSBY_API_URL}/api/candidate/register`, {
    //                 candidateId: candidateId,
    //                 transactionId: txnid
    //             }).then(response => {
    //                 setStatus(response.status);
    //                 setDisabled(false);
    //             }).catch(err => {
    //                 setError(prevState => ({ ...prevState, message: "Payment done but registration unsuccessful!" }));
    //                 setDisabled(false);
    //             });
    //         } else {
    //             setStatus(response.status);
    //             setDisabled(false);
    //         }
    //     };

    //     const script1 = document.createElement("script");
    //     script1.src = "https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/v2.0.0/easebuzz-checkout-v2.min.js";
    //     script1.id = "easebuzz-checkout";
    //     script1.defer = true;

    //     script1.onload = () => {
    //         const script2 = document.createElement("script");
    //         script2.type = "text/javascript";
    //         script2.textContent = `
    //             var easebuzzCheckout = new EasebuzzCheckout('${key}', '${mode}');
    //             var options = {
    //                 access_key: '${token}',
    //                 onResponse: (response) => {
    //                     window.handlePaymentResponse(response);
    //                 },
    //                 theme: "#123456"
    //             };
    //             easebuzzCheckout.initiatePayment(options);
    //         `;
    //         document.head.appendChild(script2);
    //     };
    //     document.head.appendChild(script1);
    // };

    // useEffect(() => {
    //     if (status) {
    //         const timer = setTimeout(() => {
    //             setFormInput({
    //                 firstName: "",
    //                 lastName: "",
    //                 dob: "",
    //                 phone: "",
    //                 email: ""
    //             })
    //             setStatus(null);
    //         }, [6000])
    //         return () => clearTimeout(timer);
    //     }
    // }, [status])

    const currentDate = new Date();
    const minDate = new Date(currentDate.getFullYear() - 12, currentDate.getMonth(), currentDate.getDate()).toISOString().split('T')[0];

    return (
        <div className='talenthunt w-full overflow-hidden'>
            <div className='container mx-auto md:px-[20px] max-md:px-[10px] py-[50px]'>
                <div className='flex justify-center max-md:mb-[50px]'>
                    <StaticImage
                        src="../images/logo-desk.webp"
                        alt="Kalmaashi"
                        title='Talent Hunt'
                        className='max-w-[600px] mx-auto'
                    />
                </div>
                <div className='grid lg:grid-cols-2 form bg-[#d4a374] rounded-[50px] relative bg-five-imgs md:p-[50px] max-md:px-[15px] max-md:py-[40px] md:m-[50px] max-md:m-[15px]'>
                    <div className='bg-four-imgs absolute w-full h-full z-[0]'>
                        <StaticImage
                            src="../images/lotus.webp"
                            alt="Kalmaashi"
                            title='Talent Hunt'
                            className='!absolute md:-top-[50px] md:-left-[60px] md:w-[170px] max-md:-top-[25px] max-md:-left-[32px] max-md:w-[100px] -rotate-45'
                        />
                        <StaticImage
                            src="../images/lotus.webp"
                            alt="Kalmaashi"
                            title='Talent Hunt'
                            className='!absolute -top-[50px] -right-[60px] w-[170px] rotate-45 max-md:-top-[25px] max-md:-right-[32px] max-md:w-[100px]'
                        />
                        <StaticImage
                            src="../images/lotus.webp"
                            alt="Kalmaashi"
                            title='Talent Hunt'
                            className='!absolute -bottom-[50px] -right-[60px] w-[170px] rotate-[135deg]  max-md:-bottom-[25px] max-md:-right-[32px] max-md:w-[100px]'
                        />
                        <StaticImage
                            src="../images/lotus.webp"
                            alt="Kalmaashi"
                            title='Talent Hunt'
                            className='!absolute -bottom-[50px] -left-[60px] w-[170px] -rotate-[135deg] max-md:-bottom-[25px] max-md:-left-[32px] max-md:w-[100px]'
                        />
                    </div>
                    <div className='md:px-[20px] text-center z-10'>
                        <h1 className='text-[#FFE3BC]'>Talent Hunt</h1>
                        {/* <p className='text-[#FFE3BC] text-[24px]'>5th & 6th April 2024</p> */}

                        <div className='w-full'>
                            <StaticImage
                                src="../images/comp-logo.webp"
                                alt="Kalmaashi"
                                title='Talent Hunt'
                                className='max-w-[350px] mx-auto'
                            />
                        </div>
                        <div className='glass-mob px-[10px]'>
                            <p className='text-[16px] py-[10px] text-left'><b>Explore your creativity by submitting your artwork in two categories:</b><br />
                                <ul className='my-[5px]'>
                                    <li><span className='font-semibold'>Online Submissions:</span> Share your canvas paintings, sculptures, macramé, and more digitally. Perfect for wide audience reach.</li>
                                    {/* <li className='mt-[5px]'><span className='font-semibold'>Live Art Show on 5th April:</span> Present your art in person for direct engagement with an art-loving audience. </li> */}
                                </ul>
                                For more info, call us on +91 7087300675. Seize this opportunity to showcase your masterpiece!
                            </p>
                        </div>
                    </div>
                    <div className='md:px-[20px] z-10 relative'>
                        {disabled && (
                            <Loader />
                        )}
                        {status ? (
                            status === "success" || status === 201 ? (
                                <div className='glass-desk h-[400px] lg:h-full w-full flex flex-col justify-center items-center'>
                                    {/* <p className='flex text-center'>Payment Successful! <FaCheckCircle className='ml-[10px]' size="20" color='#008000' /></p> */}
                                    <FaCheckCircle className='ml-[10px]' size="50" color='#008000' />
                                    <h4 className='text-[28px] text-center'>Thankyou for registration!</h4>
                                </div>
                            ) : (
                                <div className='glass-desk h-[400px] lg:h-full w-full flex flex-col justify-center items-center'>
                                    <p className='flex text-center'>Payment Unsuccessful! <RxCrossCircled className='ml-[10px]' size="20" color='#FF0000' /></p>
                                    <h4 className='text-[28px] text-center'>Registration failed!</h4>
                                </div>
                            )
                        ) : (
                            <>
                                <h3 className='text-center text-[#8B572A] font-bold mt-[10px] mb-[30px]'>FILL YOUR INFORMATION</h3>
                                {!error.captcha && error.message && (
                                    <p className='text-[#FF0000] mb-[10px]'>{error.message}</p>
                                )}
                                <div className='grid gap-[20px]'>
                                    <div className='relative'>
                                        <TextInput
                                            name="firstName"
                                            value={formInput.firstName}
                                            onChange={(e) => firstNameHandler(e)}
                                            placeholder="First Name"
                                            disabled={disabled}
                                            className='bg-white rounded-[5px] !text-black'
                                        />
                                        <label htmlFor='firstName' className='select-none absolute bottom-[-5px] left-[10px] text-[12px] leading-[1] uppercase bg-[#000000a6] text-white px-[5px] py-[1px]'>First Name</label>
                                    </div>
                                    <div className='relative'>
                                        <TextInput
                                            name="lastName"
                                            value={formInput.lastName}
                                            onChange={(e) => lastNameHandler(e)}
                                            placeholder="Last Name"
                                            disabled={disabled}
                                            className='bg-white rounded-[5px] !text-black'
                                        />
                                        <label htmlFor='lastName' className='select-none absolute bottom-[-5px] left-[10px] text-[12px] leading-[1] uppercase bg-[#000000a6] text-white px-[5px] py-[1px]'>Last Name</label>
                                    </div>
                                    <div className='relative block w-full dob-input'>
                                        <TextInput
                                            name="dob"
                                            type="date"
                                            value={formInput.dob}
                                            max={minDate}
                                            placeholder="Date of Birth"
                                            className='bg-white rounded-[5px] !text-black !block min-w-[95%] !text-left'
                                            disabled={disabled}
                                            onChange={(e) => setFormInput(prevState => ({ ...prevState, dob: e.target.value }))}
                                        />
                                        <label htmlFor='dob' className='select-none absolute bottom-[-5px] left-[10px] text-[12px] leading-[1] uppercase bg-[#000000a6] text-white px-[5px] py-[1px]'>Date of Birth</label>
                                    </div>
                                    <div className='relative'>
                                        <div className='flex'>
                                            <div className='border border-[#888888] border-r-0 rounded-l-[5px] bg-white flex justify-center items-center px-[20px] select-none'>
                                                +91
                                            </div>
                                            <TextInput
                                                name='phone'
                                                value={formInput.phone}
                                                disabled={disabled}
                                                placeholder="Phone Number"
                                                className='bg-white rounded-r-[5px] rounded-l-[0px] !text-black'
                                                onChange={(e) => handlePhoneInputChange(e)}
                                            />
                                        </div>
                                        <label htmlFor='phone' className='select-none absolute bottom-[-5px] left-[10px] text-[12px] leading-[1] uppercase bg-[#000000a6] text-white px-[5px] py-[1px]'>Phone Number</label>
                                    </div>
                                    <div className='relative'>
                                        <TextInput
                                            name='email'
                                            type="email"
                                            value={formInput.email}
                                            placeholder="Email"
                                            disabled={disabled}
                                            className='bg-white rounded-[5px] !text-black'
                                            onChange={(e) => setFormInput(prevState => ({ ...prevState, email: e.target.value }))}
                                        />
                                        <label htmlFor='email' className='select-none absolute bottom-[-5px] left-[10px] text-[12px] leading-[1] uppercase bg-[#000000a6] text-white px-[5px] py-[1px]'>Email</label>
                                    </div>
                                    <div className='relative>'>
                                        <ReCAPTCHA
                                            sitekey={SITE_KEY}
                                            onChange={handleCaptchaChange}
                                            ref={captchaRef}
                                        />
                                        {error.captcha && (
                                            <p className='text-[#FF0000] mb-[10px]'>{error.message}</p>
                                        )}

                                    </div>
                                </div>
                                <button onClick={submitHandler} className='bg-[#1D0605] text-white mt-[30px] w-full py-[8px]'>
                                    Register Now
                                </button>
                                <p className='text-[12px] mt-[15px] text-left'>Note: Please check your email after successful registration.</p>

                                {/* <div className='glass-desk px-[10px] py-[30px] lg:shadow-md mb-[10px] mt-[40px]'>
                                    <h3 className='text-center text-[#8B572A] font-bold'>PAYMENT INFORMATION</h3>
                                    <div className='flex justify-between mt-[20px]'>
                                        <span className='text-[16px]'>registration Fee:</span>
                                        <span className='text-[16px]'>INR 300</span>
                                    </div>
                                    <button onClick={submitHandler} className='bg-[#1D0605] text-white mt-[30px] w-full py-[8px]'>
                                        Pay Now
                                    </button>
                                    <p className='text-[12px] mt-[20px] text-center'>Note: You will receive an email after successful payment.</p>
                                </div> */}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TalentHunt;
