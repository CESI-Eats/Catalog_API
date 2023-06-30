import {connectLapinou} from './services/lapinouService';
import {createCatalogExchange} from './exchanges/catalogExchange';
import {createAccountExchange} from './exchanges/createAccountExchange';
import {createOrdersExchange} from "./exchanges/ordersExchange";
import {createCatalogsExchange} from "./exchanges/catalogsExchange";
import {createHistoricExchange} from "./exchanges/historicExchange";

export function initLapinou() {
    connectLapinou().then(async () => {
        createCatalogExchange();
        createAccountExchange();
        createOrdersExchange();
        createCatalogsExchange();
        createHistoricExchange();
    }).catch((error) => console.log('Failed to connect to Lapinou.', error));
}
