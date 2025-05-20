import { HttpStatusError } from "common-errors";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

import config from "../config.js";

export function checkToken(req, res, next){
    const {authorization} = req.headers;

    if(!authorization) throw HttpStatusError(401, 'No token provided');

    const [_bearer, token] = authorization.split(' ');

    try{
        jwt.verify(token, config.app.secretKey); // <-- Aquí se verifica el token
    }catch(err){
        logger.error(err.message);
        throw HttpStatusError(401, 'Invalid token');
    }

    next();
}