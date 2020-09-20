import { Controller, UseGuards, Post, Body, Req, Res, Get, Delete } from '@nestjs/common';
import { JwtAuthenticationGuard } from 'src/user-management/authentication/guards/jwt-authentication.guard';
import { Request, Response } from 'express';
import { CreateClarificationModel } from 'src/clarification-management/models/create-clarification.model';
import { GetClarificationByModuleModel, EditClarificationByModuleModel } from 'src/clarification-management/models/get-clarification.model';
import { ResultViewModel } from 'src/shared/models/result-view.model';
import { ClarificationManagementService } from 'src/clarification-management/services/clarification-management/clarification-management.service';
import { ReplyToRFCModel } from 'src/clarification-management/models/clarification.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Clarification Management')
@Controller('')
export class ClarificationController {
    constructor(
        private clarificationManagementService: ClarificationManagementService
    ) {}
    @UseGuards(JwtAuthenticationGuard)
    @Post('requestClarification')
    async createClarification(@Body() createClarificationModel: CreateClarificationModel, @Req() req: Request, @Res() res: Response ){
        const result: ResultViewModel<any> = await this.clarificationManagementService.createClarification(req.user, createClarificationModel);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('requestClarification/getByUser')
    async getClarificationByUser(@Req() req: Request, @Res() res: Response){
        console.log(req.user)
        const result: ResultViewModel<any> = await this.clarificationManagementService.getClarificationByUser(req.user);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get('requestClarification/getByTypeandID')
     async getClarificationByModule(@Body() getClarificationByModule: GetClarificationByModuleModel, @Res() res: Response){

        const result: ResultViewModel<any> = await this.clarificationManagementService.getCLarificationByModel(getClarificationByModule);
        res.status(result.status).json(result.body);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('requestClarification/edit')
     async editClarificationByModule(@Body() editClarificationByModule: EditClarificationByModuleModel, @Res() res: Response){

        const result: ResultViewModel<any> = await this.clarificationManagementService.updateClarification(editClarificationByModule);
        res.status(result.status).json(result.body);
    }

    @Get('requestClarification')
    async getAllRFCs(@Res() res: Response){
        const result: ResultViewModel<any> = await this.clarificationManagementService.getAllClarifications();
        res.status(result.status).json(result.body);
    }
    /**
     * DONE
     */
    @UseGuards(JwtAuthenticationGuard)
    @Post('replyToRFC')
    async replyToRFC(@Body() replyToRFCModel: ReplyToRFCModel, @Req() req: Request, @Res() res: Response){
        /**
         * 
         * export interface ReplyToRFCModel {
                moduleItemId: string;
                reply: string;
            }
         * recieve modelItemId and UserId
         * Query DB for rfc by moduleItemId
         * append reply:ClarificationReplyModel to replies array of rfc
         */
        const result = await this.clarificationManagementService.addReplyToRFC(req.user, replyToRFCModel);
        res.status(result.status).json(result.body);
    }
     /**
     * DONE
     */
    @UseGuards(JwtAuthenticationGuard)
    @Delete('repliesToRFC')
    /**
     * instruct DB to delete all RFCs
     */
    async deleteRepliesToRFC(@Body() deleteToRFC, @Req() req: Request, @Res()res: Response){
        const result = await this.clarificationManagementService.deleteRepliesToRFC(deleteToRFC.moduleItemId);
        res.status(result.status).json(result.body);
    }
    @UseGuards(JwtAuthenticationGuard) 
    @Post('editReplyToRFC')
    /**
     * DOES NOT UPDATE, REMOVES REPLY INSTEAD
     */
    async updateRepliesToRFC(@Body() updateReplyToRFCModel, @Req() req: Request, @Res()res: Response){
        /**
         * 
         * fetch RFC by id, in some places referred to as moduleItemId
         * for each element of the replies array, find the one whose id matches the submitted one
         * update its reply to the one submitted
         hence request body = {
             "moduleItemId" = "",
             "replyId" = "",
             "replyUpdate" = ""
        } 
         */
        const result = await this.clarificationManagementService.updateReplyToRFC(updateReplyToRFCModel);
        res.status(result.status).json(result.body);
    }
    @UseGuards(JwtAuthenticationGuard) 
    @Post('repliesToRFC/publish')
    async publishRepliesToRFC(@Body() publishRepliesToRFCObject, @Req() req: Request, @Res()res: Response){
        /**
         * recieve modelItemId
         * Query DB for rfc by moduleItemId
         * Update boolean in replies array for specific response search by id isPublishedRFC to true
         * Update rfc on DB
         * 
         * samople Object 
         
    {
        "moduleItemId": "5ef7b6e07580780a80175cfc",
        "replyId": "5f0439cf35e7be2a48527308"
    }
         */
        const result = await this.clarificationManagementService.publishRepliesToRFC(publishRepliesToRFCObject)
        res.status(result.status).json(result.body);

    }

    @UseGuards(JwtAuthenticationGuard) 
    @Post('requestClarification/publish')
    async publishRFC(@Body() publishRFCObject, @Req() req: Request, @Res()res: Response){
        /**
         * recieve modelItemId
         * Query DB for rfc by moduleItemId
         * Update boolean isPublishedRFC to true
         * Update rfc on DB
         * 
         * sample Object
    {
        "moduleItemId": "5ef7b6e07580780a80175cfc"
    }
         */
        const result = await this.clarificationManagementService.publishRFC(publishRFCObject);
        res.status(result.status).json(result.body);
    }


}
