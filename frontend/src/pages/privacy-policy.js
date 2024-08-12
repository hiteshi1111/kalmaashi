import React from 'react'
import Seo from '../components/shared/seo';
import InnerPageBanner from '../components/shared/InnerBanner';
import { Link } from 'gatsby';

const PrivacyPolicy = () => {
    return (
        <>
        <Seo title='PrivacyPolicy'/>
        <InnerPageBanner title='Privacy Policy' maxWidth='472px' pages={pages} />
        <section className="s-py-sec">
            <div className="container !max-w-[1000px] m-auto px-[15px]">
                <div className='privacy-policy-info mb-5'>
                    <p className='text-[#fff] mb-3'>Thank you for using the Kalmaashi Arts Painting Website. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information. By using our website, you agree to the terms and practices described in this policy.</p>
                    <h3 className='text-[#fff] mt-5 mb-3'>Information We Collect</h3>
                    <p className='text-[#fff] mb-3'><b className='font-semibold'>Personal Information:</b> When you register for an account, make a purchase, or participate in our community, we may collect personal information such as your name, email address, billing information, and shipping address.</p> 
                    <p className='text-[#fff]'><b className='font-semibold'>Usage Data:</b> We collect information about how you interact with our website, including the pages you visit, the time and date of your visit, and the duration of your stay.</p>
                    <h3 className='text-[#fff] mt-10 mb-3'>How We Use Your Information</h3>
                    <p className='text-[#fff] mb-3'><b className='font-semibold'>Service Delivery:</b> We use your information to provide, improve, responding to inquiries, and delivering customer support.</p> 
                    <p className='text-[#fff]'><b className='font-semibold'>Communication:</b> We may use your contact information to shoot important updates, newsletters, and promotional accoutrements. You can conclude- out of promotional dispatches at any time.</p>
                    <h3 className='text-[#fff] mt-10 mb-3'>Information Sharing</h3>
                    <p className='text-[#fff] mb-3'><b className='font-semibold'>Service Providers:</b> We may partake your information with trusted third- party service providers to help us in delivering our services, subject to confidentiality agreements.</p> 
                    <p className='text-[#fff]'><b className='font-semibold'>Legal Compliance:</b> We may disclose your information in accordance with applicable laws, regulations or legal process.</p>
                    <h3 className='text-[#fff] mt-10 mb-3'>Security</h3>
                    <p className='text-[#fff] mb-3'>We employ reasonable security measures to cover your information from unauthorized access, exposure, revision, and destruction.</p>
                    <h3 className='text-[#fff] mt-10 mb-3'>Cookies</h3>
                    <p className='text-[#fff] mb-3'>We use cookies to enhance your browsing experience. You can manage cookie preferences through your cybersurfer settings.</p>
                    <h3 className='text-[#fff] mt-10 mb-3'>Your Choices</h3>
                    <p className='text-[#fff] mb-3'>You have the right to review, update, or cancel your particular information. Please communicate us <Link to="mailto:info@kalmaashi.com" target="_blank" className='text-[#D4AF37]'>info@kalmaashi.com</Link> for backing.</p>
                    <h3 className='text-[#fff] mt-10 mb-3'>Changes to this Privacy Policy</h3>
                    <p className='text-[#fff] mb-3'>We may modernize this Privacy Policy periodically. Any changes will be posted on this runner with the streamlined date.</p>
                    <h3 className='text-[#fff] mt-10 mb-3'>Contact Us</h3>
                    <p className='text-[#fff] mb-3'>If you have questions or concerns about this Privacy Policy, please contact us at <Link to="mailto:info@kalmaashi.com" target="_blank" className='text-[#D4AF37]'>info@kalmaashi.com</Link></p>
                </div>
            </div>
        </section>
        </>
    )
}

const pages = [
    {
        title: "Privacy Policy",
        handle: ""
    }
]

export default PrivacyPolicy;