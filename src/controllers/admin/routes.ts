import { Router } from 'express';
import {product} from './product/routes'
import { user } from './user/routes';
const router = Router();
router.use('/product', product());
router.use('/user', user());
export default router;