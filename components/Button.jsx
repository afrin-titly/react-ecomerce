import React from 'react'
import { useStateContext } from '../context/StateContext'

function Button({bgColor, textColor="text-white", text, passedValue={} }) {
  console.log(passedValue)
  const { onAdd } = useStateContext()
  const { product, qty } = passedValue
  return (
    <button type='button' className={`rounded-lg ${bgColor}  p-3 ${textColor} text-sm font-bold hover:scale-110`} onClick={() => onAdd(product, qty)}> {text}</button>
  )
}

export default Button