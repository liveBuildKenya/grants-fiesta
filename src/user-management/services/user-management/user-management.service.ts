import { Injectable, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { RegisterUserViewModel } from 'src/user-management/models/register-user-view.model';
import { JwtService } from '@nestjs/jwt';
import { ChangeUserPasswordViewModel } from 'src/user-management/models/change-user-password-view.model';
import { UpdateUserProfileViewModel } from 'src/user-management/models/update-user-profile-view.model';
import { InviteUsersViewModel } from 'src/user-management/models/invite-users-view.model';
import { InviteStatus } from 'src/user-management/models/invite-status.enum';
import { InviteService } from '../invite/invite.service';
import { ResultViewModel, SibasiResponseObject, ErrorViewModel } from 'src/shared/models/result-view.model';
import { MailingService } from 'src/mailing-management/services/mailing/mailing.service';
import { ConfigService } from '@nestjs/config';
import { generateNumber } from 'src/shared/util/generate-number.util';
import { ChangeForgotPasswordViewModel } from 'src/user-management/models/change-forgot-password-view.model';
import { UserGroupService } from '../user-group/user-group.service';
import { SYSTEMPERMISSIONS } from 'src/shared/security/system-permission.model';
import { UserModel } from 'src/user-management/models/user.model';

@Injectable()
export class UserManagementService {

    constructor(private configService: ConfigService,
                private userService: UserService,
                private mailingService: MailingService,
                private userGroupService: UserGroupService,
                private jwtService: JwtService,
                private inviteService: InviteService) {}
    /**
     * Creates a new user
     * 
     * @param userViewModel Represents a user view model interface
     */
    async register(registerUserViewModel: RegisterUserViewModel): Promise<ResultViewModel<any>> {

        if (!registerUserViewModel.name) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: "Name not specified",
                    result: registerUserViewModel
                } as SibasiResponseObject<any>
            }
        }

        if (!registerUserViewModel.email) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: "Email not specified",
                    result: registerUserViewModel
                }  as SibasiResponseObject<any>
            }
        }

        if (!registerUserViewModel.password) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: "Password not specified",
                    result: registerUserViewModel
                } as SibasiResponseObject<any>
            }
        }        

        if ((await this.userService.getUserByEmail(registerUserViewModel.email))) {

            const {password, ...value } = registerUserViewModel;

            return {
                status: HttpStatus.METHOD_NOT_ALLOWED,
                body: {
                    message: 'User already exists',
                    result: value
                } as SibasiResponseObject<any>
            };
        }

        registerUserViewModel.password = bcrypt.hashSync(registerUserViewModel.password, 12);
        registerUserViewModel.emailVerified = false;
        registerUserViewModel.dateCreated = new Date(Date.now());

        const createdUser = await this.userService.create(registerUserViewModel);
        const token = `Bearer ${this.jwtService.sign({ _id: createdUser._id, name: createdUser.name})}`;

        await this.sendVerificationEmail(createdUser._id);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'User registered successfully',
                result: token 
            } as SibasiResponseObject<any>
        };
    }

    async verifyUser(currentUser, userId: string) {
        const user = await this.userService.getUserById(currentUser._id);

        if (user._id == userId) {
            user.emailVerified = true;

            await this.userService.update(user);

            return {
                status: HttpStatus.OK,
                body: {
                    message: 'User verified',
                    result: (await this.userService.getUserById(currentUser._id))
                }
            };
        } else {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'User could not be verified',
                    result: false,
                    error: 'Emails do not match'
                }
            };
        }
    }

    async sendVerificationEmail(userID: string): Promise<any> {
        const user: UserModel = await this.userService.getUserById(userID);

        return await this.mailingService.sendMail({
            from: this.configService.get<string>('DEFAULT_USER'),
            to: [user.email],
            subject: 'Welcome to the Grants Management System of the Ecological Organic Agriculture Initiative',
            text: `Welcome to the Grants Management System of the Ecological Organic Agriculture Initiative`,
            html: `<p>Dear, ${user.name}</p>
            <p>Welcome to the Grants Management System of the Ecological Organic Agriculture Initiative.</p>
            <p>Click <a href="${this.configService.get<string>('CLIENT_HOST')}/#/verify/${user._id}">here</a> to verify your email. You can also copy and paste the following link to your browser.<br/>${this.configService.get<string>('CLIENT_HOST')}/#/verify/${user._id}</p>
            <p>If you have any questions, please send an email to gms@eoai-africa.org</p>
            <p>Best Regards,<br/>EOA Initiative Project Management Unit <br/>Biovision Africa Trust</p>
            `
        });
    }

    /**
     * Gets a user profile
     */
    async getUserProfile(currentUser, userIdentifier?: string){
        if (userIdentifier) {
            const user = await this.userService.getUserById(userIdentifier);
            const {password, ...value} = user;
            return {
                status: HttpStatus.OK,
                body: {
                    message: 'User profile',
                    result: value
                }
            };
        } else {
            const user = await this.userService.getUserById(currentUser._id);
            const {password, ...value} = user;
            return {
                status: HttpStatus.OK,
                body: {
                    message: 'User profile',
                    result: value
                }
            };
        }
    }

    getSystemPermissions() {
        return {
            status: HttpStatus.OK,
            body:{
                message: 'System permissions',
                result: SYSTEMPERMISSIONS
            }
        }
    }

    async changeUserPassword(currentUser, changeUserPasswordViewModel: ChangeUserPasswordViewModel) {
        if (!changeUserPasswordViewModel.currentPassword) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Current password not provided',
                    result: changeUserPasswordViewModel
                }
            };
        }

        if (!changeUserPasswordViewModel.newPassword) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'New password not provided',
                    result: changeUserPasswordViewModel
                }
            };
        }

        let user = await this.userService.getUserById(currentUser._id);
        if (bcrypt.compareSync(changeUserPasswordViewModel.currentPassword, user.password)) {
            user.password = bcrypt.hashSync(changeUserPasswordViewModel.newPassword, 12);
            await this.userService.update(user);
            user = await this.userService.getUserById(currentUser._id);

            return {
                status: HttpStatus.OK,
                body: {
                    message: 'Password changed successfully',
                    result: user
                }
            };
        } else {
            return {
                status: HttpStatus.METHOD_NOT_ALLOWED,
                body: {
                    message: 'Password cannot be changed',
                    result: changeUserPasswordViewModel
                }
            };
        }
    }

    async updateUserProfile(currentUser, updateUserProfileViewModel: UpdateUserProfileViewModel) {
        let user  = await this.userService.getUserById(currentUser._id);

        if (updateUserProfileViewModel.email) {
            let emailExists = await this.userService.getUserByEmail(updateUserProfileViewModel.email);
            if (emailExists) {
                return {
                    status: HttpStatus.METHOD_NOT_ALLOWED,
                    body: {
                        message: 'Cannot update profile: Email already exists',
                        result: updateUserProfileViewModel,
                        error: 'Email already exists'
                    }
                };
            } else {
                user.email = updateUserProfileViewModel.email;
            }
        }

        if (updateUserProfileViewModel.name) {
            user.name = updateUserProfileViewModel.name;
        }

        if (updateUserProfileViewModel.organization) {
            user.organization = updateUserProfileViewModel.organization;
        }

        if (updateUserProfileViewModel.phoneNumber) {
            user.phoneNumber = updateUserProfileViewModel.phoneNumber;
        }

        if (updateUserProfileViewModel.postalAddress) {
            user.postalAddress = updateUserProfileViewModel.postalAddress;
        }

        if (updateUserProfileViewModel.country) {
            user.country = updateUserProfileViewModel.country;
        }
        
        await this.userService.update(user);

        user = await this.userService.getUserById(currentUser._id);

        const {password, ...value} = user;

        return {
            status: HttpStatus.OK,
            body: {
                message: 'User profile updated',
                result: value
            }
        };
    }

    async inviteUsers(currentUser, inviteUsersViewModel: InviteUsersViewModel) {
        if (!inviteUsersViewModel.emails || inviteUsersViewModel.emails.length == 0) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Email not provided',
                    result: inviteUsersViewModel
                }
            };
        }

        if (!inviteUsersViewModel.message) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Message not provided',
                    result: inviteUsersViewModel
                }
            };
        }

        const invitingUser = await this.userService.getUserById(currentUser._id);


        for (const email of inviteUsersViewModel.emails) {
            if (!(await this.userService.getUserByEmail(email))) {

                await this.inviteService.create({
                    email: email,
                    message: inviteUsersViewModel.message,
                    status: InviteStatus.INVITED,
                    invitedBy: invitingUser.email
                });

                // TODO: SEND EMAILS.
            }
        }

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Users invited successfully'
            }
        };
    }

    async uploadProfilePicture(currentUser, fileId: string) {
        if (!fileId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Profile picture not provided',
                }
            };
        }

        const user = await this.userService.getUserById(currentUser._id);
        user.profilePictureId = fileId;

        await this.userService.update(user);

        const pictureUploadedUser = await this.userService.getUserById(currentUser._id);
        const { password, ...value } = pictureUploadedUser;

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Profile picture uploaded successfully',
                result: value
            }
        };
    }

    async getUserProfilePicture(currentUser) {
        return (await this.userService.getUserById(currentUser._id)).profilePictureId;
    }

    async forgotPassword(email: string): Promise<ResultViewModel<boolean | string>> {
        if (!email) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Forgot password process not started: email not defined',
                    result: email,
                    error: 'email not defined'
                }
            };
        }

        const user = await this.userService.getUserByEmail(email);
        if(!user) {
            return ({
                status: HttpStatus.NOT_FOUND,
                body: {
                    message: 'Forgot password process not started: User not defined',
                    result: email,
                    error: 'User not defined'
                }
            }) as ErrorViewModel<string>;
        }

        user.forgotPasswordToken = {
            dateIssued: new Date(Date.now()),
            token: generateNumber(100000, 999999)
        };

        await this.userService.update(user);

        await this.mailingService.sendMail({
            from: this.configService.get<string>('DEFAULT_USER'),
            to: [user.email],
            subject: 'EOA Initiative Grants Management System - Forgot Password Token',
            text: `Your token is ${user.forgotPasswordToken.token} and will expire in 10 minutes. 
                To reset your password, please copy and paste the following link to your preferred browser: ${this.configService.get<string>('CLIENT_HOST')}/#/forgotPassword/${user.forgotPasswordToken.token}/${user.email}`,
            html: `<p>Hello ${user.name},</p>
            <p>We have received a request to reset your password. </p>
            <p>Your token is <b>${user.forgotPasswordToken.token}</b> and will expire in 10 minutes.</p>
            <p>To change your password please click on the following link: <a href="${this.configService.get<string>('CLIENT_HOST')}/#/forgotPassword/${user.forgotPasswordToken.token}/${user.email}">Reset Password link</a></p>
            <p>You can also copy and paste the following link to your preferred browser: ${this.configService.get<string>('CLIENT_HOST')}/#/forgotPassword/${user.forgotPasswordToken.token}/${user.email}</p>
            <p>If you have any questions, contact gms@eoai-africa.org</p>
            <br/>
            <p>Regards,<br/>Grants Management System</p>
            <p>Managed by Biovision Africa Trust</p>
            ` 
        });


        if (user) {
            return {
                status: HttpStatus.OK,
                body: {
                    message: 'Email sent',
                    result: true
                }
            }
        } 
        else {
            return {
                status: HttpStatus.METHOD_NOT_ALLOWED,
                body: {
                    message: 'User not found',
                    result: email,
                    error: 'User not found'
                }
            };
        }
    }
    
    async changeForgotPassword(changeForgotPasswordViewModel: ChangeForgotPasswordViewModel) {
        if (!changeForgotPasswordViewModel.token) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Password not changed: token not defined',
                    result: changeForgotPasswordViewModel,
                    error: 'token not defined'
                }
            };
        }

        if (!changeForgotPasswordViewModel.newPassword) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Password not changed: newPassword not defined',
                    result: changeForgotPasswordViewModel,
                    error: 'newPassword not defined'
                }
            };
        }

        if (!changeForgotPasswordViewModel.email) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Password not changed: email not defined',
                    result: changeForgotPasswordViewModel,
                    error: 'email not defined'
                }
            };
        }
        
        const user = await this.userService.getUserByEmail(changeForgotPasswordViewModel.email);

        if (user) {
            if (user.forgotPasswordToken.token == changeForgotPasswordViewModel.token) {

                if (new Date(Date.now()).getTime() - new Date(user.forgotPasswordToken.dateIssued).getTime() > 600000) {
                    return {
                        status: HttpStatus.METHOD_NOT_ALLOWED,
                        body: {
                            message: 'Token Expired'
                        }
                    };
                }
                else {
                user.password = bcrypt.hashSync(changeForgotPasswordViewModel.newPassword, 12);
    
                await this.userService.update(user);

                return {
                    status: HttpStatus.OK,
                    body: {
                        message: 'Password changed',
                        result: true
                    }
                };
                }
            }
            else {
                return {
                    status: HttpStatus.METHOD_NOT_ALLOWED,
                    body: {
                        message: 'Password not changed: token does not match',
                        result: changeForgotPasswordViewModel,
                        error: 'token does not match'
                    }
                };
            }
        }
        else {
            return {
                status: HttpStatus.METHOD_NOT_ALLOWED,
                body: {
                    message: 'Password not changed: user not found',
                    return: changeForgotPasswordViewModel,
                    error: 'user not found'
                }
            };
        }
    } 
}
