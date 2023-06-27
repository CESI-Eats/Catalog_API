import {handleTopic, initExchange, initQueue, MessageLapinou, sendMessage} from "../services/lapinouService";
import {Catalog} from "../models/catalog";

export function createOrdersExchange() {
    initExchange('catalogs').then(exchange => {
        initQueue(exchange, 'get.catalog').then(({queue, topic}) => {
            handleTopic(queue, topic, async (msg) => {
                const message = msg.content as MessageLapinou;
                try {
                    console.log(` [x] Received message: ${JSON.stringify(message)}`);

                    const catalog = await Catalog.findOne({ restorerId: message.content.id });

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