import React from "react";

const Money = ({max={}, min={}, className=""}) => {
    return(
        <p className={`text-white font-medium font-size-18 ${className}`}>
            {max?.amount !== min?.amount && (
                <span className='prd-strike text-[#9B9B9B] line-through pe-[5px]'>{min.currencyCode} {min.amount}</span>
            )}
            <span className='reqular-price'>{max.currencyCode} {max.amount}</span>
        </p>
    )
}

export default Money;