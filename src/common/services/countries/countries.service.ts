import { Injectable, HttpStatus } from '@nestjs/common';
import { CountryModel } from 'src/common/models/country.model';
import { CountriesData } from 'src/common/models/country.sample.data';
import { ResultViewModel } from 'src/shared/models/result-view.model';

@Injectable()
export class CountriesService {

    async getCountries(): Promise<ResultViewModel<CountryModel[]>> {
        const countriesList = (await CountriesData).map(v => {
            return ({
                name: v.name,
                code: v.code,
                language: v.language
            } as CountryModel)
        });

        return ({
            status: HttpStatus.OK
            , body: {
                result: countriesList,
                message: "Successfully retrieved countries"
            }
        } as ResultViewModel<CountryModel[]>);

    }
}
