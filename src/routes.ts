import { Router } from 'express';
import routes from './controllers/admin/routes';
const router = Router();
router.use('/admin',routes)
export default router;