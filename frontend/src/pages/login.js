import React, { useState, useContext, useEffect } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import Seo from '../components/shared/seo';
import InnerPageBanner from '../components/shared/InnerBanner';
import { checkEmptyFields } from '../utils/formFunctions';
import { StoreContext } from '../store/index';
import { PostRequest } from '../utils/requests';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, navigate } from 'gatsby';
import Loader from '../components/shared/loader';
import TextInput from '../components/custom/textInput';

const Login = () => {
    const { setUserData } = useContext(StoreContext);
    const [disabled, setDisabled] = useState(false);
    let shopifyToken;
    if (typeof window !== 'undefined') {
        shopifyToken = localStorage.getItem('sh-kal-ac');
    }
    
    const [error, setError] = useState({
        message: '',
        success: false,
    });
    const [formInput, setFormInput] = useState({
        email: '',
        password: '',
    });
    const [showPass, setShowPass] = useState(false);

    function validationHandler() {
        setDisabled(true);
        setError(prevState => ({ ...prevState, message: '' }));
        if (checkEmptyFields(formInput)) {
            setError(prevState => ({ ...prevState, message: 'Fields must not be empty!' }));
            setDisabled(false);
        } else {
            PostRequest(`${process.env.GATSBY_API_URL}/api/customer/login`, {
                email: formInput.email,
                password: formInput.password
            }).then(response => {
                const accessToken = response?.data?.accessToken;
                // const expiresAt = new Date(response?.data?.expiresAt);
                if (typeof window !== 'undefined') {
                    localStorage.setItem('sh-kal-ac', accessToken);
                }
                setUserData(response?.data?.customerData)
                setError(prevState => ({ ...prevState, success: true }));
                navigate('/account');
            }).catch(err => {
                setError(prevState => ({ ...prevState, success: false, message: err.data.message || "Something went wrong. Try again later!" }));
                setDisabled(false);
            })
        }
    }

    useEffect(() => {
        if (shopifyToken) {
            navigate("/account");
        }
    },[shopifyToken])

    return (
        <>
            <Seo title="Login" description="" />
            <InnerPageBanner title="Login" maxWidth="472px" pages={pages} />
            <section className="s-py-sec">
                <div className="container m-auto px-[15px]">
                    <div className="login-form relative max-w-[500px] m-auto bg-light-clr rounded-[10px] md:py-14 max-md:py-8 md:px-10 max-md:px-5">
                        {disabled && <Loader />}
                        <div className="flex justify-center mb-8">
                            <StaticImage
                                src="../images/logo-desk.webp"
                                alt="logo"
                                className="w-[200px]"
                            />
                        </div>
                        <p className={`text-[14px] text-left text-[#e6bf8c] font-normal mb-[10px] ${error.message ? 'block' : 'hidden '}`}>{error.message}</p>
                        <div>
                            <div className="relative mb-6">
                                <TextInput 
                                    type="email"
                                    id="uname"
                                    value={formInput.email}
                                    onChange={e =>  {
                                        setFormInput(prevState => ({ ...prevState, email: e.target.value }));
                                        setError(prevState => ({ ...prevState, message: '' }));
                                    }}
                                    placeholder="Email Address*"
                                    className="text-white bg-[transparent] border border-[#888888] rounded-[10px] w-full md:p-4 max-md:p-3 focus:outline-none"
                                />
                            </div>
                            <div className="relative mb-6">
                                <TextInput 
                                    type={showPass ? 'text' : 'password'}
                                    id="password"
                                    value={formInput.password}
                                    onChange={e => {
                                        setFormInput(prevState => ({ ...prevState, password: e.target.value }));
                                        setError(prevState => ({ ...prevState, message: '' })); 
                                    }}
                                    placeholder="Password*"
                                />
                                <div className="pwd-eye-icon absolute top-[50%] right-[15px] translate-x-[0px] translate-y-[-50%] cursor-pointer cursor-pointer h-[20px]">
                                    <button type="button" onClick={() => setShowPass(!showPass)}>
                                        {showPass ? (
                                            <FaEye size={20} className="text-[#fff]" />
                                        ) : (
                                            <FaEyeSlash size={20} className="text-[#fff]" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            {/* <div className="relative mb-6">
                                <div className="flex justify-between max-md:flex-col gap-3">
                                    <div className="form-check flex gap-1">
                                        <input
                                            type="checkbox"
                                            id="checkme"
                                            className="form-check-input w-[15px]"
                                            aria-labelledby="checkme-label"
                                        />
                                        <label id="checkme-label" className="form-check-label text-[#fff]" htmlFor="checkme">
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="flex gap-1">
                                        <button className="text-[#fff]">Forgot your password?</button>
                                    </div>
                                </div>
                            </div> */}
                            <div className="login-btn md:mb-14 max-md:mb-10">
                                <button
                                    aria-label="Send Message"
                                    className="mt-4 w-full flex text-white bg-primary-clr text-center justify-center items-center font-medium rounded-full lg:px-10 lg:py-4 max-lg:px-6 max-lg:py-3 hover:bg-[#fff] hover:text-[#000] duration-[400ms,700ms]"
                                    onClick={validationHandler}
                                >
                                    Log In
                                </button>
                            </div>
                            <div className="text-center">
                                <p className="text-white">
                                    Don't Have An Account? <Link to="/register" className="underline text-[#D4AF37]">Sign Up</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const pages = [
    {
        title: "Login",
        handle: ""
    }
]

export default Login;