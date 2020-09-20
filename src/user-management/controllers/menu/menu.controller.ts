import { Controller, Get, UseGuards, Req, Res, Post, Delete, Param, Put, Body, } from '@nestjs/common';
import { Response, Request } from 'express';
import { JwtAuthenticationGuard } from 'src/user-management/authentication/guards/jwt-authentication.guard';
import { MenuService } from 'src/user-management/services/menu/menu.service';
import { MenuModel } from 'src/user-management/models/menu.model';
import { ResultViewModel } from 'src/shared/models/result-view.model';
import { UserModel } from 'src/user-management/models/user.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Menu Management')
@Controller('menu')
export class MenuController {
    
    constructor(
        private menuService: MenuService
        ) {}

    @UseGuards(JwtAuthenticationGuard)
    @Get()
    async getMenu(@Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<MenuModel[]> = await this.menuService.getMenu((req.user as UserModel)._id);
        res.status(result.status).json(result.body);
    }

    
    @UseGuards(JwtAuthenticationGuard)
    @Post()
    async postNewMenu(@Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<MenuModel[]> = await this.menuService.createManyMenuItems((req.user as UserModel)._id, req.body);
        res.status(result.status).json(result.body);
    }
    
    
    @UseGuards(JwtAuthenticationGuard)
    @Delete()
    async deleteMenu(@Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<string> = await this.menuService.deleteMenu((req.user as UserModel)._id);
        res.status(result.status).json(result.body);
    }

    

    @UseGuards(JwtAuthenticationGuard)
    @Get('adminGetAllMenu')
    async adminGetAllMenuItems(@Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<MenuModel[]> = await this.menuService.getAllMenuItems((req.user as UserModel)._id);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('menuItemUserGroup')
    async postMenuItemUserGroup(@Body() body: {itemID: string, userGroupID: string} , @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<MenuModel> = await this.menuService.addUserGroupToMenuItem((req.user as UserModel)._id, body.itemID, body.userGroupID);
        
                
        console.log("+++++++++++++++++++ HERE+++++++++++++");
        res.status(result.status).json(result.body);
    }
    
    @UseGuards(JwtAuthenticationGuard)
    @Delete('menuItemUserGroup')
    async deleteMenuItemUserGroup(@Body() body: {itemID: string, userGroupID: string} , @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<MenuModel> = await this.menuService.removeUserGroupFromMenuItem((req.user as UserModel)._id, body.itemID, body.userGroupID);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Put('menuItemPermission')
    async putMenuItemPermission(@Body() body: {itemID: string, val: boolean} , @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<boolean> = await this.menuService.isMakeMenuItemAvailableToAllUsers((req.user as UserModel)._id, body.itemID, body.val);
        res.status(result.status).json(result.body);
    }
    

    @UseGuards(JwtAuthenticationGuard)
    @Post('menuItem')
    async postMenuItem(@Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<MenuModel> = await this.menuService.addMenuItem((req.user as UserModel)._id, req.body);
        res.status(result.status).json(result.body);
    }    

    @UseGuards(JwtAuthenticationGuard)
    @Delete('menuItem/:itemID')
    async deleteMenuItem(@Param() itemID, @Req() req: Request, @Res() res: Response) {
        const result: ResultViewModel<MenuModel> = await this.menuService.removeMenuItem((req.user as UserModel)._id, itemID);
        res.status(result.status).json(result.body);
    }

}
