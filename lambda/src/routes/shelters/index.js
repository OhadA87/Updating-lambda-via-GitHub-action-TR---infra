import express from 'express';
import { checkValidation } from '../../middlewares/index.js';
import * as controllers from '../../controllers/shelters/index.js';
import {
  newShelterValidator,
  updateShelterValidator,
} from '../../validators/index.js';

const router = express.Router();

router.get('/', controllers.getAllShelters);
router.post(
  '/',
  ...checkValidation(newShelterValidator),
  controllers.createShelter,
);
router.get('/:shelterId/AllBranches', controllers.getAllBranchesByShelterId);
router.get('/:shelterId', controllers.getShelter);

router.put(
  '/:shelterId',
  ...checkValidation(updateShelterValidator),
  controllers.updateShelter,
);

export default router;
