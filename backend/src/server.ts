import express, {Request, Response, NextFunction} from "express";
import 'express-async-errors';
import cors from 'cors'

import { router } from './routes';

const app = express();

app.use(express.json());

//qual ip pode fazer a requisição
app.use(cors());

app.use(router);

//sempre ira passar aqui para tratar erros
app.use((err: Error, req: Request, res: Response, next: NextFunction ) => {
    //erro que do sistema
    if(err instanceof Error ){
        return res.status(400).json({
            error: err.message
        })
    }

    //erro de servidor
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
})

app.listen(3333, ()=> console.log("server online :)"));