import {Router, Request, Response} from 'express';

//importando controller
import { CreateUserController } from './controller/user/CreateUserController';
import { AuthUserController } from './controller/user/AuthUserController';
import { DetailUserController } from './controller/user/DetailUserController';
import { UpdateUserController } from './controller/user/UpdeteUserController';

import { CreateHaircutController } from './controller/haircut/CreateHaircutController';
import { ListHaircutController } from './controller/haircut/ListHaircutController';
import { UpdateHaircutController } from './controller/haircut/UpdateHaircutController';
import { CheckSubscriptionController } from './controller/haircut/CheckSubscriptionController';
import { CountHaircutController } from './controller/haircut/CountHaircutController';
import { DetailHaircutController } from './controller/haircut/DetailHaircutController';

import { NewScheduleController } from './controller/schedule/NewScheduleController';

import { isAuyhenticated } from './middlewares/isAuthenticated';
import { ListScheduleController } from './controller/schedule/ListScheduleController';
import { FinishScheduleController } from './controller/schedule/FinishScheduleController';

import { SubscribeController } from'./controller/subscription/SubscribeController';
import { WebHooksController } from './controller/subscription/WebHooksController';

const router = Router();

/*router.get('/teste', (req: Request, res: Response)=>{
    return res.json({ok: true})
})*/

//=== ROTAS USER ==
router.post('/users', new CreateUserController().handle);
router.post('/login', new AuthUserController().handle);
router.get('/me', isAuyhenticated, new DetailUserController().handle );
router.put('/users', isAuyhenticated, new UpdateUserController().handle);

//=== ROTAS HAIRCUTS ==
router.post('/haircut', isAuyhenticated, new CreateHaircutController().handle);
router.get('/haircuts', isAuyhenticated, new ListHaircutController().handle);
router.put('/haircut', isAuyhenticated, new UpdateHaircutController().handle);
router.get('/haircut/check', isAuyhenticated, new CheckSubscriptionController().handle);
router.get('/haircut/count', isAuyhenticated, new CountHaircutController().handle);
router.get('/haircut/detail', isAuyhenticated, new DetailHaircutController().handle);

//=== ROTAS SCHEDULE / Serviços ==
router.post('/schedule', isAuyhenticated, new NewScheduleController().handle);
router.get('/schedule', isAuyhenticated, new ListScheduleController().handle);
router.delete('/schedule', isAuyhenticated, new FinishScheduleController().handle);

//=== ROTAS PAGAMENTOS ==
router.post('/subscribe', isAuyhenticated, new SubscribeController().handle);
router.post('/webhooks', new WebHooksController().handle);

export  { router };