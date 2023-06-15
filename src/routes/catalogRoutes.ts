import express from 'express';
import * as catalogController from '../controllers/catalogController';
import {authorize} from '../middlewares/authorizationMiddleware';
import {IdentityType} from '../enums/identityType';

const router = express.Router();

// Restorer
// CATALOGS
router.post('/', authorize([IdentityType.TECHNICAL, IdentityType.SALES, IdentityType.RESTORER]), catalogController.createCatalog);
router.put('/:id', authorize([IdentityType.TECHNICAL, IdentityType.SALES, IdentityType.RESTORER]), catalogController.updateCatalog);

// ARTICLES
router.post('/:catalogId/articles', authorize([IdentityType.TECHNICAL, IdentityType.SALES, IdentityType.RESTORER]), catalogController.createArticle);
router.put('/:catalogId/articles/:id', authorize([IdentityType.TECHNICAL, IdentityType.SALES, IdentityType.RESTORER]), catalogController.updateArticle);
router.delete('/:catalogId/articles/:id', authorize([IdentityType.TECHNICAL, IdentityType.SALES, IdentityType.RESTORER]), catalogController.deleteArticle);

// MENUS
router.post('/:catalogId/menus', authorize([IdentityType.TECHNICAL, IdentityType.SALES, IdentityType.RESTORER]), catalogController.createMenu);
router.put('/:catalogId/menus/:id', authorize([IdentityType.TECHNICAL, IdentityType.SALES, IdentityType.RESTORER]), catalogController.updateMenu);
router.delete('/:catalogId/menus/:id', authorize([IdentityType.TECHNICAL, IdentityType.SALES, IdentityType.RESTORER]), catalogController.deleteMenu);

// User
// CATALOGS
router.get('/', authorize([IdentityType.TECHNICAL, IdentityType.SALES, IdentityType.USER]), catalogController.getCatalogs);

// Restorer & User
// CATALOGS
router.get('/:id', authorize([IdentityType.TECHNICAL, IdentityType.SALES, IdentityType.RESTORER, IdentityType.USER]), catalogController.getCatalogById);


export default router;
