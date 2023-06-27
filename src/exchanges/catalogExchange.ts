import {Catalog, Menu, Article} from "../models/catalog";
import {MessageLapinou, handleTopic, initExchange, initQueue, sendMessage} from "../services/lapinouService";

export function createCatalogExchange() {
    initExchange('catalog').then(exchange => {
        initQueue(exchange, 'update.restorer.catalog').then(({queue, topic}) => {
            handleTopic(queue, topic, async (msg) => {
                const message = msg.content as MessageLapinou;
                try {
                    console.log(` [x] Received message: ${JSON.stringify(message)}`);

                    const catalog = await Catalog.findById(message.content.id);
                    if (catalog == null) {
                        throw new Error("No Catalog found with this ID");
                    }
    
                    const updatedCatalog = await Catalog.findByIdAndUpdate(message.content.id, {
                        restorerId: message.content.restorerId,
                        description: message.content.description,
                        image: message.content.image,
                    }, {new: true});
                    
                    if (!updatedCatalog) {
                        throw new Error("Catalog update failed");
                    }

                    await sendMessage({
                        success: true,
                        content: "Catalog updated",
                        correlationId: message.correlationId,
                        sender: 'catalog'
                    }, message.replyTo ?? '');
                } catch (err) {
                    const errMessage = err instanceof Error ? err.message : 'An error occurred';
                    await sendMessage({
                        success: false,
                        content: errMessage,
                        correlationId: message.correlationId,
                        sender: 'catalog'
                    }, message.replyTo ?? '');
                }
            })
        });
        initQueue(exchange, 'getAll.user.catalog').then(({queue, topic}) => {
            handleTopic(queue, topic, async (msg) => {
                const message = msg.content as MessageLapinou;
                try {
                    console.log(` [x] Received message: ${JSON.stringify(message)}`);
    
                    await Catalog.find();
    
                    await sendMessage({
                        success: true,
                        content: "All catalog recevied",
                        correlationId: message.correlationId,
                        sender: 'catalog'
                    }, message.replyTo ?? '');
                } catch (err) {
                    const errMessage = err instanceof Error ? err.message : 'An error occurred';
                    await sendMessage({
                        success: false,
                        content: errMessage,
                        correlationId: message.correlationId,
                        sender: 'catalog'
                    }, message.replyTo ?? '');
                }
            })
        });
        initQueue(exchange, 'get.restorer.catalog').then(({queue, topic}) => {
            handleTopic(queue, topic, async (msg) => {
                const message = msg.content as MessageLapinou;
                try {
                    console.log(` [x] Received message: ${JSON.stringify(message)}`);
    
                    const catalog = await Catalog.findById(message.content.id);

                    if (catalog == null) {
                        throw new Error("No Catalog found with this ID");
                    }
    
                    await sendMessage({
                        success: true,
                        content: "Catalog recevied",
                        correlationId: message.correlationId,
                        sender: 'catalog'
                    }, message.replyTo ?? '');
                } catch (err) {
                    const errMessage = err instanceof Error ? err.message : 'An error occurred';
                    await sendMessage({
                        success: false,
                        content: errMessage,
                        correlationId: message.correlationId,
                        sender: 'catalog'
                    }, message.replyTo ?? '');
                }
            })
        });
        initQueue(exchange, 'get.user.catalog').then(({queue, topic}) => {
            handleTopic(queue, topic, async (msg) => {
                const message = msg.content as MessageLapinou;
                try {
                    console.log(` [x] Received message: ${JSON.stringify(message)}`);
    
                    const catalog = await Catalog.findById(message.content.id);

                    if (catalog == null) {
                        throw new Error("No Catalog found with this ID");
                    }
    
                    await sendMessage({
                        success: true,
                        content: "Catalog recevied",
                        correlationId: message.correlationId,
                        sender: 'catalog'
                    }, message.replyTo ?? '');
                } catch (err) {
                    const errMessage = err instanceof Error ? err.message : 'An error occurred';
                    await sendMessage({
                        success: false,
                        content: errMessage,
                        correlationId: message.correlationId,
                        sender: 'catalog'
                    }, message.replyTo ?? '');
                }
            })
        });


        // Articles


        initQueue(exchange, 'create.restorer.article').then(({queue, topic}) => {
            handleTopic(queue, topic, async (msg) => {
                const message = msg.content as MessageLapinou;
                try {
                    console.log(` [x] Received message: ${JSON.stringify(message)}`);

                    const catalog = await Catalog.findById(message.content.catalogId);

                    if (!catalog) {
                        throw new Error("No Catalog found with this ID");
                    }

                    const article = new Article({
                        _id: message.content.id,
                        name: message.content.name,
                        description: message.content.description,
                        image: message.content.image,
                        price: message.content.price
                    });

                    catalog.articles.push(article);
                    await catalog.save();
    
                    await sendMessage({
                        success: true,
                        content: "Article created",
                        correlationId: message.correlationId,
                        sender: 'catalog'
                    }, message.replyTo ?? '');
                } catch (err) {
                    const errMessage = err instanceof Error ? err.message : 'An error occurred';
                    await sendMessage({
                        success: false,
                        content: errMessage,
                        correlationId: message.correlationId,
                        sender: 'catalog'
                    }, message.replyTo ?? '');
                }
            })
        });
        initQueue(exchange, 'update.restorer.article').then(({queue, topic}) => {
            handleTopic(queue, topic, async (msg) => {
                const message = msg.content as MessageLapinou;
                try {
                    console.log(` [x] Received message: ${JSON.stringify(message)}`);
    
                    const catalog = await Catalog.findById(message.content.catalogId);

                    if (!catalog) {
                        throw new Error ("No Catalog found with this ID");
                    }

                    const articleIndex = catalog.articles.findIndex(article => article._id.toString() === message.content.id);

                    if (articleIndex === -1) {
                        throw new Error ("No Article found with this ID in the specified Catalog");
                    }

                    // Update the article details
                    catalog.articles[articleIndex].name = message.content.name;
                    catalog.articles[articleIndex].description = message.content.description;
                    catalog.articles[articleIndex].image = message.content.image;
                    catalog.articles[articleIndex].price = message.content.price;

                    await catalog.save();
    
                    await sendMessage({
                        success: true,
                        content: "Article updated",
                        correlationId: message.correlationId,
                        sender: 'catalog'
                    }, message.replyTo ?? '');
                } catch (err) {
                    const errMessage = err instanceof Error ? err.message : 'An error occurred';
                    await sendMessage({
                        success: false,
                        content: errMessage,
                        correlationId: message.correlationId,
                        sender: 'catalog'
                    }, message.replyTo ?? '');
                }
            })
        });
        initQueue(exchange, 'delete.restorer.article').then(({queue, topic}) => {
            handleTopic(queue, topic, async (msg) => {
                const message = msg.content as MessageLapinou;
                try {
                    console.log(` [x] Received message: ${JSON.stringify(message)}`);
    
                    const catalog = await Catalog.findById(message.content.catalogId);

                    if (!catalog) {
                        throw new Error ("No Catalog found with this ID");
                    }
            
                    catalog.articles = catalog.articles.filter(
                        article => article._id.toString() != message.content.id
                    );
            
                    await Catalog.findByIdAndUpdate(message.content.catalogId, catalog);
                
                    await sendMessage({
                        success: true,
                        content: "Article deleted",
                        correlationId: message.correlationId,
                        sender: 'catalog'
                    }, message.replyTo ?? '');
                } catch (err) {
                    const errMessage = err instanceof Error ? err.message : 'An error occurred';
                    await sendMessage({
                        success: false,
                        content: errMessage,
                        correlationId: message.correlationId,
                        sender: 'catalog'
                    }, message.replyTo ?? '');
                }
            })
        });


        // Menu


        initQueue(exchange, 'create.restorer.menu').then(({queue, topic}) => {
            handleTopic(queue, topic, async (msg) => {
                const message = msg.content as MessageLapinou;
                try {
                    console.log(` [x] Received message: ${JSON.stringify(message)}`);
    
                    const catalog = await Catalog.findById(message.content.catalogId);
                    if (!catalog) {
                        throw new Error ("No Catalog found with this ID");
                    }
                
                    const menu = new Menu({
                        _id: message.content.id,
                        name: message.content.name,
                        description: message.content.description,
                        image: message.content.image,
                        articles: message.content.articles,
                    });
                    catalog.menus.push(menu);
                    await catalog.save();
                
                    await sendMessage({
                        success: true,
                        content: "Menu created",
                        correlationId: message.correlationId,
                        sender: 'catalog'
                    }, message.replyTo ?? '');
                } catch (err) {
                    const errMessage = err instanceof Error ? err.message : 'An error occurred';
                    await sendMessage({
                        success: false,
                        content: errMessage,
                        correlationId: message.correlationId,
                        sender: 'catalog'
                    }, message.replyTo ?? '');
                }
            })
        });
        initQueue(exchange, 'update.restorer.menu').then(({queue, topic}) => {
            handleTopic(queue, topic, async (msg) => {
                const message = msg.content as MessageLapinou;
                try {
                    console.log(` [x] Received message: ${JSON.stringify(message)}`);
    
                    const catalog = await Catalog.findById(message.content.catalogId);

                    if (!catalog) {
                        throw new Error ("No Catalog found with this ID");
                    }
            
                    const menuIndex = catalog.menus.findIndex(menu => menu._id.toString() === message.content.id);
            
                    if (menuIndex === -1) {
                        throw new Error ("No Menu found with this ID in the specified Catalog");
                    }
            
                    // Update the menu details
                    catalog.menus[menuIndex].name = message.content.name;
                    catalog.menus[menuIndex].description = message.content.description;
                    catalog.menus[menuIndex].image = message.content.image;
                    catalog.menus[menuIndex].articles = message.content.articles;
            
                    await catalog.save();
                
                    await sendMessage({
                        success: true,
                        content: "Menu updated",
                        correlationId: message.correlationId,
                        sender: 'catalog'
                    }, message.replyTo ?? '');
                } catch (err) {
                    const errMessage = err instanceof Error ? err.message : 'An error occurred';
                    await sendMessage({
                        success: false,
                        content: errMessage,
                        correlationId: message.correlationId,
                        sender: 'catalog'
                    }, message.replyTo ?? '');
                }
            })
        });
        initQueue(exchange, 'delete.restorer.menu').then(({queue, topic}) => {
            handleTopic(queue, topic, async (msg) => {
                const message = msg.content as MessageLapinou;
                try {
                    console.log(` [x] Received message: ${JSON.stringify(message)}`);
    
                    const catalog = await Catalog.findById(message.content.catalogId);

                    if (!catalog) {
                        throw new Error ("No Catalog found with this ID");
                    }
            
                    catalog.menus = catalog.menus.filter(
                        menu => menu._id.toString() != message.content.id
                    );
            
                    await Catalog.findByIdAndUpdate(message.content.catalogId, catalog);
                
                    await sendMessage({
                        success: true,
                        content: "Menu deleted",
                        correlationId: message.correlationId,
                        sender: 'catalog'
                    }, message.replyTo ?? '');
                } catch (err) {
                    const errMessage = err instanceof Error ? err.message : 'An error occurred';
                    await sendMessage({
                        success: false,
                        content: errMessage,
                        correlationId: message.correlationId,
                        sender: 'catalog'
                    }, message.replyTo ?? '');
                }
            })
        });
    })
}