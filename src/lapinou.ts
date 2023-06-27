import {connectLapinou} from './services/lapinouService';
import {createCatalogExchange} from './exchanges/catalogExchange';
import {createAccountExchange} from './exchanges/createAccountExchange';
import {createOrdersExchange} from "./exchanges/ordersExchange";

export function initLapinou() {
    connectLapinou().then(async () => {
        createCatalogExchange();
        createAccountExchange();
        createOrdersExchange();
    }).catch((err) => {
        console.error('Failed to connect to rabbitMQ');
    });
}
