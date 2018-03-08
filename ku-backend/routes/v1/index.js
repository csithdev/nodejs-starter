import { Router } from 'express';
import product from './products';

const router = Router();
router.use('/product', product);

export default router;
