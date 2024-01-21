import express from 'express';
import { checkValidation } from '../../middlewares/index.js';
import * as controllers from '../../controllers/branches/index.js';
import {
  createBranchValidator,
  updateBranchValidator,
} from '../../validators/index.js';

const router = express.Router();

router.get('/', controllers.getAllBranches);
router.post(
  '/',
  ...checkValidation(createBranchValidator),
  controllers.createBranch,
);
router.put(
  '/:branchId',
  ...checkValidation(updateBranchValidator),
  controllers.updateBranch,
);
router.get('/:branchId/animals', controllers.getBranchAnimals);
router.patch('/:branchId/toggleActiveStatus', controllers.toggleActiveStatus);

export default router;
