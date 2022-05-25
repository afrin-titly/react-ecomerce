import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'
import Button from './Button'

const FooterBanner = ({footerBanner:{discount, largeText1, largeText2, saleTime,
                       smallText, midText, desc, product, buttonText, image}}) => {
  return (
    <>
    <div className='grid grid-cols-2 h-96 bg-red-600 mt-24 text-white rounded-xl w-3/4 mx-auto'>
      <div className='p-16 '>
        <p className='mb-4'>{discount}</p>
        <p className='font-bold text-2xl md:text-5xl'>{largeText1}</p>
        <p className='font-bold text-2xl md:text-5xl'>{largeText2}</p>
        <p className='mt-4'>{saleTime}</p>
      </div>
      <div className='p-16 justify-self-end'>
        <p className='mb-4'>{smallText}</p>
        <p className='font-bold text-xl md:text-4xl'>{midText}</p>
        <p className='mt-4 mb-2'>{desc}</p>
        <Link href={`/product/${product}`}>
          <Button bgColor={"bg-white"} textColor={"text-red-600"} text={buttonText}/>
        </Link>
      </div>
      <div className='absolute justify-self-center'>
        <img className='justify-self-start md:-mt-28 h-80 md:h-full' src={urlFor(image)} />
      </div>
    </div>

    </>
  )
}

export default FooterBanner