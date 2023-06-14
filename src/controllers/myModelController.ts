import { Request, Response } from 'express';
import Catalog from '../models/myModel';
import mongoose from 'mongoose';

// Restorer
// Catalogs
// Create Catalog
export const createCatalog = async (req: Request, res: Response) => {
  const { restorerId, description, image, menus, articles } = req.body;

  const catalog = new Catalog({
      _id: new mongoose.Types.ObjectId(),
      restorerId: restorerId,
      description: description,
      image: image,
      menus: menus, 
      articles: articles
  });

  try {
      const result = await catalog.save();
      res.status(201).json({
          message: "Catalog successfully created",
          result: result
      });
  } catch (error) {
      res.status(500).json({
          error: error
      });
  }
};

// Update Catalog
export const updateCatalog = async (req: Request, res: Response) => {
  const { restorerId, description, image, menus:[], articles:[] } = req.body;

  try {
      const updatedCatalog = await Catalog.findByIdAndUpdate(req.params.id, {
          restorerId: restorerId,
          description: description,
          image: image,
          menus: [], 
          articles: []
      }, { new: true }); // The option { new: true } ensures that the function returns the updated version of the document

      if (!updatedCatalog) {
          return res.status(404).json({
              message: "No Catalog found with this ID"
          });
      }

      res.status(200).json({
          message: "Catalog successfully updated",
          catalog: updatedCatalog
      });
  } catch (error) {
      res.status(500).json({
          error: error
      });
  }
};

// Articles
// Create Article
export const createArticle = async (req: Request, res: Response) => {
  const { name, description, image, price } = req.body;

  try {
      const catalog = await Catalog.findById(req.params.catalogId);

      if (!catalog) {
          return res.status(404).json({
              message: "No Catalog found with this ID"
          });
      }

      const article = {
          _id: new mongoose.Types.ObjectId(),
          name: name,
          description: description,
          image: image,
          price: price
      };

      catalog.articles.push(article);
      const result = await catalog.save();

      res.status(201).json({
          message: "Article successfully created",
          result: result
      });
  } catch (error) {
      res.status(500).json({
          error: error
      });
  }
};





// Update Catalog
export const updateCatalogArticle = async (req: Request, res: Response) => {
  try {
      const catalog = await Catalog.findById(req.params.catalogId);
      if (catalog == null) {
          return res.status(404).json({ message: 'Cannot find catalog' });
      }

      const article = catalog.articles.findIndex(article => article._id.toString() === req.params.articleId);
      if (article === -1) {
          return res.status(404).json({ message: 'Cannot find article' });
      }
      
      if (req.body.name != null) {
        catalog.articles[article].name = req.body.name;
      }
      if (req.body.description != null) {
          catalog.articles[article].description = req.body.description;
      }
      if (req.body.image != null) {
          catalog.articles[article].image = req.body.image;
      }
      if (req.body.price != null) {
          catalog.articles[article].price = req.body.price;
      }
      
      const updatedCatalog = await catalog.save();
      res.json(updatedCatalog);
  } catch (err) {
    const errMessage = err instanceof Error ? err.message : 'An error occurred';
    res.status(500).json({ message: errMessage });  
  }
};











// Get all
export const getCatalogArticles = async (req: Request, res: Response) => {
  try {
      const catalog = await Catalog.findById(req.params.id);
      if (catalog == null) {
          return res.status(404).json({ message: 'Cannot find catalog' });
      }
      
      res.json(catalog.articles);
  } catch (err) {
    const errMessage = err instanceof Error ? err.message : 'An error occurred';
    res.status(500).json({ message: errMessage });
  }
};

// Get specific one
export const getCatalogArticle = async (req: Request, res: Response) => {
  try {
      const catalog = await Catalog.findById(req.params.id);
      if (catalog == null) {
          return res.status(404).json({ message: 'Cannot find catalog' });
      }

      const articleIndex = catalog.articles.findIndex(article => article._id.toString() === req.params.articleId);
      if (articleIndex === -1) {
          return res.status(404).json({ message: 'Cannot find article' });
      }

      res.json(catalog.articles[articleIndex]);
  } catch (err) {
    const errMessage = err instanceof Error ? err.message : 'An error occurred';
    res.status(500).json({ message: errMessage });
  }
};



// Delete
export const deleteCatalogArticle = async (req: Request, res: Response) => {
  try {
      const catalog = await Catalog.findById(req.params.catalogId);
      if (catalog == null) {
          return res.status(404).json({ message: 'Cannot find catalog' });
      }

      const articleIndex = catalog.articles.findIndex(article => article._id.toString() === req.params.articleId);
      if (articleIndex === -1) {
          return res.status(404).json({ message: 'Cannot find article' });
      }

      catalog.articles.splice(articleIndex, 1);

      const updatedCatalog = await catalog.save();
      res.json(updatedCatalog);
  } catch (err) {
    const errMessage = err instanceof Error ? err.message : 'An error occurred';
    res.status(500).json({ message: errMessage });   }
};
