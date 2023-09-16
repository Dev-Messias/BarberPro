import { Request, Response } from 'express';
import { ListHaircutService } from '../../service/haircut/ListHaircutService';

class ListHaircutController{
    async handle(request: Request, response: Response){

        //criando variavel para pegar id do usuario logado
        const user_id = request.user_id;
        //pegando o status
        const status = request.query.status as string;

        const listHaircuts = new ListHaircutService;

        const haircuts = await listHaircuts.execute({
            user_id,
            status
        })

        return response.json(haircuts);
    }
}

export { ListHaircutController }