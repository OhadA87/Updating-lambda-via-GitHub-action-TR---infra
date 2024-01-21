import express from 'express';
import * as controllers from '../../controllers/root/index.js';

const router = express.Router();

router.get('/', controllers.root);
router.get('/citiesOfIsrael', controllers.getCitiesOfIsrael);

export default router;
