import { Injectable, HttpStatus, HttpCode } from '@nestjs/common';
import { MenuModel } from 'src/user-management/models/menu.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResultViewModel, ErrorViewModel } from 'src/shared/models/result-view.model';
import { UserGroupService } from '../user-group/user-group.service';
import { UserService } from '../user/user.service';
import { isNullOrUndefined } from 'util';

/**
 * Only Global Administrators should be allowed to make major changes to the menu
 */

@Injectable()
export class MenuService {

    constructor(
        @InjectModel('Menu') private menuModel: Model<MenuModel>,
        private userGroupService: UserGroupService
    ) { }

    async addMenuItem(userID: string, menuItem: {
        title?: boolean;
        name: string;
        url?: string;
        icon?: string;
    }): Promise<ResultViewModel<MenuModel>> {        
        if(!(await this.userGroupService.isUserGlobalAdmin(userID))) {
            return {
                body: {
                    error: "Not authorized to perform this action",
                    message: "Failed to add menu items"
                },
                status: HttpStatus.UNAUTHORIZED
            } as ErrorViewModel<MenuModel[]>
        }
        const menuItemToAdd = new this.menuModel(menuItem);
        await menuItemToAdd.save();
        return ({
            body: {
                result: menuItemToAdd,
                message: "Item added"
            },
            status: HttpStatus.OK
        } as ResultViewModel<MenuModel>);
    }

    async removeMenuItem(userID: string, itemID: string): Promise<ResultViewModel<MenuModel>> {        
        if(!(await this.userGroupService.isUserGlobalAdmin(userID))) {
            return {
                body: {
                    error: "Not authorized to perform this action",
                    message: "Failed to add menu items"
                },
                status: HttpStatus.UNAUTHORIZED
            } as ErrorViewModel<MenuModel[]>
        }
        return ({
            status: HttpStatus.OK,
            body: {
                result: await this.menuModel.findByIdAndRemove(itemID),
                message: "Successfully removed the item"
            }
        } as ResultViewModel<MenuModel>);
    }

    async addUserGroupToMenuItem(userID: string, itemID: string, userGroupID: string): Promise<ResultViewModel<MenuModel>> {        
        if(!(await this.userGroupService.isUserGlobalAdmin(userID))) {
            return {
                body: {
                    error: "Not authorized to perform this action",
                    message: "Failed to add menu items"
                },
                status: HttpStatus.UNAUTHORIZED
            } as ErrorViewModel<MenuModel[]>
        }
        const menuitem = await this.menuModel.findById(itemID);
        if(!isNullOrUndefined(menuitem)) {
            const index = menuitem.userGroups.findIndex(val => val == userGroupID);
            if(index  < 0) {
                return ({
                    body: {
                        result: (await menuitem.save()),
                        message: "Item added"
                    },
                    status: HttpStatus.OK
                }) as ResultViewModel<MenuModel>;
            } else {
                return ({
                    body: {
                        error: "Usergroup already exits in the Menuitem",
                        result: menuitem,
                        message: "Cannot update that menuitem as it doesn't exist"
                    },
                    status: HttpStatus.BAD_REQUEST
                } as ErrorViewModel<boolean>);
            }
        } else {
            return ({
                body: {
                    error: "Menuitem to be updated not found",
                    result: menuitem,
                    message: "Cannot update that menuitem as it doesn't exist"
                },
                status: HttpStatus.BAD_REQUEST
            } as ErrorViewModel<boolean>);
        }
    }

    async removeUserGroupFromMenuItem(userID: string, itemID: string, userGroupID: string): Promise<ResultViewModel<MenuModel>> {        
        if(!(await this.userGroupService.isUserGlobalAdmin(userID))) {
            return {
                body: {
                    error: "Not authorized to perform this action",
                    message: "Failed to add menu items"
                },
                status: HttpStatus.UNAUTHORIZED
            } as ErrorViewModel<MenuModel[]>
        }
        const menuitem = await this.menuModel.findById(itemID);
        if(menuitem) {
            const index = menuitem.userGroups.findIndex(val => val == userGroupID);
            menuitem.userGroups = menuitem.userGroups.splice(index, 1);
            await menuitem.save();
            return ({
                body: {
                    result: menuitem,
                    message: "Item removed"
                },
                status: HttpStatus.OK
            } as ResultViewModel<MenuModel>);
        } else {
            return ({
                body: {
                    error: "Menuitem to be updated not found",
                    result: menuitem,
                    message: "Cannot update that menuitem as it doesn't exist"
                },
                status: HttpStatus.BAD_REQUEST
            } as ErrorViewModel<boolean>);
        }
    }

    async isMakeMenuItemAvailableToAllUsers(userID: string, itemID: string, val: boolean): Promise<ResultViewModel<boolean>> {        
        if(!(await this.userGroupService.isUserGlobalAdmin(userID))) {
            return {
                body: {
                    error: "Not authorized to perform this action",
                    message: "Failed to add menu items"
                },
                status: HttpStatus.UNAUTHORIZED
            } as ErrorViewModel<MenuModel[]>
        }
        const menuitem = await this.menuModel.findById(itemID);
        if(menuitem) {
            menuitem.isAllowAllAuthenticatedUsers = val;
            await menuitem.save();
        } else {
            return ({
                body: {
                    error: "Menuitem to be updated not found",
                    result: menuitem,
                    message: "Cannot update that menuitem as it doesn't exist"
                },
                status: HttpStatus.BAD_REQUEST
            } as ErrorViewModel<boolean>);
        }
    }

    async getAllMenuItems(userID: string): Promise<ResultViewModel<MenuModel[]>> {
        if(!(await this.userGroupService.isUserGlobalAdmin(userID))) {
            return {
                body: {
                    error: "Not authorized to perform this action",
                    message: "Failed to add menu items"
                },
                status: HttpStatus.UNAUTHORIZED
            } as ErrorViewModel<MenuModel[]>
        }

        return { 
            status: HttpStatus.OK,
            body: {
                result: await this.menuModel.find({}),
                message: "Successfully retrieved the menu"
            }
         };
    }

    /**
     * Get's the menu
     */
    async getMenu(userID: string): Promise<ResultViewModel<MenuModel[]>> {
        let menuItems = [];       

        // Check if user is global admin       
        const isGlobalAdmin = await this.userGroupService.isUserGlobalAdmin(userID);  
        if(isGlobalAdmin) {
            menuItems = await this.menuModel.find({ }); 
        } else {
            const currentUsersGroups = (await this.userGroupService.getGroupIDsforUser(userID));
            menuItems = await this.menuModel.find({
                $or: [
                    {
                        userGroups: { $in: currentUsersGroups }
                    },
                    {
                        isAllowAllAuthenticatedUsers: true
                    }
                ]
            });
        }
        try {
            return {
                body: {
                    result: (menuItems)
                    .sort((a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))
                    .map(v => {
                        if(v.children && v.children.length < 1) {
                            return {
                                title: v.title,
                                name: v.name,
                                url: v.url,
                                icon: v.icon
                            };
                        }
                        return v;
                    }),
                    message: "Loaded menu successfully",
                    error: null
                },
                status: HttpStatus.OK
            } as ResultViewModel<MenuModel[]>;
        } catch (e) {
            return {
                body: {
                    result: null,
                    message: "Error loading menu",
                    error: e
                },
                status: HttpStatus.INTERNAL_SERVER_ERROR
            } as ErrorViewModel<any>;
        }

    }

    async createManyMenuItems(userID: string, menuItems: MenuModel[]): Promise<ResultViewModel<MenuModel[]>> {
        if(!(await this.userGroupService.isUserGlobalAdmin(userID))) {
            return {
                body: {
                    error: "Not authorized to perform this action",
                    message: "Failed to add menu items"
                },
                status: HttpStatus.UNAUTHORIZED
            } as ErrorViewModel<MenuModel[]>
        }
        try {
            const itemsToAdd: MenuModel[] = [];

            for (let index = 0; index < menuItems.length; index++) {
                const element = menuItems[index];
                itemsToAdd.push(new this.menuModel(element));
            }
            return {
                body: {
                    result: (await this.menuModel.create(itemsToAdd))
                    .sort((a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))
                    .map(v => {
                        if(v.children && v.children.length < 1) {
                            return {
                                title: v.title,
                                name: v.name,
                                url: v.url,
                                icon: v.icon
                            };
                        }
                        return v;
                    }),
                    message: "Success in creating the values"
                },
                status: HttpStatus.OK
            } as ResultViewModel<MenuModel[]>;
        } catch (e) {
            console.log(e);
            return {
                body: {
                    error: e,
                    message: "Failed to add menu items"
                },
                status: HttpStatus.INTERNAL_SERVER_ERROR
            } as ErrorViewModel<MenuModel[]>
        }

    }

    async deleteMenu(userID: string): Promise<ResultViewModel<string>> {
        if(!(await this.userGroupService.isUserGlobalAdmin(userID))) {
            return {
                body: {
                    error: "Not authorized to perform this action",
                    message: "Failed to add menu items"
                },
                status: HttpStatus.UNAUTHORIZED
            } as ErrorViewModel<MenuModel[]>
        }
        try {
            const deleteAll = await this.menuModel.deleteMany({});
            return {
                body: {
                    message: "Successfully deleted menu",
                    result: deleteAll
                },
                status: HttpStatus.OK
            } as ResultViewModel<string>;
        } catch (e) {
            return {
                body: {
                    error: "Error deleting the menu",
                },
                status: HttpStatus.INTERNAL_SERVER_ERROR
            } as ErrorViewModel<string>;
        }
    }


}
