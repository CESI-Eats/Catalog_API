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
router.put('/articles/:id', myModelController.updateCatalogArticle);
router.delete('/articles/:id', myModelController.deleteCatalogArticle);

// MENUS
//router.post('/menus', myModelController.createCatalogArticle);
router.put('/menus/:id', myModelController.updateCatalogArticle);
router.delete('/menus/:id', myModelController.deleteCatalogArticle);

// User
// CATALOGS
router.get('/catalogs', myModelController.getCatalogArticles);

// Restorer & User
// CATALOGS
router.get('/catalogs/:id', myModelController.getCatalogArticle);





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
