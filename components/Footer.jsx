import React from 'react'
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='mt-8'>
      <p className='text-center font-bold'>
        2022 JSM Headphone All rights reserved.
      </p>
      <div className='flex justify-center mt-1'>
        <AiFillInstagram className='react-icon' />
        <AiOutlineTwitter className='react-icon' />
      </div>
    </div>
  )
}

export default Footer