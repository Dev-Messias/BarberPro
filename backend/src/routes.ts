import {Router, Request, Response} from 'express';

//importando controller
import { CreateUserController } from './controller/user/CreateUserController';
import { AuthUserController } from './controller/user/AuthUserController';
import { DetailUserController } from './controller/user/DetailUserController';
import { UpdateUserController } from './controller/user/UpdeteUserController';

import { CreateHaircutController } from './controller/haircut/CreateHaircutController';
import { ListHaircutController } from './controller/haircut/ListHaircutController';

import { isAuyhenticated } from './middlewares/isAuthenticated';

const router = Router();

/*router.get('/teste', (req: Request, res: Response)=>{
    return res.json({ok: true})
})*/

//=== ROTAS USER ==
router.post('/users', new CreateUserController().handle);
router.post('/login', new AuthUserController().handle);
router.get('/me', isAuyhenticated, new DetailUserController().handle )
router.put('/users', isAuyhenticated, new UpdateUserController().handle)

//=== ROTAS HAIRCUTS ==
router.post('/haircut', isAuyhenticated, new CreateHaircutController().handle)
router.get('/haircuts', isAuyhenticated, new ListHaircutController().handle)

export  { router };