import { Country, CountryProps } from '../../models/Country';
import { HttpClient } from '../../utils/api/HttpClient';
import { Repository } from '../Repository';
import { KeyValue } from '../../utils/KeyValue';

export class CountriesApi implements Repository<Country> {
    constructor(private httpClient: HttpClient) {}

    async get<K extends keyof Country>(keyValue: KeyValue<Country, K>): Promise<Country> {
        const { data: countryData } = await this.httpClient.get<CountryProps>(`/alpha/${keyValue.value}`);
        return new Country(countryData);
    }

    async getAll(): Promise<Country[]> {
        const { data: countriesData } = await this.httpClient.get<CountryProps[]>('/all');
        return countriesData.map((countryData: CountryProps): Country => new Country(countryData));
    }
}
