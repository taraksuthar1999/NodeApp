import { Router } from 'express';
import {
  list,form,add
} from './controller';

const router = Router();

export const product: any = () =>
  router.use([
    list(),
    form(),
    add()
  ]);