// import React from 'react'
// import {useEffect} from 'react'
// import { NavLink } from 'react-router-dom'
// import { assets } from '../assets/assets'
// import { useAppContext } from '../context/AppContext';
// import toast from 'react-hot-toast';
// const Navbar = () => {
//     const [open, setOpen] = React.useState();
//     const {user,setUser,setShowUserLogin,navigate,setSearchQuery,searchQuery,getCartCount,axios} = useAppContext();

//     const logout = async()=>{
//         try {
//             const {data} = await axios.get('/api/user/logout');
//             if(data.success){
//                 toast.success(data.message);
//                 setUser(null);
//                 navigate('/login');
//             }else{
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
       
//     }

//     useEffect(()=>{
//         if(searchQuery.length > 0){
//             navigate("/products")
//         }
//     },[searchQuery]) //
//   return (
//     <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

//             <NavLink to="/" onClick={()=> setOpen(false)}>
//                 <img className="h-9" src={assets.logo} alt="logo" />
//             </NavLink>

//             {/* Desktop Menu */}
//             <div className="hidden sm:flex items-center gap-8">
//                 <NavLink to="/">Home</NavLink>
//                 <NavLink to="/products">All Product</NavLink>
//                 <NavLink to="/">Contact</NavLink>

//                 <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
//                     <input onChange={(e)=> setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
//                     <img src={assets.search_icon} alt="search" className='w-5 h-4'>
//                     </img>
//                 </div>

//                 <div onClick={()=> navigate('/cart')} className="relative cursor-pointer">
//                     <img src={assets.nav_cart_icon} alt="cart" className='w-6 opacity-80'>
//                     </img>
//                     <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
//                 </div>

//                 {!user? (<button onClick={()=> setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
//                     Login
//                 </button>)
//                 :
//                 (
//                 <div className='relative group'>
//                     <img src={assets.profile_icon} className ='w-10' alt=" "/>
//                     <ul className='hidden group-hover:block absolute top-10 right-0  bg-white shadow border border-gray-200 rounded-md text-sm z-40 py-2.5'>
//                         <li onClick={()=> navigate('/my-orders')} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My Orders</li>
//                         <li onClick={logout} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
//                     </ul>
//                 </div>
//                 )}
//             </div>

//             <div className='flex items-center gap-6 sm:hidden'>
//             <div onClick={()=> navigate('/cart')} className="relative cursor-pointer">
//                     <img src={assets.nav_cart_icon} alt="cart" className='w-6 opacity-80'>
//                     </img>
//                     <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
//                 </div>
//             <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
//                 {/* Menu Icon SVG */}
//                 <img src={assets.menu_icon} alt="menu">
//                 </img>
//             </button>
//             </div>

            

//             {
//             /* Mobile Menu */
//             open && (
//             <div className={`${open ? 'flex' : 'hidden'} z-1 absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
//                 <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
//                 <NavLink to="/products" onClick={() => setOpen(false)}>All Product</NavLink>
//                 {user &&
//                 <NavLink to="/products" onClick={() => setOpen(false)}>My Orders</NavLink>
//                 }
//                 <NavLink to="/" onClick={() => setOpen(false)}>Contact</NavLink>
//                 {!user? (
//                    <button onClick={()=>{
//                     setOpen(false);
//                     setShowUserLogin(true);
//                    }}
//                    className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
//                    Login
//                </button>
//                 ):(
//                     <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
//                     Logout
//                 </button> 
//                 )}
                
//             </div>
// )}

//         </nav>
//   )
// }

// export default Navbar

import React from 'react'
import {useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [open, setOpen] = React.useState();
    const {user,setUser,setShowUserLogin,navigate,setSearchQuery,searchQuery,getCartCount,axios} = useAppContext();

    const logout = async()=>{
        try {
            const {data} = await axios.get('/api/user/logout');
            if(data.success){
                toast.success(data.message);
                setUser(null);
                navigate('/login');
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
       
    }

    useEffect(()=>{
        if(searchQuery.length > 0){
            navigate("/products")
        }
    },[searchQuery])

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all duration-300 shadow-sm hover:shadow-md">

            <NavLink to="/" onClick={()=> setOpen(false)} className="transform transition-transform duration-200 hover:scale-105">
                <img className="h-9 transition-all duration-200" src={assets.logo} alt="logo" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink 
                    to="/" 
                    className="relative text-gray-700 hover:text-primary-dull transition-colors duration-200 font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                    Home
                </NavLink>
                <NavLink 
                    to="/products" 
                    className="relative text-gray-700 hover:text-primary-dull transition-colors duration-200 font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                    All Products
                </NavLink>
                <NavLink 
                    to="/" 
                    className="relative text-gray-700 hover:text-primary-dull transition-colors duration-200 font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                    Contact
                </NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full transition-all duration-200 hover:border-primary-dull hover:shadow-md focus-within:border-primary focus-within:shadow-lg">
                    <input 
                        onChange={(e)=> setSearchQuery(e.target.value)} 
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500 transition-all duration-200" 
                        type="text" 
                        placeholder="Search delicious food..." 
                    />
                    <img 
                        src={assets.search_icon} 
                        alt="search" 
                        className='w-5 h-4 transition-transform duration-200 hover:scale-110 cursor-pointer'
                    />
                </div>

                <div 
                    onClick={()=> navigate('/cart')} 
                    className="relative cursor-pointer group transform transition-transform duration-200 hover:scale-110"
                >
                    <img 
                        src={assets.nav_cart_icon} 
                        alt="cart" 
                        className='w-6 opacity-80 transition-all duration-200 group-hover:opacity-100'
                    />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full transition-all duration-200 animate-pulse group-hover:animate-bounce">
                        {getCartCount()}
                    </button>
                </div>

                {!user? (
                    <button 
                        onClick={()=> setShowUserLogin(true)} 
                        className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all duration-200 text-white rounded-full transform hover:scale-105 hover:shadow-lg active:scale-95"
                    >
                        Login
                    </button>
                )
                :
                (
                <div className='relative group'>
                    <img 
                        src={assets.profile_icon} 
                        className ='w-10 transition-transform duration-200 group-hover:scale-110 cursor-pointer' 
                        alt="profile"
                    />
                    <ul className='hidden group-hover:block absolute top-12 right-0 bg-white shadow-lg border border-gray-200 rounded-lg text-sm z-40 py-2.5 min-w-[120px] animate-fadeIn'>
                        <li 
                            onClick={()=> navigate('/my-orders')} 
                            className='p-1.5 pl-3 hover:bg-orange-50 cursor-pointer transition-colors duration-150 flex items-center gap-2'
                        >
                            <span className="text-primary">📦</span> My Orders
                        </li>
                        <li 
                            onClick={logout} 
                            className='p-1.5 pl-3 hover:bg-primary cursor-pointer transition-colors duration-150 flex items-center gap-2'
                        >
                            <span className="text-primary-dull">🚪</span> Logout
                        </li>
                    </ul>
                </div>
                )}
            </div>

            <div className='flex items-center gap-6 sm:hidden'>
                <div 
                    onClick={()=> navigate('/cart')} 
                    className="relative cursor-pointer group transform transition-transform duration-200 hover:scale-110"
                >
                    <img 
                        src={assets.nav_cart_icon} 
                        alt="cart" 
                        className='w-6 opacity-80 transition-all duration-200 group-hover:opacity-100'
                    />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full transition-all duration-200 animate-pulse group-hover:animate-bounce">
                        {getCartCount()}
                    </button>
                </div>
                <button 
                    onClick={() => open ? setOpen(false) : setOpen(true)} 
                    aria-label="Menu" 
                    className="sm:hidden transform transition-transform duration-200 hover:scale-110 active:scale-95"
                >
                    <img 
                        src={assets.menu_icon} 
                        alt="menu"
                        className={`transition-transform duration-300 ${open ? 'rotate-90' : 'rotate-0'}`}
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className={`${open ? 'animate-slideDown' : 'animate-slideUp'} absolute top-[60px] left-0 w-full bg-white shadow-lg py-4 flex flex-col items-start gap-2 px-5 text-sm md:hidden border-t border-gray-100`}>
                    <NavLink 
                        to="/" 
                        onClick={() => setOpen(false)}
                        className="w-full py-2 px-3 rounded-lg hover:bg-orange-50 transition-colors duration-200 flex items-center gap-2"
                    >
                        <span className="text-primary">🏠</span> Home
                    </NavLink>
                    <NavLink 
                        to="/products" 
                        onClick={() => setOpen(false)}
                        className="w-full py-2 px-3 rounded-lg hover:bg-orange-50 transition-colors duration-200 flex items-center gap-2"
                    >
                        <span className="text-primary">🍽️</span> All Products
                    </NavLink>
                    {user &&
                        <NavLink 
                            to="/my-orders" 
                            onClick={() => setOpen(false)}
                            className="w-full py-2 px-3 rounded-lg hover:bg-primary transition-colors duration-200 flex items-center gap-2"
                        >
                            <span className="text-primary">📦</span> My Orders
                        </NavLink>
                    }
                    <NavLink 
                        to="/" 
                        onClick={() => setOpen(false)}
                        className="w-full py-2 px-3 rounded-lg hover:bg-primary transition-colors duration-200 flex items-center gap-2"
                    >
                        <span className="text-primary">📞</span> Contact
                    </NavLink>
                    {!user? (
                        <button 
                            onClick={()=>{
                                setOpen(false);
                                setShowUserLogin(true);
                            }}
                            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition-all duration-200 text-white rounded-full text-sm transform hover:scale-105 active:scale-95"
                        >
                            Login
                        </button>
                    ):(
                        <button 
                            onClick={logout} 
                            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition-all duration-200 text-white rounded-full text-sm transform hover:scale-105 active:scale-95"
                        >
                            Logout
                        </button> 
                    )}
                </div>
            )}

        </nav>
  )
}

export default Navbar
