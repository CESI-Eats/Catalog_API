import express from 'express';
import * as myModelController from '../controllers/myModelController';
import { authorize } from '../middlewares/authorizationMiddleware';
import { IdentityType } from '../enums/identityType';

const router = express.Router();

// Restorer
// CATALOGS
router.post('/catalogs', myModelController.createCatalog);
router.put('/catalogs/:id', myModelController.updateCatalog);

// ARTICLES
router.post('/:catalogId/articles', myModelController.createArticle);
router.put('/:catalogId/articles/:id', myModelController.updateArticle);
router.delete('/:catalogId/articles/:id', myModelController.deleteArticle);

// MENUS
router.post('/:catalogId/menus', myModelController.createMenu);
router.put('/:catalogId/menus/:id', myModelController.updateMenu);
router.delete('/:catalogId/menus/:id', myModelController.deleteMenu);

// User
// CATALOGS
router.get('/catalogs', myModelController.getCatalogs);

// Restorer & User
// CATALOGS
router.get('/catalogs/:id', myModelController.getCatalogById);





//router.get('/', myModelController.getCatalogArticles);
//router.get('/:id', myModelController.getCatalogArticle);
//router.post('/', myModelController.createCatalogArticle);
//router.put('/:id', myModelController.updateCatalogArticle);
//router.delete('/:id', myModelController.deleteCatalogArticle);

//router.get('/', authorize([IdentityType.USER]), myModelController.getCatalogArticles);
//router.get('/:id', myModelController.getCatalogArticle);
//router.post('/', authorize([IdentityType.RESTORER]), myModelController.createCatalogArticle);
//router.put('/:id', authorize([IdentityType.RESTORER]), myModelController.updateCatalogArticle);
//router.delete('/:id', authorize([IdentityType.RESTORER]), myModelController.deleteCatalogArticle);

export default router;
