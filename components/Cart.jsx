import React from 'react'
import Link from 'next/link'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping} from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { useStateContext } from '../context/StateContext'
import {urlFor} from '../lib/client'
import getStripe from '../lib/getStripe'
import toast from 'react-hot-toast'

const Cart = () => {
  const cartRef = React.useRef()
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    showCart,
    toggleCartItemQuantity
  } = useStateContext()

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if(response.statusCode === 500) return;

    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }
  return (
    <div ref={cartRef} className={`${showCart ? 'backdrop' : ''}`}>
      <div className='absolute overflow-auto right-0 h-screen w-full md:w-1/3 bg-white'>
        <div className='flex flex-col p-5'>
          <button type='button' onClick={()=>setShowCart(false)}>
            <AiOutlineLeft size={20} className='-pt-5'/>
            <span className='text-bold'> Your Cart </span>
            <span className='text-red-400'> ({totalQuantities} items)</span>
          </button>
        </div>
        {cartItems.length < 1 && (
          <div className='flex flex-col'>
            <AiOutlineShopping size={150} className='mx-auto' />
            <h3 className='text-center font-semibold'>Your shopping bag is empty!</h3>
            <Link href='/'>
              <button type='button' className='mt-7 p-2 mx-auto rounded-xl w-1/2 bg-red-500' onClick={()=>setShowCart(false)}>
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        {/* <div> */}
          {cartItems.length >= 1 && cartItems.map((item)=>(
            <div className='flex w-full m-3' key={item._id}>
              <img className='w-36 bg-slate-300 rounded-lg' src={urlFor(item?.image[0])} />
              <h5 className='text-xl w-2/5 font-bold text-center text-sky-900'>{item.name}</h5>
              <div className='absolute self-center left-[40%]'>
                <p className='flex border border-gray-400 space-x-4'>
                  <span className='minus-icon' onClick={()=>toggleCartItemQuantity(item._id, 'dec')}><AiOutlineMinus size={20} /> </span>
                  <span> {item.quantity} </span>
                  <span className='plus-icon' onClick={()=>toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus size={20} /> </span>
                </p>
              </div>
              <button className='absolute left-[90%] mt-14' type='button' onClick={()=>toggleCartItemQuantity(item._id, 'remove')}>
                <TiDeleteOutline color={'red'} size={20} />
              </button>
              <h4 className='absolute left-[90%] mr-2 font-bold'>${item.price * totalQuantities}</h4>
            </div>
          ))}
          {
            cartItems.length > 0 && (
              <>
                <div className='flex top-3/4 m-3'>
                  <h3 className='w-1/2 font-bold'>Subtotal: </h3>
                  <h3 className='w-1/2 text-right font-bold'>${totalPrice}</h3>
                </div>
                <div className='flex justify-center'>
                  <button type='button' className='mt-7 p-2 rounded-xl w-1/2 bg-red-500' onClick={handleCheckout}>
                    Pay with Stripe
                  </button>
                </div>
              </>
            )


          }

        {/* </div> */}
      </div>

    </div>
  )
}

export default Cart