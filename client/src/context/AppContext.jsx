//used for global state management
import { createContext, useContext, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";


axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();
export const AppContextProvider = ({children}) =>{
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products,setProducts] = useState([]);//empty array
    const [cartItems,setCartItems] = useState({});//empty object
    const [searchQuery,setSearchQuery] = useState({});//empty object


    //fetch seller status
    const fetchSeller = async()=>{
        try{
            const {data} = await axios.get('/api/seller/is-auth');
            if(data.success){
                setIsSeller(true)
            }else{
                setIsSeller(false)
            }
        }catch(error){
            setIsSeller(false)

        }
    }
    //fetch user auth status,user data and cart items
    const fetchUser = async()=>{
        try {
            const {data} = await axios.get('/api/user/is-auth');
            if(data.success){
                setUser(data.user)
                setCartItems(data.user.cartItems)
            }
        } catch (error) {
            setUser(null)
        }
    }


    //fetch all products
    const fetchProducts = async ()=>{
        try {
            const {data} = await axios.get('/api/product/list')
            if(data.success){
                setProducts(data.products)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            
        }
    }
    // add product to cart
    const addToCart = (itemId)=>{
        let cartData = structuredClone(cartItems);//makes a deep copy of the cartitems(pass by value)

        if(cartData[itemId]){
            cartData[itemId] += 1;
        } else{
            cartData[itemId] =1;
        }
        setCartItems(cartData);
        toast.success("Added to Cart")
    }
    //update cart item quantity
    const updateCartItem = (itemId,quantity)=>{
        let cartData = structuredClone(cartItems);
        setCartItems(cartData)
        toast.success("Cart Updated");
    }

    //Remove product from card
    const removeFromCart = (itemId)=>{
        //deep copy
        let cartData = structuredClone(cartItems);
        //check if the item is already in the cart
        if(cartData[itemId]){
            //reduce the quantity by 1
            cartData[itemId] -= 1;
          // 4. If quantity is now 0, remove the item from the cart entirely
            if(cartData[itemId]=== 0){
                delete cartData[itemId];
            }
        }
        toast.success("Removed from cart")
        //update the state with new cart data
        setCartItems(cartData)
    }

    //get card item count
    const getCartCount = ()=>{
        let totalCount = 0;
        for(const item in cartItems){
            totalCount += cartItems[item];
        }
        return totalCount;
    }

    //get card total amount
    const getCartAmount = ()=>{
        let totalAmount = 0;
        for (const items in cartItems){
            let itemInfo = products.find((product)=> product._id == items);
            if(cartItems[items] > 0){
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }


    useEffect(()=>{
        fetchUser()
        fetchSeller()
        fetchProducts()
       
    },[])//[]-> dependency array -> tells react to run code only once when the component loads
    //won't run again unless the values in this array changes
    //because you only want to fetch data once when the app starts not every time the component re-renders.
    //update database cart items
    useEffect(()=>{
        const updateCart = async()=>{
            try {
                const {data} = await axios.post('/api/cart/update',{cartItems})
                if(!data.success){
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
        if(user){
            updateCart()
        }
    },[cartItems])
    
//     // 🔥 Axios interceptor for handling 401 globally
//     useEffect(() => {
//     const interceptor = axios.interceptors.response.use(
//         response => response,
//         error => {
//             if (error.response?.status === 401) {
//                 toast.error("Session expired, please login again.");
//                 setUser(null);
//                 navigate('/login');
//             }
//             return Promise.reject(error);
//         }
//     );

//     return () => axios.interceptors.response.eject(interceptor);
// }, []);

    const value = {navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin,products,currency,addToCart,updateCartItem,removeFromCart,cartItems,setCartItems,searchQuery,setSearchQuery
        ,getCartAmount,getCartCount,axios,fetchProducts
    }
    return <AppContext.Provider value={value}>
        {children}
           </AppContext.Provider>
}
export const useAppContext = () =>{
    return useContext(AppContext)
}

// What Triggers a Re-render?
// State changes (useState)

// Props change (data passed from parent to child)

// Context values change (useContext)

// Force update (very rare — via useReducer or forceUpdate)
//“Oh! Something changed. Let me re-run this component and update the screen.”
