import { Request, Response } from 'express';
import Catalog from '../models/myModel';
import mongoose from 'mongoose';

// Get all
export const getCatalogArticles = async (req: Request, res: Response) => {
  try {
      const catalog = await Catalog.findById(req.params.catalogId);
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
      const catalog = await Catalog.findById(req.params.catalogId);
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

// Create
export const createCatalogArticle = async (req: Request, res: Response) => {
  try {
      const catalog = await Catalog.findById(req.params.catalogId);
      if (catalog == null) {
          return res.status(404).json({ message: 'Cannot find catalog' });
      }
      
      const article = {
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          description: req.body.description,
          image: req.body.image,
          price: req.body.price
      };

      catalog.articles.push(article);
      const updatedCatalog = await catalog.save();
      res.status(201).json(updatedCatalog);
  } catch (err) {
    const errMessage = err instanceof Error ? err.message : 'An error occurred';
    res.status(400).json({ message: errMessage });  
  }
};


// Update
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
