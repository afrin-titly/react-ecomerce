import React from 'react'
import { client, urlFor } from '../../lib/client'
import {AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar} from 'react-icons/ai'
import Button from '../../components/Button'
import { Product } from '../../components'
import { useStateContext } from '../../context/StateContext'

const ProductDetails  = ({product, products}) => {

  const { image, name, details, price } = product
  const [index, setIndex] = React.useState(0)
  const { incQty, decQty, qty, onAdd, setShowCart } = useStateContext()
  const handleBuyNow = () => {
    onAdd(product, qty)
    setShowCart(true)
  }
  return (
    <div className=''>
      {/* <div className='h-min'> */}
        <div className='flex flex-wrap justify-center space-x-5'>
          <div className='w-2/5 h-4/5'>
            <img className='md:h-96 rounded-xl bg-slate-300' src={urlFor(image && image[index])} />
          </div>

          <div className='float-left'>
            <h1 className='text-3xl font-bold text-sky-900'>{name}</h1>
            <div className='flex'>
              <div>
                <AiFillStar className='star-icon' />
                <AiFillStar className='star-icon'/>
                <AiFillStar className='star-icon'/>
                <AiFillStar className='star-icon'/>
                <AiOutlineStar className='star-icon'/>
              </div>
              <p>(20)</p>
            </div>
            <h4 className='text-lg font-semibold'>Details</h4>
            <p className='text-gray-500'>{details}</p>
            <p className='text-gray-500'>${price}</p>
            <div className='flex justify-start' >
              <h3 className='text-lg font-semibold'>Quantity: </h3>
              <p className='flex w-1/2 border border-gray-400 space-x-4 mx-auto'>
                <span className='minus-icon' onClick={decQty}><AiOutlineMinus size={20} /> </span>
                <span> {qty} </span>
                <span className='plus-icon' onClick={incQty}><AiOutlinePlus size={20} /> </span>
              </p>
            </div>
            <div className='mt-2 md:space-x-2 space-y-2'>
              <Button bgColor="bg-sky-700" textColor='text-white' passedValue={{product, qty}} text="Add to Cart" />
              <button type="button" className="rounded-lg bg-red-500  p-3 text-white text-sm font-bold hover:scale-110" onClick={handleBuyNow}>Buy Now</button>
            </div>
          </div>
        </div>
        <div className='flex m-14 ml-36 space-x-4'>
          {image?.map((item, i)=>(
            <img className='h-24 hover:bg-slate-400 rounded-xl' key={i} src={urlFor(item)} onMouseOver={() => setIndex(i)}/>
          ))}
        </div>
      {/* </div> */}
      <div className='w-5/6 mx-auto'>
        <h2 className='mb-2 text-2xl font-bold text-sky-900 text-center'>You may also like</h2>
          <div className='flex animate-marquee hover:pause w-5/6'>
            {products.map(item=>(
              <Product key={item._id} product={item} />
            ))}
          </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async ()=> {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;
  const products = await client.fetch(query)
  const paths = products.map((product)=>({
    params: {
      slug: product.slug.current
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({params: { slug }}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`
  const productsQuery = '*[_type == "product"]'
  const product = await client.fetch(query)
  const products = await client.fetch(productsQuery)

  return {
    props: {
      products,
      product,
    }
  }
}

export default ProductDetails