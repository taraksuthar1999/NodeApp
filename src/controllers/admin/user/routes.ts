import { Router } from 'express';
import {
  loginForm,
  registerForm
} from './controller';

const router = Router();

export const user: any = () =>
  router.use([
    loginForm(),
    registerForm()
  ]);