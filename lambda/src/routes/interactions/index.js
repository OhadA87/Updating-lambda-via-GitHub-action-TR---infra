import express from 'express';
import { checkValidation } from '../../middlewares/index.js';
import * as controllers from '../../controllers/interactions/index.js';
import { createInteractionValidator } from '../../validators/index.js';

const router = express.Router();

router.post(
  '/',
  ...checkValidation(createInteractionValidator),
  controllers.createInteraction,
);

router.delete('/:interactionId', controllers.removeInteraction);

router.put(
  '/:interactionId/switchLikeToDislike',
  controllers.switchLikeToDislike,
);

export default router;
