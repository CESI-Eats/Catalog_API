import {Catalog, Menu, Article} from "../models/catalog";
import {MessageLapinou, handleTopic, initExchange, initQueue, sendMessage} from "../services/lapinouService";

export function createAccountExchange() {
    initExchange('restorers').then(exchange => {
        initQueue(exchange, 'create.restorer.account').then(({queue, topic}) => {
            handleTopic(queue, topic, async (msg) => {
                const message = msg.content as MessageLapinou;
                try {
                    console.log(` [x] Received message: ${JSON.stringify(message)}`);

                    const existingRestorer = await Catalog.findOne({ restorerId: message.content.id });
                    if (existingRestorer) {
                      throw new Error('Catalog already exists');
                    }          
                    
                    const catalog = new Catalog({
                        name: message.content.name,
                        restorerId: message.content.id.toString(),
                        description: message.content.description,
                        image: message.content.image,
                        menus: [],
                        articles: []
                    });
                    await catalog.save();

                    await sendMessage({
                        success: true,
                        content: "Catalog created",
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
        initQueue(exchange, 'get.restorer.mycatalog').then(({queue, topic}) => {
            handleTopic(queue, topic, async (msg) => {
                const message = msg.content as MessageLapinou;
                try {
                    console.log(` [x] Received message: ${JSON.stringify(message)}`);

                    const catalog = await Catalog.findOne({ restorerId: message.content.id });
                    
                    await sendMessage({
                        success: true,
                        content: catalog,
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