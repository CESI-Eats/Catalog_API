import {connectLapinou} from './services/lapinouService';
import {createCatalogExchange} from './exchanges/catalogExchange';
import { createAccountExchange } from './exchanges/createAccountExchange';

export function initLapinou() {
    connectLapinou().then(async () => {
        createCatalogExchange();
        createAccountExchange();
    }).catch((err) => {
        console.error('Failed to connect to rabbitMQ');
    });
}
