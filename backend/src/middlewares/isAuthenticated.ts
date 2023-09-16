import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload{
    sub: string;
}

export function isAuyhenticated(
    request: Request,
    response: Response,
    next: NextFunction
){

    const authToken = request.headers.authorization;

    //se não receber o token não deixar passar a rota
    if(!authToken){
        return response.status(401).end();
    }

    //desconstruindo o token
    const [, token] = authToken.split(" ")

    //validando token
    try {
       const { sub } = verify(
        token,
        process.env.JWT_SECRET
       ) as Payload;

       
       request.user_id = sub;

       //para seguir na rota
       return next();

       
    } catch (err) {
        return response.status(401).end();
    }

}