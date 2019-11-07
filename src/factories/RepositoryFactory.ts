import { Cache } from '../repositories/Cache';
import { Country } from '../models/Country';
import { FetchClient } from '../utils/api/FetchClient';
import { MemoryStorage } from '../utils/storage/MemoryStorage';
import { CountriesApi } from '../repositories/country/CountriesApi';
import { Urls } from '../enums/urls';
import moment from 'moment';

export class RepositoryFactory {
    static getDefaultCountriesApi(): Cache<Country> {
        const withFetchClient = new CountriesApi(new FetchClient(Urls.COUNTRIES));
        const expires = moment()
            .add(7, 'days')
            .toDate();

        return new Cache(withFetchClient, new MemoryStorage(), {
            expires,
        });
    }
}
