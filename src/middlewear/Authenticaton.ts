import * as jwt from 'jsonwebtoken'
require('dotenv').load();

export const verify = async (req: any, res: any, next: any) => {
    
    const authHeader = req.get('Authorization')

    if(!authHeader) {
        req.authenticated = false;
        return next();
    }

    const token = authHeader.split(' ')[1]

    if(!token || token === '') {
        req.authenticated = false;
        return next();
    }

    let decodedToken : any;

    try {
        decodedToken = jwt.verify(token, process.env.AUTH_KEY);
    }
    catch (err) {
        req.authenticated = false;
        return next();
    }

    if(!decodedToken) {
        req.authenticated = false;
        return next();
    }

    req.authenticated = true;
    req.userId = decodedToken.userId
    return next()

}
