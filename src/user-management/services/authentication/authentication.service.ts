import { Injectable, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ValidateUserViewModel } from 'src/user-management/models/validate-user-view.model';

@Injectable()
export class AuthenticationService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
        ){}

    /**
     * Logs in a user
     * @param user The user authenticated by the local strategy
     */
    async login(user: any) {
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Login successful',
                result: 'Bearer ' + (this.jwtService.sign({ _id: user._id, name: user.name }))
            }
        }
    }

    async validateUser(validateUserViewModel: ValidateUserViewModel) {
        const user = await this.userService.getUserByEmail(validateUserViewModel.email);
        if (user && bcrypt.compareSync(validateUserViewModel.password, user.password)) {
            const { password, ...result } = user;
            return result;
        } else {
            return null;
        }
    }
}
