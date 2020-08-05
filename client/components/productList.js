import React, {useState, useEffect} from 'react'
import getAllProducts from '../store'
import {useDispatch} from 'react-redux'

function productList() {
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()

  const loadAllProducts = () => {
    dispatch(getAllProducts())
  }

  useEffect(() => {
    loadAllProducts()
  }, [])

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <img src={product.imgUrl} />
          <h1>{product.name}</h1>
          <p>
            {product.price} {product.category}
          </p>
        </div>
      ))}
    </div>
  )
}

export default productList
