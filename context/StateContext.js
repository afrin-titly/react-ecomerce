import React from "react"
import { useContext, useState, useEffect, createContext} from "react"
import { toast } from "react-hot-toast"

const Context = React.createContext()

export const StateContext = ({children}) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setcartItems] = useState([])
  const [totalPrice, settotalPrice] = useState(0)
  const [totalQuantities, settotalQuantities] = useState(0)
  const [qty, setqty] = useState(1)

  let foundProduct
  let index

  const incQty = ()=> {
    setqty((prevQty)=> prevQty + 1)
  }
  const decQty = ()=> {
    setqty((prevQty)=> {
      if(prevQty - 1 < 1) return 1
      return prevQty - 1
    })
  }
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item)=> item._id === product._id)
    settotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
      settotalQuantities((prevTotalQuantities)=> prevTotalQuantities + quantity)
    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((item)=>{
        if(item.id === product._id) return {
          ...item,
          quantity: item.quantity + quantity
        }
      })
      setcartItems(updatedCartItems)
    } else {
      product.quantity = quantity
      setcartItems([...cartItems, {...product}])
    }

    toast.success(`${qty} ${product.name} added to cart.`)
  }

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item)=> item._id === id)
    index = cartItems.findIndex((product)=>product._id === id)

    if(value === 'inc') {
      let newCartItem = cartItems.map((item, i)=> (
        i === index ? {...foundProduct, quantity: foundProduct.quantity + 1} : item
      ))
      setcartItems(newCartItem)
      settotalPrice(prevTotalPrice=> prevTotalPrice + foundProduct.price)
      settotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if (value === 'dec') {
      if(foundProduct.quantity > 1) {
        let newCartItem = cartItems.map((item, i)=> (
          i === index ? {...foundProduct, quantity: foundProduct.quantity - 1} : item
        ))
        setcartItems(newCartItem)
        settotalPrice(prevTotalPrice=> prevTotalPrice + foundProduct.price)
        settotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    } else if (value == 'remove') {
      foundProduct = cartItems.find((item) => item._id === id);
      const newCartItems = cartItems.filter((item) => item._id !== id);
      settotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
      settotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
      setqty(1)
      setcartItems(newCartItems);
    }

  }

  return (
    <Context.Provider
    value={{
      showCart,
      cartItems,
      totalPrice,
      totalQuantities,
      qty,
      incQty,
      decQty,
      onAdd,
      setShowCart,
      toggleCartItemQuantity,
      setcartItems,
      settotalPrice,
      settotalQuantities
    }}
    >
      { children }
    </Context.Provider>
  )
}
export const useStateContext = () => useContext(Context)