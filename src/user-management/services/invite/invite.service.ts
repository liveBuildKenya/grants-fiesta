import { Injectable } from '@nestjs/common';
import { InviteModel } from 'src/user-management/models/invite.model';
import { Model } from 'mongoose';
import { InviteUserViewModel } from 'src/user-management/models/invite-users-view.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class InviteService {
    constructor(@InjectModel('Invite') private inviteModel: Model<InviteModel>) {}

    async create(inviteViewModel: InviteUserViewModel) {
        const newInvite = new this.inviteModel(inviteViewModel);
        return await newInvite.save();
    }

    async update(invite: any) {
        await this.inviteModel.updateOne({_id: invite._id}, invite);
        return await this.getInviteByEmail(invite.email);
    }

    async getInviteByEmail(email: string) {
        let user: any = await this.inviteModel.find({ email: email });
        user = user.map((value) => {
            return {
                _id: value._id,
                email: value.email,
                status: value.status,
                invitedBy: value.invitedBy,
                dateCreated: value.dateCreated,
                dateUpdated: value.dateUpdated
            }
        });
        return user[0];
    }

    async getInviteById(id: string){
        const value = await this.inviteModel.findById(id);
        return {
            _id: value._id,
            email: value.email,
            status: value.status,
            invitedBy: value.invitedBy,
            dateCreated: value.dateCreated,
            dateUpdated: value.dateUpdated
        }; 
    }
}
