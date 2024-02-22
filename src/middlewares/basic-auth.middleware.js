import um from "../features/user/models/user.modal.js";

const basicAuth = (req,res,next)=>{

    // check if auth header is empty
    const authHeader = req.headers["authorization"];
    if(!authHeader){
        return res.status(401).send('No Authorization Detail Available');
    }
    console.log(authHeader);

    // if available extract and verify [base sdfghjksdfghjklertyui56789fghjkertyui]
    const base64_credentials = authHeader.replace('Basic ','');
    console.log(base64_credentials);
    
    //decode credentials
    const decodedCred = Buffer.from(base64_credentials,'base64').toString('utf8');
    console.log(decodedCred); // [username:password]
    
    const creds = decodedCred.split(':');

    const user = um.getAll().find((u)=> u.email == creds[0] && u.password == creds[1])
    if(user){
        next();
    }else{
        res.status(401).send('Incorrect username or password')
    }

}

export default basicAuth