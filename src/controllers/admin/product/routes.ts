import { Router } from 'express';
import {
  list,
} from './controller';

const router = Router();

export const product: any = () =>
  router.use([
    list()
  ]);