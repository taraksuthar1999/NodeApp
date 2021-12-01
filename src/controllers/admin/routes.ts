import { Router } from 'express';
import {product} from './product/routes'
const router = Router();
router.use('/product', product());
export default router;