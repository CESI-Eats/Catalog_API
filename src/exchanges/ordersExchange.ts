import {handleTopic, initExchange, initQueue, MessageLapinou, sendMessage} from "../services/lapinouService";
import {Catalog} from "../models/catalog";

export function createOrdersExchange() {
    initExchange('orders').then(exchange => {
        initQueue(exchange, 'get.users.restorers.and.catalogs').then(({queue, topic}) => {
            handleTopic(queue, topic, async (msg) => {
                const message = msg.content as MessageLapinou;
                try {
                    console.log(` [x] Received message: ${JSON.stringify(message)}`);
                    const restorerIds = message.content.restorerIds;

                    // Find catalogs using restorerIds
                    const catalogs = await Catalog.find(Catalog, {
                        where: {restorerId: {$in: restorerIds}},
                        relations: ['menus']
                    });

                    await sendMessage({
                        success: true,
                        content: catalogs,
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