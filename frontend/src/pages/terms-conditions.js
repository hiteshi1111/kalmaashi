import React from 'react'
import Seo from '../components/shared/seo';
import { Link } from 'gatsby';
import InnerPageBanner from '../components/shared/InnerBanner';

const TermsConditions = () => {
    return (
        <>
            <Seo title='Terms & Conditions'/>
            <InnerPageBanner title='Terms & Conditions' maxWidth='472px' pages={pages} />
            <section className="s-py-sec">
                <div className="container !max-w-[1000px] m-auto px-[15px]">
                    <div className='privacy-policy-info mb-5'>
                        <p className='text-[#fff] mb-3'>Welcome to the Kalmaashi Arts Painting. These Terms & Conditions outline the rules and regulations for the use of the Kalmaashi website and related services.</p>
                        <p className='text-[#fff] mb-3'>By accessing this website and using our services, you agree to comply with and be bound by the following terms and conditions. If you disagree with any part of these terms, please do not use our website.</p>
                        <h3 className='text-[#fff] mt-10 mb-3'>Intellectual Property</h3>
                        <p className='text-[#fff] mb-3'>All content provided on the Kalmaashi website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of Kalmaashi or its content suppliers and protected by international copyright laws.</p>
                        <h3 className='text-[#fff] mt-10 mb-3'>User Submissions</h3>
                        <p className='text-[#fff] mb-3'>By submitting content (including but not limited to paintings, drawings, and any other artistic creations) to Kalmaashi, you grant us a non-exclusive, royalty-free, worldwide, perpetual license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content in any form, media, or technology.</p>
                        <h3 className='text-[#fff] mt-10 mb-3'>Code of Conduct</h3>
                        <p className='text-[#fff] mb-3'>Users agree to abide by a code of conduct that promotes respectful and constructive interactions within the Kalmaashi community. Any violation of this code may result in the suspension or termination of your account.</p>
                        <h3 className='text-[#fff] mt-10 mb-3'>Privacy Policy</h3>
                        <p className='text-[#fff] mb-3'>Our Privacy Policy outlines how we collect, use, and protect your personal information. By using Kalmaashi, you agree to the terms outlined in our Privacy Policy.</p>
                        <h3 className='text-[#fff] mt-10 mb-3'>Payments and Fees</h3>
                        <p className='text-[#fff] mb-3'>Any fees associated with the purchase of artwork or other services on Kalmaashi are outlined in our Pricing Policy. By making a purchase, you agree to the terms and conditions specified in the Pricing Policy.</p>
                        <h3 className='text-[#fff] mt-10 mb-3'>Termination of Services</h3>
                        <p className='text-[#fff] mb-3'>Kalmaashi reserves the right to terminate or suspend any user account at our discretion, without prior notice, for any reason, including but not limited to a violation of these terms.</p>
                        <h3 className='text-[#fff] mt-10 mb-3'>Limitation of Liability</h3>
                        <p className='text-[#fff] mb-3'>Kalmaashi is not liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of our website or services.</p>    
                        <h3 className='text-[#fff] mt-10 mb-3'>Changes to Terms & Conditions</h3>
                        <p className='text-[#fff] mb-3'>Kalmaashi reserves the right to modify or replace these terms at any time. It is your responsibility to check these terms periodically for changes. Your continued use of the website following the posting of any changes constitutes acceptance of those changes.</p>
                        <p className='text-[#fff] mb-3'>If you have any questions or concerns regarding these Terms & Conditions, please contact us at <Link to="mailto:info@kalmaashi.com" target="_blank" className='text-[#D4AF37]'>info@kalmaashi.com</Link></p>
                        <p className='text-[#fff] mb-3'>Thank you for being a part of the Kalmaashi Arts Painting</p>
                    </div>
                </div>
            </section>
        </>
    )
}

const pages = [
    {
        title: "Terms & Conditions",
        handle: ""
    }
]

export default TermsConditions;