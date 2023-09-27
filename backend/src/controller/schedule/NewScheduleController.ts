import { Request, Response } from 'express';
import { NewScheduleService } from '../../service/schedule/NewScheduleService';

class NewScheduleController{
    async handle(request: Request, response: Response){
        //pegando informacoes do corpo
        const {haircut_id, customer} = request.body;
        const user_id = request.user_id;

        const newSchedule = new NewScheduleService();

        const schedule = await newSchedule.execute({
            user_id,
            haircut_id,
            customer,
        })

        return response.json(schedule);
    }
}

export { NewScheduleController }