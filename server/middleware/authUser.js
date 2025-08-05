import jwt from 'jsonwebtoken';



//next-execute the controller function
//get the cookies from request ,whenever we will request any api endpoint we will get cookie and that cookie contains token
const authUser = async (req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return res.json({success:false,message:'Not Authorized'});
    }
    try{
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)
        if (tokenDecode.id) {
            req.user = {_id:tokenDecode.id}; // ✅ store in req.user instead of req.body
            next();
        } else {
            return res.status(401).json({ success: false, message: 'Invalid Token' });
        }
        next();
    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message});
    }

}
export default authUser;