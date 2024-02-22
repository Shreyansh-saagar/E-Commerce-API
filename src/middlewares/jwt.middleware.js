import jwt from "jsonwebtoken"

const jwtAuth = (req,res,next)=>{

    // read token
    const token = req.headers['authorization'];

    // if no token return error
    if(!token){
        return res.status(401).send('Unauthorized access')
    }

    // check valid or not
    try{
       const payload =  jwt.verify(token,"4mSvG1u36fdf4Z2uexZE8x8TblMF2k4A")
       console.log(payload);
    }catch(e){
        // else error
        return res.status(401).send('Unauthorized access')
    }

    // call next 
    next();
}


export default jwtAuth