import express from 'express';
import * as controllers from '../../controllers/users/index.js';

const router = express.Router();

router.get('/:userId/likes', controllers.getAllLikesByUserId);
router.get('/:userId/newAnimals', controllers.getNewAnimalsByUserId);

export default router;
