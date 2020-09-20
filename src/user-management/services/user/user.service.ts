import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { RegisterUserViewModel } from 'src/user-management/models/register-user-view.model';
import { UserModel } from 'src/user-management/models/user.model';


@Injectable()
export class UserService {

    constructor(@InjectModel('User') private userModel: Model<UserModel>) {}

    /**
     * Creates a user
     * @param registerUserViewModel User view model
     */
    async create(registerUserViewModel: RegisterUserViewModel) {
        const newUser = new this.userModel(registerUserViewModel);
        return await newUser.save();
    }

    async update(user: any) {
        await this.userModel.updateOne({_id: user._id}, user);
        return await this.getUserByEmail(user.email);
    }

    /**
     * Gets a user by email
     * @param username email
     */
    async getUserByEmail(email: string): Promise<UserModel> {
        return await this.userModel.findOne({ email: email });
    }

    async getUserById(id: string){
        const user: any = await this.userModel.findById(id)
        return user._doc;
    }

    async getAllUsers(): Promise<UserModel[]>{
        return await this.userModel.find({});
    }

    /**
     * Retrieves the users based on a list of userIDs
     * @param ids Array of strings of user objects that are to be retrieved from the User's collection
     */
    async getUsersByIdsList(ids: string[]): Promise<UserModel[]>{
        const values = await this.userModel.find({
            _id: { $in: ids}
        });

        return values;
    }

    async createDefaultGlobalAdminUser(): Promise<UserModel> {
        return await this.create({
            name: "Admin",
            email: "gms_admin@sibasi.com",
            password: bcrypt.hashSync("admin", 12)
        } as RegisterUserViewModel);
    }
}
