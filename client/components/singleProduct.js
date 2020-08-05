import React, {useState, useEffect} from 'react'
//import getAllProducts from '../store'
import {useDispatch} from 'react-redux'

function singleProduct() {
  const [product, setProduct] = useState({})
  const dispatch = useDispatch()

  /*   const loadAllProducts = () => {
    dispatch(getAllProducts())
  }

  useEffect(() => {
    loadAllProducts();
  }, []) */

  return <div />
}

export default singleProduct
