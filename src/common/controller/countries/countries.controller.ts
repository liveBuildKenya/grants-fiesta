import { Controller, UseGuards, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthenticationGuard } from 'src/user-management/authentication/guards/jwt-authentication.guard';
import { ResultViewModel } from 'src/shared/models/result-view.model';

import { CountriesService } from 'src/common/services/countries/countries.service';
import { CountryModel } from 'src/common/models/country.model';

@Controller('countries')
export class CountriesController {
    constructor(private countriesService: CountriesService) {}

    @UseGuards(JwtAuthenticationGuard)
    @Get('')
    async createEvent(@Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<CountryModel[]> = await this.countriesService.getCountries();
        res.status(result.status).json(result.body);
    }
}
