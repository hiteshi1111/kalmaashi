import React, { useState, useEffect } from 'react'
import InnerPageBanner from '../components/shared/InnerBanner';
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import bgimg from "../images/bgimgbox.webp";
import Seo from '../components/shared/seo';
import { validateEmail, validatePhone } from '../utils/formFunctions';
import { PostRequest } from '../utils/requests';
import Toastify from '../components/shared/toastify';
import Cta from '../components/custom/cta';
import { Link } from 'gatsby';
import infoData from "../data/info.json";
import Loader from "../components/shared/loader";


const ContactUs = () => {

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState({
        email: false,
        msg: false,
        phone: false,
        message: "",
        success: false
    });
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    })

    const firstNameHandler = (e) => {
        const inputValue = e.target.value;
        const alphaValue = inputValue.replace(/[^A-Za-z]/g, '');
        if (alphaValue.length <= 30) {
            setFormData(prevState => ({ ...prevState, firstName: alphaValue }));
            setError(prevState => ({ ...prevState, message: "" }));
        }
    };

    const lastNameHandler = (e) => {
        const inputValue = e.target.value;
        const alphaValue = inputValue.replace(/[^A-Za-z]/g, '');
        if (alphaValue.length <= 30) {
            setFormData(prevState => ({ ...prevState, lastName: alphaValue }));
            setError(prevState => ({ ...prevState, message: "" }));
        }
    };
    const handlePhoneInputChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, ''); // Remove non-digit characters

        if (numericValue.length <= 10) {
            setFormData((prevState) => ({ ...prevState, phone: numericValue }));
            setError((prevState) => ({ ...prevState, phone: false, message: '' }));
        }
    };
    const handleEmailInputChange = (e) => {
        const inputValue = e.target.value;
        const val = inputValue.replace(" ", '').toLowerCase();
        setFormData((prevState) => ({ ...prevState, email: val }));
        setError((prevState) => ({ ...prevState, email: false, message: '' }));
    };
    const handleSubjectInputChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 50) {
            setFormData(prevState => ({ ...prevState, subject: inputValue }));
            setError(prevState => ({ ...prevState, message: "" }));
        }
    };
    const handleMessageInputChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 500) {
            setFormData(prevState => ({ ...prevState, message: inputValue }));
            setError(prevState => ({ ...prevState, message: "" }));
        }
    };
    function submissionHandler(e) {
        e.preventDefault();
        setDisabled(true);
        setError(prevState => ({ ...prevState, message: "" }));
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.subject) {
            setError(prevState => ({ ...prevState, success: false, message: "Fields must not be empty!" }));
            setDisabled(false);
        } else if (!validateEmail(formData.email)) {
            setError(prevState => ({ ...prevState, email: true, message: "Email is invalid!" }));
            setDisabled(false);
        } else if (!validatePhone(formData.phone)) {
            setError(prevState => ({ ...prevState, phone: true, message: "Phone number is invalid!" }));
            setDisabled(false);
        } else {
            PostRequest(`${process.env.GATSBY_API_URL}/api/contact/submit`, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                message: formData.message,
                subject: formData.subject
            }).then(response => {
                setError(prevState => ({ ...prevState, success: true }));
            }).catch(err => {
                setError(prevState => ({ ...prevState, message: err?.data ? err.data.error : "Something went wrong. Try again later!" }));
                setDisabled(false);

            });
        }
    };
    useEffect(() => {
        if (error.success) {

            const timer = setTimeout(() => {
                setFormData((prevState) => ({
                    ...prevState,
                    firstName: "",
                    lastName: "",
                    email: "",
                    subject: "",
                    phone: "",
                    message: "",
                }))
                setError((prevState) => ({ ...prevState, success: false }));
                setDisabled(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error.success])

    return (
        <>
            <Seo title="Contact Us" description="" />
            <InnerPageBanner title='Contact Us' maxWidth='472px' pages={pages} />
            <section className="s-py-sec">
                <div className="container px-[15px] mx-auto">
                    <div className="flex max-md:flex-col md:gap-20 max-md:gap-4">
                        <div className="md:w-1/3" aria-label='call-us'>
                            <div className="bg-[#fff] flex flex-col rounded-[10px] h-full py-10 px-4 bg-cover bg-center bg-no-repeat shadow-[0_5px_24px_0px_rgba(255,255,255,0.4)]" style={{ backgroundImage: `url(${bgimg})` }}>
                                <div className="flex items-center justify-center rounded-full bg-[#D4AF37] text-white w-[86px] h-[86px] m-auto">
                                    <FaPhone className="text-[28px]" />
                                </div>
                                <h5 className="text-center mt-3 mb-2">Talk To Us</h5>
                                <Link 
                                    to={`tel:${infoData.phone}`} 
                                    aria-label='Phone'
                                    className="text-center font-medium"
                                >{infoData.phone}</Link>
                            </div>
                        </div>
                        <div className="md:w-1/3" aria-label='email-us' >
                            <div className="bg-[#fff] flex flex-col rounded-[10px] h-full py-10 px-4 bg-cover bg-center bg-no-repeat shadow-[0_3px_10px_0px_rgba(255,255,255,0.4)]" style={{ backgroundImage: `url(${bgimg})` }}>
                                <div className="flex items-center justify-center rounded-full bg-[#D4AF37] text-white w-[86px] h-[86px] m-auto">
                                    <MdEmail className="text-[35px]" />
                                </div>
                                <h5 className="text-center mt-3 mb-2">Email Us</h5>
                                <Link 
                                    to={`mailto:${infoData.email}`} 
                                    aria-label='Email'
                                    className="text-center font-medium"
                                >{infoData.email}</Link>
                            </div>
                        </div>
                        <div className="md:w-1/3" aria-label='address'>
                            <div className="bg-[#fff] flex flex-col rounded-[10px] h-full py-10 px-4 bg-cover bg-center bg-no-repeat shadow-[0_5px_24px_0px_rgba(255,255,255,0.4)]" style={{ backgroundImage: `url(${bgimg})` }}>
                                <div className="flex items-center justify-center rounded-full bg-[#D4AF37] text-white w-[86px] h-[86px] m-auto">
                                    <IoLocationSharp className="text-[35px]" />
                                </div>
                                <h5 className="text-center mt-3 mb-2">Visit Us</h5>
                                <Link to={infoData.addressLink} target="_blank"><p className="text-center font-medium">{infoData.address}</p></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Toastify message="Email sent Successfully" className={`ease-in duration-300 ${error.success ? "opacity-100 translate-x-[0%]" : "opacity-0 translate-x-[100%]"}`} />
            <section className="s-py-sec s-pt-sec">
                <div className="container px-[15px] mx-auto">
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="md:p-[40px] max-md:p-[30px] bg-light-clr">
                            <div className="text-center">
                                <h3 className="text-white md:mb-8 max-md:mb-6">How To Find Us</h3>
                                <iframe 
                                    className="md:h-[420px] max-md:h-[300px]" 
                                    title="Embedded Location"  
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d38804.338176525365!2d76.68678782678155!3d30.722579573813327!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fefdea3131f8f%3A0x815880d2b973d6b0!2sKalmaashi!5e0!3m2!1sen!2sin!4v1709631094246!5m2!1sen!2sin" 
                                    width="100%" 
                                    allowfullscreen="" 
                                    loading="lazy" 
                                    referrerpolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                        <div className="relative md:p-[40px] max-md:p-[30px] bg-light-clr">
                            {disabled && (<Loader />)}
                            <div className="text-center">
                                <h3 className="text-white md:mb-8 max-md:mb-6">Make An Online Enquiry</h3>
                                <p className={`text-[14px] text-left text-[#e6bf8c] font-normal mb-[10px] ${error.message ? 'block' : 'hidden '}`}>{error.message}</p>
                                <form>
                                    <div className="grid md:grid-cols-6 max-md:grid-cols-1 gap-4">
                                        <div className="sm:col-span-3">
                                            <input
                                                type="text"
                                                name="fname"
                                                id="fname"
                                                placeholder="First Name*"
                                                className="text-white bg-[transparent] border border-[#888888] rounded-[10px] w-full md:p-4 max-md:p-3 focus:outline-none"
                                                value={formData.firstName}
                                                onChange={(e) => firstNameHandler(e)}
                                            />
                                        </div>
                                        <div className="sm:col-span-3">
                                            <input type="text" name="lname" id="lname" placeholder="Last Name*" className="text-white bg-[transparent] border border-[#888888] rounded-[10px] w-full md:p-4 max-md:p-3 focus:outline-none" value={formData.lastName} onChange={(e) => lastNameHandler(e)} />
                                        </div>
                                        <div className="sm:col-span-3">
                                            <input type="email" name="email" id="email" placeholder="Email Address*" className="text-white bg-[transparent] border border-[#888888] rounded-[10px] w-full md:p-4 max-md:p-3 focus:outline-none" value={formData.email} onChange={(e) => handleEmailInputChange(e)} />
                                        </div>
                                        <div className="sm:col-span-3">
                                            <input type="tel" name="Phone" id="phone" placeholder="Phone*" className="text-white bg-[transparent] border border-[#888888] rounded-[10px] w-full md:p-4 max-md:p-3 focus:outline-none" value={formData.phone} onChange={(e) => handlePhoneInputChange(e)} />
                                        </div>
                                        <div className="sm:col-span-6">
                                            <input type="text" name="subject" id="lname" placeholder="Subject*" className="text-white bg-[transparent] border border-[#888888] rounded-[10px] w-full md:p-4 max-md:p-3 focus:outline-none" value={formData.subject} onChange={(e) => handleSubjectInputChange(e)} />
                                        </div>
                                        <div className="sm:col-span-6">
                                            <textarea id="msginput" placeholder="Message" className="text-white bg-[transparent] border border-[#888888] rounded-[10px] w-full h-[182px] md:p-4 max-md:p-3 focus:outline-none" value={formData.message} onChange={(e) => handleMessageInputChange(e)} ></textarea>
                                        </div>
                                    </div>
                                    <Cta
                                        title='Send Message'
                                        onClick={submissionHandler}
                                        action
                                        className='mt-[20px]'
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

const pages = [
    {
        title: "Contact Us",
        handle: ""
    }
]

export default ContactUs;