import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { UnauthorizedException, Injectable } from "@nestjs/common";
import { AuthenticationService } from "src/user-management/services/authentication/authentication.service";
import { ValidateUserViewModel } from "src/user-management/models/validate-user-view.model";

/**
 * Represents the local passport strategy
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    
    constructor(private authenticationService: AuthenticationService) {
        super();
    }

    /**
     * Validates a user
     * @param userViewModel user view model
     */
    async validate(username: string, password: string) {
        const validateUserViewModel: ValidateUserViewModel = { email: username, password: password};
        const user: any = await this.authenticationService.validateUser(validateUserViewModel);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user._doc;
    }
}