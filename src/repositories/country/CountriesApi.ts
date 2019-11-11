import { Country, CountryProps } from '../../models/Country';
import { HttpClient } from '../../utils/api/HttpClient';
import { Repository } from '../Repository';
import { KeyValue } from '../../utils/KeyValue';
import { ModelFactory } from '../../factories/ModelFactory';

export class CountriesApi implements Repository<Country> {
    constructor(private httpClient: HttpClient) {}

    async get<K extends keyof Country>(keyValue: KeyValue<Country, K>): Promise<Country> {
        const { data } = await this.httpClient.get<CountryProps>(`/alpha/${keyValue.value}`);
        return ModelFactory.getCountry(data);
    }

    async getAll(): Promise<Country[]> {
        const { data } = await this.httpClient.get<CountryProps[]>('/all');
        return ModelFactory.getCountries(data);
    }
}
