
import fs from 'fs';
import winston from 'winston'

const fsPromise = fs.promises;

// async function log(logdata){
//     try {
//         logdata = `\n ${new Date().toString()} + " -> Log DATA -> " + ${logdata}`
//         await fsPromise.appendFile('log.txt',logdata)
//     } catch (error) {
//         console.log(error);
//     }
// }

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    defaultMeta:{service:'request-logging'},
    transports:[
        new winston.transports.File({filename:'log2.txt'})
    ]
})


const loggerMiddleware = async(req,res,next)=>{

    const logdata = `${req.url} + ${JSON.stringify(req.body)}` 
    // await log(logdata)

    logger.info(logdata)
    next();
}

export default loggerMiddleware