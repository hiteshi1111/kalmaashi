import { Link } from "gatsby";
import React from "react";

const BreadCrumb = ({pages=[], white=false}) => {
    return(
        <div aria-label="breadcrumb" className={`pt-[30px] w-full flex justify-center text-[14px]`}>
            <Link
                to="/" 
                className={`text-[13px] font-semibold hover:underline ${white ? "!text-[#fff]" : "!text-[#000]"}`}
            >
                Home
            </Link>
            {pages.length > 0 && pages.map((item, i) => (
                <div key={i} >
                <span className={`text-[13px] mx-[5px] ${white ? "!text-[#fff]" : "!text-[#000]"}`}> / </span>
                <Link
                    to={item.handle}
                    className={`text-[13px] font-semibold ${item.handle ? "hover:underline pointer-events-auto" : "pointer-events-none"} ${white ? "!text-[#fff]" : "!text-[#000]"}`}
                >
                    {item.title.length > 50 ? `${item.title.slice(0, 30)}...` : item.title}
                </Link>
                </div>
            ))}
        </div>
    )
}

export default BreadCrumb;