import React from 'react'
import Link from 'next/link'
import Button from './Button'
import { urlFor } from '../lib/client'

const HeroBanner = ({ heroBanner }) => {
  console.log(heroBanner);
  return (
    <div className='h-80 bg-slate-400 mx-auto rounded-xl w-3/4'>
      <div>
        <div className="relative w-full h-80 overflow-hidden">
          <img className='absolute object-contain w-full h-full object-center' src={urlFor(heroBanner.image)} alt='women-bag'/>
          <div className='absolute p-5 space-y-2 ml-4'>
            <p className='text-lg mt-8'>{heroBanner.smallText}</p>
            <h3 className='text-[24px] md:text-5xl font-bold'>{heroBanner.midText}</h3>
            <h1 className='text-[36px] md:text-7xl font-bold text-white'>{heroBanner.largeText1}</h1>

            <Link href={`/product/${heroBanner.product}`}>
              <button type='button' className='ml-4 rounded-lg bg-blue-900 p-3 text-white text-xs font-bold'> {heroBanner.buttonText}</button>

              {/* <Button bgColor={"bg-blue-900"} text={heroBanner.buttonText} passedValue={{product: heroBanner, qty: 0}}/> */}
            </Link>
          </div>
          <div className='absolute right-16 bottom-2'>
            <h5 className='font-bold'>Description</h5>
            <p className='text-gray-700'>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner