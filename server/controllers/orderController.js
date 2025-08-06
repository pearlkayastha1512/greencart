import Order from "../models/Order.js";
import Product from "../models/Product.js";
import stripe from "stripe";
import User from "../models/User.js"

//Place Order COD : /api/order/cod
export const placeOrderCOD = async(req,res)=>{
    try {
        const userId = req.user;
        const {items , address} = req.body;
        if(!address || items.length === 0){
            return res.json({success:false,message:"Invalid data"})
        }
        //Calculate Amount Using Items
        let amount = await items.reduce(async(acc,items)=>{
            const product = await Product.findById(items.product);
            return (await acc) + product.offerPrice * items.quantity;
        },0)

        //Add Tax Charge (2%)
        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        });

        return res.json({success:true, message:"Order Placed Successfully"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}

//Place Order COD : /api/order/stripe
export const placeOrderStripe = async(req,res)=>{
    try {
        const userId = req.user;
        const {items , address} = req.body;
        const {origin} = req.headers;
        if(!address || items.length === 0){
            return res.json({success:false,message:"Invalid data"})
        }
        let productData = [];
        //Calculate Amount Using Items
        let amount = await items.reduce(async(acc,items)=>{
            const product = await Product.findById(items.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: items.quantity,
            })
            return (await acc) + product.offerPrice * items.quantity;
        },0)

        //Add Tax Charge (2%)
        amount += Math.floor(amount * 0.02);

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online",
        });
        //Stripe Gateway Initialize
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        //create line items for stripe
        const line_items = productData.map((item)=>{
            return {
                price_data:{
                    currency: "usd",
                    product_data:{
                        name: item.name,
                    },
                    unit_amount: Math.floor(item.price + item.price * 0.02) * 100
                },
                quantity: item.quantity,
            }
        })

        //create session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId : order._id.toString(),
                userId,
            }
        })


        return res.json({success:true, url: session.url});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}

//Stripe webhooks to verify payments action: /stripe
export const stripeWebhooks = async(req,res)=>{
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        res.status(400).send(`Webhook Error: ${error.message}`)
    }
    //Handle the event
    switch (event.type) {
        case "payment_intent.succeeded":{
            const paymentIntent = event.data.object;
            const payment_intentId = paymentIntent.id;

            //Getting session Metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: payment_intentId,
            });
            const {orderId,userId} = session.data[0].metadata;

            //Mark Payment as Paid
            await Order.findByIdAndUpdate(orderId,{isPaid:true})
            //Clear user cart
            await User.findByIdAndUpdate(userId,{cartItems:{}});
            break;
        }
            case "payment_intent.succeeded":{
            const paymentIntent = event.data.object;
            const payment_intentId = paymentIntent.id;

            //Getting session Metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: payment_intentId,
            });
            const {orderId} = session.data[0].metadata;
            await Order.findByIdAndDelete(orderId);
            break;
            }
    
        default:
            console.error(`Unhandle event type ${event.type}`)
            break;
            
    }
    response.json({received:true});
}

//Get Orders by User ID : /api/order/user

export const getUserOrders = async(req,res)=>{
    try {
        const userId = req.user;
        const orders = await Order.find({
            userId,
            $or: [{paymentType: "COD"},{isPaid:true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({success:true,orders});
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

//Get All Orders(for Seller/admin): /api/order/seller

export const getAllOrders = async(req,res)=>{
    try {
        const orders = await Order.find({
            $or: [{paymentType: "COD"},{isPaid:true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({success:true,orders});
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}