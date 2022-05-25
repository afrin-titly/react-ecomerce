import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import Cart from '../components/Cart'
import { useStateContext } from '../context/StateContext'
const Navbar = () => {
  const { showCart, setShowCart, totalQuantities} = useStateContext()
  return (
    <div className='h-24 mb-10'>
      <p>
        <Link href="/">JS Mastery Store</Link>
      </p>

      <button type='button' className='flex float-right shrink-0 h-auto focus:outline-none transform lg:flex xl:mx-3.5 mx-2.5 hover:scale-110' onClick={()=>setShowCart(true)}>
        <div className='relative items-center'>
          <AiOutlineShopping size={30}/>
          <span className="min-w-[20px] bg-red-500 min-h-[20px] rounded-full items-center justify-center bg-brand text-brand-light absolute -top-2.5 ltr:left-3.5 rtl:right-2.5 text-10px">
            {totalQuantities}
          </span>
        </div>
      </button>
      { showCart && <Cart /> }
      </div>
  )
}

export default Navbar

