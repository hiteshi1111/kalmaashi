import React from 'react';
import { useState, useEffect } from 'react';
import { PostRequest } from '../../utils/requests'
import { validateEmail } from '../../utils/formFunctions'

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState({
        message: "",
        success: false
    })

    function submissionHandler(e) {
        setError(prevState => ({ ...prevState, message: "" }));
        if (!email){
            setError(prevState => ({ ...prevState, message: "Enter email" }));
        }else if (!validateEmail(email)) {
            setError(prevState => ({ ...prevState, message: "Email is invalid!" }));
        } else {
            PostRequest(`${process.env.GATSBY_API_URL}/api/newsLetter/subscribe`,{email: email}).then(response => {
                setError(prevState => ({ ...prevState, success: true }));
            }).catch(err => {
                setError(prevState => ({ ...prevState, message: err?.data ? err.data.error : "Something went wrong. Try again later!" }));
            })
        }
    }
    const handleEmailInputChange = (e) => {
        const inputValue = e.target.value;
        const val = inputValue.replace(" ", '');
        setEmail(val);
        setError((prevState) => ({ ...prevState, message: '' }));
    };

    useEffect(() => {
        if (error.success) {
            const timer = setTimeout(() => {
                setEmail("");
                setError((prevState) => ({ ...prevState, success: false }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error.success])

    return (
        <section className="bg-[#221e1d] bg-black-img s-py-sec newsletter-section">
            <div className="container m-auto px-[15px]">
                <h2 className="text-white text-center mb-10">Sign Up For Our Newsletter</h2>
                <div className="newsletter-form-info">
                    {error.success ? (
                        <div className="flex md:max-w-[800px] mx-auto">
                            <div className="w-full">
                                <p className="text-[20px] text-center w-full primary-clr">Thank you!<br/>Email has been subscribed successfully!</p>
                            </div>
                        </div>
                    ):(
                        <div className="grid lg:max-w-[800px] max-lg:max-w-[500px] m-auto" >
                            <p className={`text-[14px] text-left text-[#e6bf8c] font-normal mb-[10px] ml-[20px] ${error.message ? 'block' : 'hidden '}`}>{error.message}</p>
                            <div className="w-full relative max-lg:flex max-lg:flex-col">
                                <input 
                                    type="email"
                                    className={`border focus:outline-none bg-light-black-clr rounded-full block w-full lg:px-6 lg:py-5 max-lg:px-5 max-lg:py-4 lg:pe-[180px] max-lg:mb-4 ${error.message && "border-[#880000] border-[2px]"}`} 
                                    placeholder="Enter Your Email Address*" 
                                    required 
                                    value={email} 
                                    onChange={(e) => handleEmailInputChange(e)} 
                                />
                                <button 
                                    aria-label='Subscribe Now' 
                                    onClick={submissionHandler}
                                    className="lg:absolute lg:right-[4px] lg:top-[50%] lg:translate-y-[-50%] lg:ml-2 rounded-full bg-primary-clr text-[#fff] hover:bg-[#160100] hover:text-[#fff] block py-4 px-10 duration-[400ms,700ms]" 
                                >Subscribe</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Newsletter;