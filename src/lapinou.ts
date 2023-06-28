import {connectLapinou} from './services/lapinouService';
import {createCatalogExchange} from './exchanges/catalogExchange';
import {createAccountExchange} from './exchanges/createAccountExchange';
import {createOrdersExchange} from "./exchanges/ordersExchange";
import {createCatalogsExchange} from "./exchanges/catalogsExchange";

export function initLapinou() {
    connectLapinou().then(async () => {
        createCatalogExchange();
        createAccountExchange();
        createOrdersExchange();
        createCatalogsExchange();
    });
}
