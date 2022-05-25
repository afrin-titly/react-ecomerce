import React from 'react'
import { Product, HeroBanner, FooterBanner} from "../components"
import { client } from '../lib/client'

const Home = ({ products, bannerData}) => {
  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>

      <div className='flex flex-col '>
        <h2 className='text-3xl font-bold text-center text-blue-900 font-sans mt-5'>
          Best selling product
        </h2>
        <p className='text-center text-gray-400 font-serif mt-1'>Bags of many varistions</p>
        <div className='mt-6 flex flex-wrap w-4/6 mx-auto'>
        { products?.map(product=> <Product key={product._id} product={product}/>)}
        </div>

      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: {
      products,
      bannerData,
    }
  }
}

export default Home