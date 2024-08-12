import React from 'react'
import Seo from "../components/shared/seo";
import InnerPageBanner from "../components/shared/InnerBanner";
import { StaticImage } from 'gatsby-plugin-image';
import SocialMedia from '../components/shared/socialMedia';

const OurArtists = () => {
  return (
    <>
      <Seo title="Our Artists" description="" />
      <InnerPageBanner title='Our Artists' maxWidth='472px' pages={pages} />
      <section className="s-py-sec">
            <div className="container m-auto px-[15px]">
                <div className='grid lg:grid-cols-2 gap-6'>
                    <div>
                        <div className='bg-[#1f1b1a] shadow rounded md:p-10 max-md:p-5'>
                            <div className='flex items-center gap-5 md:mb-7 max-md:mb-4'>
                                <StaticImage src="https://cdn.tailgrids.com/1.0/assets/images/team/team-01/image-01.jpg" alt="Coriss Ambady" className="md:w-[100px] md:min-w-[100px] md:h-[100px] max-md:w-[70px] max-md:min-w-[70px] max-md:h-[70px] rounded-full"/>
                                <div>
                                    <h4 className="text-[#fff] mb-1">Coriss Ambady</h4>
                                    <span className="text-[#fff] block mb-1">Department of Arts </span>
                                </div>
                            </div>
                            <p className="text-[#fff]">The attention to detail and skillful technique by Rajesh has brought the image to life on paper. It beautifully preserves the essence of the original photo while adding an artistic touch. A remarkable display of talent and a captivating reinterpretation of the subject. Well done!</p>
                            <div className='flex flex-wrap items-center justify-between gap-6 md:mt-5 max-md:mt-4'>
                                <div className="flex flex-wrap gap-2">
                                    <SocialMedia />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='bg-[#1f1b1a] shadow rounded md:p-10 max-md:p-5'>
                            <div className='flex items-center gap-5 md:mb-7 max-md:mb-4'>
                                <StaticImage src="https://cdn.tailgrids.com/1.0/assets/images/team/team-01/image-02.jpg" alt="Glorius Cristian" className="md:w-[100px] md:min-w-[100px] md:h-[100px] max-md:w-[70px] max-md:min-w-[70px] max-md:h-[70px] rounded-full"/>
                                <div>
                                    <h4 className="text-[#fff] mb-1">Glorius Cristian</h4>
                                    <span className="text-[#fff] block mb-1">Art Critic</span>
                                </div>
                            </div>
                            <p className="text-[#fff]">The attention to detail and skillful technique by Rajesh has brought the image to life on paper. It beautifully preserves the essence of the original photo while adding an artistic touch. A remarkable display of talent and a captivating reinterpretation of the subject. Well done!</p>
                            <div className='flex flex-wrap items-center justify-between gap-6 md:mt-5 max-md:mt-4'>
                                <div className="flex flex-wrap gap-2">
                                    <SocialMedia />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='bg-[#1f1b1a] shadow rounded md:p-10 max-md:p-5'>
                            <div className='flex items-center gap-5 md:mb-7 max-md:mb-4'>
                                <StaticImage src="https://cdn.tailgrids.com/1.0/assets/images/team/team-01/image-03.jpg" alt="Jackie Sanders" className="md:w-[100px] md:min-w-[100px] md:h-[100px] max-md:w-[70px] max-md:min-w-[70px] max-md:h-[70px] rounded-full"/>
                                <div>
                                    <h4 className="text-[#fff] mb-1">Jackie Sanders</h4>
                                    <span className="text-[#fff] block mb-1">Art Critic</span>
                                </div>
                            </div>
                            <p className="text-[#fff]">The attention to detail and skillful technique by Rajesh has brought the image to life on paper. It beautifully preserves the essence of the original photo while adding an artistic touch. A remarkable display of talent and a captivating reinterpretation of the subject. Well done!</p>
                            <div className='flex flex-wrap items-center justify-between gap-6 md:mt-5 max-md:mt-4'>
                                <div className="flex flex-wrap gap-2">
                                    <SocialMedia />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='bg-[#1f1b1a] shadow rounded md:p-10 max-md:p-5'>
                            <div className='flex items-center gap-5 md:mb-7 max-md:mb-4'>
                                <StaticImage src="https://cdn.tailgrids.com/1.0/assets/images/team/team-01/image-04.jpg" alt="Nikolas Brooten" className="md:w-[100px] md:min-w-[100px] md:h-[100px] max-md:w-[70px] max-md:min-w-[70px] max-md:h-[70px] rounded-full"/>
                                <div>
                                    <h4 className="text-[#fff] mb-1">Nikolas Brooten</h4>
                                    <span className="text-[#fff] block mb-1">Art Critic</span>
                                </div>
                            </div>
                            <p className="text-[#fff]">The attention to detail and skillful technique by Rajesh has brought the image to life on paper. It beautifully preserves the essence of the original photo while adding an artistic touch. A remarkable display of talent and a captivating reinterpretation of the subject. Well done!</p>
                            <div className='flex flex-wrap items-center justify-between gap-6 md:mt-5 max-md:mt-4'>
                                <div className="flex flex-wrap gap-2">
                                    <SocialMedia />
                                </div>
                            </div>
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
        title: "Our Artists",
        handle: ""
    }
]

export default OurArtists
