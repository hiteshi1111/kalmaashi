import React from 'react';
import { FaMinus } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";

const QuantityButton = ({ quantity=1, setQuantity=()=>{}, totalAvailable }) => {
    const increaseQuantity = () => {
        if (quantity < totalAvailable){
            setQuantity(prevState => prevState + 1);
        }
    }
    const decreaseQuantity = () => {
        setQuantity(prevState => (prevState <= 1 ? 1 : prevState - 1));
    }
    return (
        <div className='qty-prd-info flex max-w-[160px] '>
            <button 
                aria-label='Decrease' 
                className='flex justify-center items-center text-white bg-light-clr md:min-w-[40px] md:h-[40px] max-md:min-w-[30px] max-md:h-[30px]'
                onClick={decreaseQuantity}
            ><FaMinus size="20" /></button>
            <input 
                type="text"
                value={quantity} 
                className="placeholder-black font-medium font-size-18 text-[#000] bg-[#fff] md:min-w-[40px] md:h-[40px] max-md:w-[60px] max-md:h-[30px] text-center p-1 focus:outline-none" 
            />
            <button 
                aria-label='Increase' 
                className='flex justify-center items-center text-white bg-light-clr md:min-w-[40px] md:h-[40px] max-md:min-w-[30px] max-md:h-[30px]'
                onClick={increaseQuantity}
            ><FiPlus size="20" /></button>
        </div>
    )
}

export default QuantityButton;