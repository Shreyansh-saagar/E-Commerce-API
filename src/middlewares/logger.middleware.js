
import fs from 'fs';

const fsPromise = fs.promises;

async function log(logdata){
    try {
        logdata = `\n ${new Date().toString()} + " -> Log DATA -> " + ${logdata}`
        await fsPromise.appendFile('log.txt',logdata)
    } catch (error) {
        console.log(error);
    }
}

const loggerMiddleware = async(req,res,next)=>{

    const logdata = `${req.url} + ${JSON.stringify(req.body)}` 
    await log(logdata)
    next();
}

export default loggerMiddleware