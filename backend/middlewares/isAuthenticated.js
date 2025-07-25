import jwt from "jsonwebtoken";

const isAuthenticated = async(req, res, next)=> {
    try {
        const token = req.cookies.token;
        // console.log("token in isAuthenticated: ", token)
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }

           // ✅ Verify token and attach user info to request
           const decode = jwt.verify(token, process.env.SECRET_KEY)
           if(!decode){
            res.status(401).json({
                message:"Invalid token",
                success:false
            })
           };

           req.id = decode.userId;
           
           req.user = decode;
           next();

    } catch (error) {
        console.log(error);
    }
}

export default isAuthenticated;