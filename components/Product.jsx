import React from 'react'
import { client } from '../lib/client'
import Link from 'next/link'
import { urlFor } from '../lib/client'

const Product = ({product: {image, name, slug, price}}) => {
  const product = {image, name, slug, price}
  return (
    <div className='mx-auto space-x-2'>
      <Link href={`/product/${slug.current}`}>
        <div className=''>
          <img className='w-40 rounded-xl hover:scale-110 ease-in delay-150 bg-slate-200' src={urlFor(image && image[0])} />
          <p className='mt-4'>{name}</p>
          <p className='font-bold mb-4'>${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product