export type LatLng = [number, number];

export interface Currency {
    code: string;
    name: string;
    symbol: string;
}

export interface Language {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
}

export interface CountryProps {
    name: string;
    alpha2Code: string;
    alpha3Code: string;
    capital: string;
    region: string;
    subregion: string;
    latlng: LatLng;
    timezones: string[];
    currencies: Currency[];
    languages: Language[];
    flag: string;
}

export class Country implements CountryProps {
    name: string;
    alpha2Code: string;
    alpha3Code: string;
    capital: string;
    region: string;
    subregion: string;
    latlng: LatLng;
    timezones: string[];
    currencies: Currency[];
    languages: Language[];
    flag: string;

    constructor(props: CountryProps) {
        this.name = props.name;
        this.alpha2Code = props.alpha2Code;
        this.alpha3Code = props.alpha3Code;
        this.capital = props.capital;
        this.region = props.region;
        this.subregion = props.subregion;
        this.latlng = props.latlng;
        this.timezones = props.timezones;
        this.currencies = props.currencies;
        this.languages = props.languages;
        this.flag = props.flag;
    }
}
