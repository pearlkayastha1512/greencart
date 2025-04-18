import React, { useState,useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
    const {products,searchQuery} = useAppContext()
    const [filteredProducts,setFilteredProducts] = useState([]);
    //filtered products is a local state that holds any relevant )filtered) products to display
    useEffect(()=>{
        if(searchQuery.length > 0){
            setFilteredProducts(products.filter(
                product => product.name.toLowerCase().includes(searchQuery.toLowerCase())//filters the product by filtering the name
            ))}else{
                setFilteredProducts(products);
            }
    },[products,searchQuery])
    //runs every time the products or searchquery changes
    

  return (
    <div className='mt-16 flex flex-col'>
        <div className='flex flex-col items-end w-max'>
            <p className='text-2xl font-medium uppercase'>All Products</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>

        <div className='grid grid-cols-3 sm:grid-col-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
    {filteredProducts.filter((product)=>product.inStock).map((product,index)=>(
        <ProductCard key={index} product={product}/>
    ))}
        </div>

    </div>
  )
}

export default AllProducts