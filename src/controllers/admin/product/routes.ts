import { Router } from 'express';
import {
  list,add
} from './controller';

const router = Router();

export const product: any = () =>
  router.use([
    list(),
    add()
  ]);