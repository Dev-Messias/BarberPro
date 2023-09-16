import {Request, Response} from 'express';
import { UpdateUserService } from '../../service/user/UpdateUserService';

class UpdateUserController{
    async handle(request: Request, response: Response){

        //pegando name e endereco vindos do corpo
        const {name, endereco} = request.body;

        //buscando id do usuario logado
        const user_id = request.user_id;

        //iniciando o servico
        const updateUser = new UpdateUserService();

        const user = await updateUser.execute({
            user_id,
            name,
            endereco
        })

        return response.json(user);
    }
}

export { UpdateUserController }