import { Request, Response } from 'express';
import { controller, get } from '../decorators';
import { RepositoryFactory } from '../factories/RepositoryFactory';
import { ArrayUtil } from '../utils/ArrayUtil';
import { Sort } from '../enums/Sort';

const countriesApi = RepositoryFactory.getDefaultCountriesApi();

@controller('/countries')
class CountriesController {
    @get('/')
    async getCountries(req: Request, res: Response): Promise<void> {
        const search: string = req.query.search || '';
        const sort: string = req.query.sort || Sort.ASC;
        const ascending = sort === Sort.ASC;

        let countries = await countriesApi.getAll();

        if (sort) {
            countries = ArrayUtil.sort(countries, 'name', !ascending);
        }

        if (search) {
            countries = ArrayUtil.filter(countries, 'name', search);
        }

        res.render('countries', {
            countries,
            search,
            sort,
            ascending,
        });
    }

    @get('/:countryCode')
    async getCountry(req: Request, res: Response): Promise<void> {
        const countryCode: string = req.params.countryCode;

        const country = await countriesApi.get({
            key: 'alpha2Code',
            value: countryCode,
        });

        res.render('country', {
            country,
        });
    }
}
