import React from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'
import { useStateContext } from '../context/StateContext'
import { runFireworks } from '../lib/utils'

const Success = () => {
  const { setcartItems, settotalPrice, settotalQuantities} = useStateContext()
  React.useEffect(()=>{
    localStorage.clear()
    setcartItems([])
    settotalPrice(0)
    settotalQuantities(0)
    runFireworks()
  }, [])
  return (
    <div className='flex flex-col items-center'>
      <BsBagCheckFill size={100} color={'green'} />
      <h2 className='mt-2 text-2xl'> Thank you for your order!</h2>
      <p> Check your email for the receipt.</p>
      <p>If you have any questions. Please email -
        <a className='text-red-500' href='mailto:order@example.com'>order@example.com</a>
      </p>
      <Link href='/'>
        <button type='button' className='mt-7 p-2 mx-auto rounded-xl w-1/6 bg-red-500'>
          Continue Shopping
        </button>
      </Link>
    </div>
  )
}

export default Success