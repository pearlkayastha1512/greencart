import React from 'react' //required to write jsx
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
    const {products} = useAppContext();//destructuring product from that context
    //products is an array of all available products in our app
  return (
    <div className='mt-16'>
        <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6
        lg:grid-cols-5 mt-6'>
            {products.filter((product)=>product.inStock).slice(0,5).map((product,index)=>(
                <ProductCard key={product._id} product={product}/>
            ))}
        
        </div>
    </div>
  )
}

export default BestSeller
//filters out only products that are in stock
//takes only the first 5 instock products
//loops through the filtered + sliced products
//renders a product card component by passing product as a prop and index as key
