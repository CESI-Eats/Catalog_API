import {handleTopic, initExchange, initQueue, MessageLapinou, sendMessage} from "../services/lapinouService";
import {Catalog} from "../models/catalog";


export function createCatalogsExchange() {
    initExchange('catalogs').then(exchange => {
        initQueue(exchange, 'get.catalogs').then(({queue, topic}) => {
            handleTopic(queue, topic, async (msg) => {
                const message = msg.content as MessageLapinou;
                try {
                    console.log(` [x] Received message: ${JSON.stringify(message)}`);

                    const catalogs = await Catalog.find();

                    await sendMessage({
                        success: true,
                        content: catalogs,
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
        initQueue(exchange, 'get.catalog').then(({queue, topic}) => {
            handleTopic(queue, topic, async (msg) => {
                const message = msg.content as MessageLapinou;
                try {
                    console.log(` [x] Received message: ${JSON.stringify(message)}`);

                    const catalog = await Catalog.findOne({ _id: message.content.id });

                    await sendMessage({
                        success: true,
                        content: catalog,
                        correlationId: message.correlationId
                    }, message.replyTo ?? '');

                } catch (err) {
                    const errMessage = err instanceof Error ? err.message : 'An error occurred';
                    await sendMessage({
                        success: false,
                        content: errMessage,
                        correlationId: message.correlationId,
                        sender: 'account'
                    }, message.replyTo ?? '');
                }
            });
        });
    });
}