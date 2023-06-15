import {Request, Response} from 'express';
import {Catalog, Menu} from '../models/catalog';
import mongoose from 'mongoose';

// Catalogs
// Create Catalog
export const createCatalog = async (req: Request, res: Response) => {
    const {restorerId, description, image} = req.body;

    const catalog = new Catalog({
        _id: new mongoose.Types.ObjectId(),
        restorerId: restorerId,
        description: description,
        image: image,
        menus: [],
        articles: []
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
    const {restorerId, description, image, menus: [], articles: []} = req.body;

    try {
        const catalog = await Catalog.findById(req.params.id);
        if (catalog == null) {
            return res.status(404).json({message: 'Cannot find catalog'});
        }
        const updatedCatalog = await Catalog.findByIdAndUpdate(req.params.id, {
            restorerId: restorerId,
            description: description,
            image: image,
        }, {new: true}); // The option { new: true } ensures that the function returns the updated version of the document

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

// GET all catalogs
export const getCatalogs = async (req: Request, res: Response) => {
    try {
        const catalogs = await Catalog.find();
        res.json(catalogs);
    } catch (err) {
        const errMessage = err instanceof Error ? err.message : 'An error occurred';
        res.status(500).json({message: errMessage});
    }
};

// GET a specific catalog by ID
export const getCatalogById = async (req: Request, res: Response) => {
    try {
        const catalog = await Catalog.findById(req.params.id);
        if (catalog == null) {
            return res.status(404).json({message: 'Cannot find catalog'});
        }
        res.json(catalog);
    } catch (err) {
        const errMessage = err instanceof Error ? err.message : 'An error occurred';
        res.status(500).json({message: errMessage});
    }
};

// Articles
// Create Article
export const createArticle = async (req: Request, res: Response) => {
    const {name, description, image, price} = req.body;

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

// Update Article
export const updateArticle = async (req: Request, res: Response) => {
    try {
        const catalog = await Catalog.findById(req.params.catalogId);

        if (!catalog) {
            return res.status(404).json({
                message: "No Catalog found with this ID"
            });
        }

        const articleIndex = catalog.articles.findIndex(article => article._id.toString() === req.params.id);

        if (articleIndex === -1) {
            return res.status(404).json({
                message: "No Article found with this ID in the specified Catalog"
            });
        }

        // Update the article details
        catalog.articles[articleIndex].name = req.body.name;
        catalog.articles[articleIndex].description = req.body.description;
        catalog.articles[articleIndex].image = req.body.image;
        catalog.articles[articleIndex].price = req.body.price;

        await catalog.save();

        res.json({message: 'Article has been updated', article: catalog.articles[articleIndex]});
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
};


// Delete Article
// ATTENTION IL FAUT ENCORE SUPPR LES ATICLES DES MENUS
export const deleteArticle = async (req: Request, res: Response) => {
    try {
        const catalog = await Catalog.findById(req.params.catalogId);

        if (!catalog) {
            return res.status(404).json({
                message: "No Catalog found with this ID"
            });
        }

        catalog.articles = catalog.articles.filter(
            article => article._id.toString() != req.params.id
        );

        await Catalog.findByIdAndUpdate(req.params.catalogId, catalog);

        res.status(200).json(catalog);
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
};

// Menus
// POST a new Menu in a specific Catalog
export const createMenu = async (req: Request, res: Response) => {
    const catalog = await Catalog.findById(req.params.catalogId);
    if (!catalog) {
        return res.status(404).json({message: 'Cannot find catalog'});
    }
    const { name, description, image, articles } = req.body;

    const menu = new Menu({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        description: description,
        image: image,
        articles: articles.map((article: { id: string }) => new mongoose.Types.ObjectId(article.id)),
    });
    catalog.menus.push(menu);
    await catalog.save();
    res.status(201).json(menu);
};

// PUT a specific Menu in a specific Catalog
export const updateMenu = async (req: Request, res: Response) => {
    try {
        const catalog = await Catalog.findById(req.params.catalogId);

        if (!catalog) {
            return res.status(404).json({
                message: "No Catalog found with this ID"
            });
        }

        const menuIndex = catalog.menus.findIndex(menu => menu._id.toString() === req.params.id);

        if (menuIndex === -1) {
            return res.status(404).json({
                message: "No Menu found with this ID in the specified Catalog"
            });
        }

        // Update the menu details
        const { name, description, image, articles } = req.body;
        catalog.menus[menuIndex].name = name;
        catalog.menus[menuIndex].description = description;
        catalog.menus[menuIndex].image = image;
        catalog.menus[menuIndex].articles = articles.map((article: { id: string }) => new mongoose.Types.ObjectId(article.id));

        await catalog.save();

        res.json({ message: 'Menu has been updated', menu: catalog.menus[menuIndex] });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
};



// DELETE a specific Menu in a specific Catalog

export const deleteMenu = async (req: Request, res: Response) => {
    try {
        const catalog = await Catalog.findById(req.params.catalogId);

        if (!catalog) {
            return res.status(404).json({
                message: "No Catalog found with this ID"
            });
        }

        catalog.menus = catalog.menus.filter(
            menu => menu._id.toString() != req.params.id
        );

        await Catalog.findByIdAndUpdate(req.params.catalogId, catalog);

        res.status(200).json({ message: catalog });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
};
