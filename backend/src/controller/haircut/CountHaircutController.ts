import { Request, Response } from 'express';
import { CountHaircutService } from '../../service/haircut/CountHaircutService';

class CountHaircutController{
    async handle(request: Request, response: Response){
        const user_id = request.user_id;

        const countHaircut = new CountHaircutService();

        const count = await countHaircut.execute({
            user_id
        })

        return response.json(count);
    }
}

export { CountHaircutController }