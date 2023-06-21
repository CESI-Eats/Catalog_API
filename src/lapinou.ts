import {connectLapinou} from './services/lapinouService';
import {createCatalogExchange} from './exchanges/catalogExchange';

export function initLapinou() {
    connectLapinou().then(async () => {
        createCatalogExchange();
    }).catch((err) => {
        console.error('Failed to connect to rabbitMQ');
    });
}
