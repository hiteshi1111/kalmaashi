import React from 'react'
import statesData from "../../data/indianStates.json";

const StateInput = ({value="", disabled=false, setShippingAddress=()=>{}}) => {
    return (
        <div className='relative'>
            <span className='!absolute top-[-10px] left-[10px] text-white bg-[#160100] px-[10px] text-[12px]'>State</span>
            <select
                value={value}
                disabled={disabled}
                onChange={(e) => setShippingAddress(prevState => ({ ...prevState, province: e.target.value }))}
                className='text-white bg-[#160100] border border-[#888888] rounded-[5px] h-[45px] !w-full px-[8px] focus:outline-none cursor-pointer'
            >
                {statesData.map((item, i) => (
                    <option 
                        key={i}
                        value={item.state}
                    >{item.state}</option>
                ))}
            </select>
        </div>
    )
}

export default StateInput;