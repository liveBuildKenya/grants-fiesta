import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ActionPermissionTemplateModel } from 'src/application-management/models/application-template/action-permission-template.model';
import { Model } from 'mongoose';
import { CreateActionPermissionTemplateViewModel } from 'src/application-management/models/application-template/create-action-permission-template-view.model';

@Injectable()
export class ActionPermissionService {
    constructor(@InjectModel('ActionPermission') private actionPermissionTemplateModel: Model<ActionPermissionTemplateModel>) {}

    async createActionPermission(createActionPermissionTemplateViewModel: CreateActionPermissionTemplateViewModel) {
        createActionPermissionTemplateViewModel.dateCreated = new Date(Date.now());
        return new this.actionPermissionTemplateModel(createActionPermissionTemplateViewModel);
    }
}
