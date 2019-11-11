import { Country, CountryProps } from '../models/Country';

export class ModelFactory {
    static getCountry(countryProps: CountryProps): Country {
        return new Country(countryProps);
    }

    static getCountries(countryProps: CountryProps[]): Country[] {
        return countryProps.map((countryData: CountryProps): Country => new Country(countryData));
    }
}
