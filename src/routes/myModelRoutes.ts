import express from 'express';
import * as myModelController from '../controllers/myModelController';
import { authorize } from '../middlewares/authorizationMiddleware';
import { IdentityType } from '../enums/identityType';

const router = express.Router();

router.get('/', authorize([IdentityType.USER]), myModelController.getAllMyModels);
router.get('/:id', myModelController.getMyModel);
router.post('/', authorize([IdentityType.RESTORER]), myModelController.createMyModel);
router.put('/:id', authorize([IdentityType.RESTORER]), myModelController.updateMyModel);
router.delete('/:id', authorize([IdentityType.RESTORER]), myModelController.deleteMyModel);

export default router;
