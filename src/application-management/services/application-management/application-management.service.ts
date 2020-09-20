import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ApplicationService } from '../application/application.service';
import { UserService } from 'src/user-management/services/user/user.service';
import { FileService } from 'src/file-management/services/file/file.service';
import { NotificationManagementService } from 'src/notification-management/services/notification-management/notification-management.service';
import { CreateRequestForApplicationTemplateViewModel } from 'src/application-management/models/application-template/create-request-for-application-template-view.model';
import { ApplicationTemplateService } from '../application-template/application-template.service';
import { CreateApplicationStageTemplateViewModel } from 'src/application-management/models/application-template/create-application-stage-template-view.model';
import { ApplicationStageService } from '../application-stage/application-stage.service';
import { CreateEvaluationCriteriaTemplateViewModel } from 'src/application-management/models/application-template/create-evaluation-criteria-template-view.model';
import { CreateCriteriaQuestionTemplateViewModel } from 'src/application-management/models/application-template/create-criteria-questions-template-view.model';
import { EvaluationCriteriaService } from '../evaluation-criteria/evaluation-criteria.service';
import { CriteriaQuestionService } from '../criteria-question/criteria-question.service';
import { CreateApplicationRequestViewModel } from 'src/application-management/models/application-request/create-application-request-view.model';
import { ApplicationRequestService } from '../application-request/application-request.service';
import { CreateActionPermissionTemplateViewModel } from 'src/application-management/models/application-template/create-action-permission-template-view.model';
import { ActionPermissionService } from '../action-permission/action-permission.service';
import { UpdateApplicationTemplateViewModel } from 'src/application-management/models/application-template/update-application-template-view.model';
import { UpdateApplicationStageTemplateViewModel } from 'src/application-management/models/application-template/update-application-stage-template-view.model';
import { CreateApplicationFormTemplateViewModel } from 'src/application-management/models/application-template/create-application-template-form-view.model';
import { ApplicationFormTemplateService } from '../application-form-template/application-form-template.service';
import { UpdateApplicationFormTemplateViewModel } from 'src/application-management/models/application-template/update-application-form-template-view.model';
import { UpdateApplicationRequestViewModel } from 'src/application-management/models/application-request/update-application-request-view.model';
import { ApplicationRequestInterestViewModel } from 'src/application-management/models/application-request/express-application-request-interest-view.model';
import { SubmitApplicationViewModel } from 'src/application-management/models/application/submit-application-view.model';
import { UploadedFileService } from '../uploaded-file/uploaded-file.service';
import { UploadApplicationFileViewModel } from 'src/file-management/models/upload-application-file-view.model';
import { CreateTemplateCustomPropertyViewModel } from 'src/application-management/models/application-template/create-template-custom-properties-view.model';
import { TemplateCustomPropertiesService } from '../template-custom-properties/template-custom-properties.service';
import { UpdateTemplateCustomPropertyViewModel } from 'src/application-management/models/application-template/update-template-custom-property-view.model';
import { FormResponseViewModel } from 'src/application-management/models/application/form-response-view.model';
import { RequestForApplicationFormResponseService } from '../request-for-application-form-response/request-for-application-form-response.service';
import { ResultViewModel, ErrorViewModel } from 'src/shared/models/result-view.model';
import { ApplicationRequestModel } from 'src/application-management/models/application-request/application-request.model';
import { ApplicationModel } from 'src/application-management/models/application/application.model';
import { UserModel } from 'src/user-management/models/user.model';
import { MailingService } from 'src/mailing-management/services/mailing/mailing.service';
import { ConfigService } from '@nestjs/config';
import { UploadRequestForApplicationViewModel } from 'src/application-management/models/application-request/upload-request-for-application-view.model';
import { NotificationStatus } from 'src/notification-management/enums/notification-status.enum';
import { isNullOrUndefined } from 'util';
import * as lodash from 'lodash';
import { DeleteApplicationFormTemplateViewModel } from 'src/application-management/models/application-template/delete-application-form-template-view.model';
import { DeleteRequestForApplicationAttachmentViewModel } from 'src/application-management/models/application-request/delete-request-for-application-attachment-view.model';
import { DeleteApplicationUploadViewModel } from 'src/application-management/models/application/delete-application-upload-view.model';
import * as moment from 'moment';
import { ApplicationSearchFilterViewModel } from 'src/application-management/models/application/application-search-filter-view.model';
import { CreateEvaluationSubCriteriaTemplateViewModel } from 'src/application-management/models/application-template/create-evaluation-sub-criteria-template-view.model';
import { EvaluationSubCriteriaService } from '../evaluation-sub-criteria/evaluation-sub-criteria.service';
import { UpdateCriteriaQuestionTemplateViewModel } from 'src/application-management/models/application-template/update-criteria-question-template-view.model';
import { UpdateEvaluationCriteriaTemplateViewModel } from 'src/application-management/models/application-template/update-evaluation-criteria-template-view.model';
import { UpdateEvaluationSubCriteriaTemplateViewModel } from 'src/application-management/models/application-template/update-evaluation-sub-criteria-template-view.model';
import { DeleteCriteriaQuestionTemplateViewModel } from 'src/application-management/models/application-template/delete-criteria-question-template-view.model';
import { ObjectId } from 'mongodb';
import { DeleteEvaluationSubCriteriaTemplateViewModel } from 'src/application-management/models/application-template/delete-evaluation-sub-criteria-template-view.model';
import { DeleteEvaluationCriteriaTemplateViewModel } from 'src/application-management/models/application-template/delete-evaluation-criteria-template-view.model';
import { MoveApplicationToNextStage } from 'src/application-management/models/application/move-application-to-next-stage-view.model';
import { AwardApplicationsGrantViewModel } from 'src/application-management/models/application/award-applications-grant-view.model';
import { CreateReportingTemplateViewModel } from 'src/application-management/models/application-template/create-reporting-template-view.model';
import { ReportingTemplateService } from '../reporting-template/reporting-template.service';
import { DeleteReportingTemplateViewModel } from 'src/application-management/models/application-template/delete-reporting-template-view.model';
import { ApproveApplicationsGrantViewModel } from 'src/application-management/models/application/approve-applications-grant-view.model';

@Injectable()
export class ApplicationManagementService {
    constructor(private configService: ConfigService,
        private mailingService: MailingService,
        private applicationTemplateService: ApplicationTemplateService,
        private templateCustomPropertiesService: TemplateCustomPropertiesService,
        private applicationFormTemplateService: ApplicationFormTemplateService,
        private applicationStageService: ApplicationStageService,
        private actionPermissionService: ActionPermissionService,
        private applicationService: ApplicationService,
        private requestForApplicationFormResponseService: RequestForApplicationFormResponseService,
        private evaluationCriteriaService: EvaluationCriteriaService,
        private evaluationSubCriteriaService: EvaluationSubCriteriaService,
        private criteriaQuestionService: CriteriaQuestionService,
        private applicationRequestService: ApplicationRequestService,
        private fileService: FileService,
        private uploadedFileService: UploadedFileService,
        private userService: UserService,
        private notificationManagementService: NotificationManagementService,
        private reportingTemplateService: ReportingTemplateService) { }

    async saveApplicationForRequestForApplication(currentUser: any, applicationViewModel: ApplicationModel) {
        if (!applicationViewModel.requestForApplication) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application not created: requestForApplication not defined',
                    result: applicationViewModel,
                    error: 'requestForApplication not defined'
                }
            };
        }

        if ((await this.applicationRequestService.getRequestForApplicationById(applicationViewModel.requestForApplication))) {
            applicationViewModel.user = currentUser._id;

            return {
                status: HttpStatus.OK,
                body: {
                    message: 'Application made successfully',
                    result: (await this.applicationService.createApplication(applicationViewModel)),
                }
            };
        } else {
            return {
                status: HttpStatus.METHOD_NOT_ALLOWED,
                body: {
                    message: 'Application not made',
                    result: 'RFA does not exist'
                }
            }
        }
    }

    async canSubmitApplication(currentUser, applicationId: string) {
        const application = await this.applicationService.getApplicationById(applicationId);
        const requestForApplication = await this.applicationRequestService.getRequestForApplicationById(application.requestForApplication);
        const applicationTemplate = await this.applicationTemplateService.getApplicationTemplateById(requestForApplication.applicationTemplateId[0]);

        const filesUploaded = requestForApplication.filesToUpload.map((fileType) => {
            return {
                fileType: fileType,
                status: application.uploadedFiles.find(file => file.name == fileType) ? true : false
            };
        });

        const formsResult = applicationTemplate.forms.map((form) => {
            return {
                formId: form._id, 
                formName: form.title, 
                status: application.requestForApplicationFormsResponse.find(response => response.requestForApplicationFormId == form.id)? true: false
            };
        });

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Can submit application response',
                result: { formsResult: formsResult, filesUploaded: filesUploaded }
            }
        };
    }    

    async saveFormResponse(currentUser, applicationId: string, formResponseViewModel: FormResponseViewModel) {
        if (!formResponseViewModel.requestForApplicationFormId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Response not  saved: requestForApplicationFormId not defined',
                    result: formResponseViewModel,
                    error: 'requestForApplicationFormId not defined'
                }
            };
        }

        if (!formResponseViewModel.requestForApplicationFormResponse) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Response not saved: requestForApplicationFormResponse not defined',
                    result: formResponseViewModel,
                    error: 'requestForApplicationFormResponse not defined'
                }
            };
        }

        const application = await this.applicationService.getApplicationById(applicationId);
        const formResponseExists = await this.requestForApplicationFormResponseService.checkFormResponseExists(application, formResponseViewModel);
        if (formResponseExists) {
            return {
                status: HttpStatus.METHOD_NOT_ALLOWED,
                body: {
                    message: 'Application form response already exists',
                    result: formResponseExists
                }
            }
        }
        else {
            const newRequestForApplicationForm = await this.requestForApplicationFormResponseService.createRequestForApplicationFormResponse(formResponseViewModel);
            application.requestForApplicationFormsResponse.push(newRequestForApplicationForm);
            await this.applicationService.update(application);
            return {
                status: HttpStatus.OK,
                body: {
                    message: 'Application file response saved',
                    result: (await this.applicationService.getApplicationById(applicationId))
                }
            };
        }
    }

    async uploadApplicationFile(currentUser, uploadedFileId: string, uploadApplicationFileViewModel: UploadApplicationFileViewModel): Promise<ResultViewModel<any>> {
        if (!uploadApplicationFileViewModel.applicationId) {
            await this.fileService.deleteFile(uploadedFileId);
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'File not uploaded:applicationId not defined',
                    result: uploadApplicationFileViewModel,
                    error: 'applicationId not defined'
                }
            };
        }

        if (!uploadApplicationFileViewModel.name) {
            await this.fileService.deleteFile(uploadedFileId);
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'File not uploaded:name not defined',
                    result: uploadApplicationFileViewModel,
                    error: 'name not defined'
                }
            };
        }

        try {
            const application: any = await this.applicationService.getApplicationById(uploadApplicationFileViewModel.applicationId);
            const newFile = await this.uploadedFileService.createUploadedFile({
                fileId: uploadedFileId,
                name: uploadApplicationFileViewModel.name,
                dateCreated: new Date(Date.now())
            });

            application.uploadedFiles.push(newFile)

            await this.applicationService.update(application);

            return {
                status: HttpStatus.OK,
                body: {
                    message: 'Application file uploaded',
                    result: (await this.applicationService.getApplicationById(uploadApplicationFileViewModel.applicationId))
                }
            }
        } catch (e) {
            return ({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                body: {
                    message: "An error occured while uploading the file",
                    error: e,
                }
            }) as ErrorViewModel<any>;
        }
    }

    async deleteUploadedApplicationFile(deleteApplicationUploadViewModel: DeleteApplicationUploadViewModel) {
        const application = await this.applicationService.getApplicationById(deleteApplicationUploadViewModel.applicationId);
        lodash.remove(application.uploadedFiles, (uploadedFile) => {
            return uploadedFile.fileId == deleteApplicationUploadViewModel.fileId;
        });

        await this.applicationService.update(application);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Uploaded file deleted',
                result: {
                    fileId: deleteApplicationUploadViewModel.fileId,
                    application: (await this.applicationService.getApplicationById(deleteApplicationUploadViewModel.applicationId))
                }
            }
        }
    }    

    async getFundApplications(currentUser: any) {
        return {
            status: HttpStatus.OK,
            body: {
                message: "Applications",
                result: (await this.applicationService.getApplications())
            }
        }
    }

    async createRequestForApplicationTemplate(currentUser, createRequestForApplicationTemplateViewModel: CreateRequestForApplicationTemplateViewModel) {
        if (!createRequestForApplicationTemplateViewModel.templateType) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: "Application template not created",
                    result: createRequestForApplicationTemplateViewModel,
                    error: 'templateType not defined'
                }
            };
        }

        return {
            status: HttpStatus.OK,
            body: {
                message: "Application template created successfully",
                result: (await this.applicationTemplateService.createRequestForApplicationTemplate(createRequestForApplicationTemplateViewModel))
            }
        };
    }

    async updateApplicationTemplate(currentUser, applicationTemplateId: string, updateApplicationTemplateViewModel: UpdateApplicationTemplateViewModel) {
        const applicationTemplate = await this.applicationTemplateService.getApplicationTemplateById(applicationTemplateId);
        if (updateApplicationTemplateViewModel.templateType) {
            applicationTemplate.templateType = updateApplicationTemplateViewModel.templateType;
        }

        if (updateApplicationTemplateViewModel.filesToUpload.length > 0) {
            applicationTemplate.filesToUpload = updateApplicationTemplateViewModel.filesToUpload;
        }

        await this.applicationTemplateService.updateApplicationTemplate(applicationTemplate);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Application Template updated',
                result: (await this.applicationTemplateService.getApplicationTemplateById(applicationTemplateId))
            }
        };
    }

    async deleteApplicationFormTemplate(applicationFormTemplateId: string, deleteApplicationFormTemplateViewModel: DeleteApplicationFormTemplateViewModel): Promise<ResultViewModel<any> | PromiseLike<ResultViewModel<any>>> {
        const applicationTemplate = await this.applicationTemplateService.getApplicationTemplateById(deleteApplicationFormTemplateViewModel.applicationTemplateId);           
        lodash.remove(applicationTemplate.forms, (form) => {
            return form._id == applicationFormTemplateId;
        });

        await this.applicationTemplateService.updateApplicationTemplate(applicationTemplate);
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Deleted Request for application form template',
                result: (await this.applicationTemplateService.getApplicationTemplateById(deleteApplicationFormTemplateViewModel.applicationTemplateId))
            }
        }
    }

    async getApplicationTemplateById(applicationTemplateId: string) {
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Application template',
                result: (await this.applicationTemplateService.getApplicationTemplateById(applicationTemplateId))
            }
        }
    }

    async deleteApplicationTemplate(currentUser, applicationTemplateId: string) {        
        // Prevent deletion of an RFA Template if there is an RFA that is dependent on it
        const rfasForTemplate = await this.applicationRequestService.getRFAsForATemplateByID(applicationTemplateId);

        if(!isNullOrUndefined(rfasForTemplate)) {
            throw new HttpException({
                message: "Please delete all Requests/Calls for Applications before deleting this RFA Template.",
                status: HttpStatus.FORBIDDEN,
                error: "The following rfas exist for the applicaiton: " + rfasForTemplate.toString(),
              }, HttpStatus.FORBIDDEN);
        }
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Application Template deleted',
                result: (await this.applicationTemplateService.deleteApplicationTemplate(applicationTemplateId))
            }
        };
    }

    async createApplicationFormTemplate(currentUser, createApplicationFormTemplateViewModel: CreateApplicationFormTemplateViewModel) {
        if (!createApplicationFormTemplateViewModel.applicationTemplateId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application form template not created: applicationTemplateId not defined',
                    result: createApplicationFormTemplateViewModel,
                    error: 'applicationTemplateId not defined'
                }
            };
        }

        if (!createApplicationFormTemplateViewModel.title) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application form template not created: title not defined',
                    result: createApplicationFormTemplateViewModel,
                    error: 'title not defined'
                }
            };
        }

        const applicationTemplate = await this.applicationTemplateService.getApplicationTemplateById(createApplicationFormTemplateViewModel.applicationTemplateId);
        const newApplicationFormTemplate = await this.applicationFormTemplateService.createApplicationFormTemplate(createApplicationFormTemplateViewModel);
        applicationTemplate.forms.push(newApplicationFormTemplate);

        await this.applicationTemplateService.updateApplicationTemplate(applicationTemplate);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Application form template created successfully',
                result: (await this.applicationTemplateService.getApplicationTemplateById(createApplicationFormTemplateViewModel.applicationTemplateId))
            }
        };

    }

    async updateApplicationFormTemplate(currentUser, applicationFormTemplateId: string, updateApplicationFormTemplateViewModel: UpdateApplicationFormTemplateViewModel): Promise<any> {
        if (!updateApplicationFormTemplateViewModel.applicationTemplateId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application form template not updated: applicationTemplateId not defined',
                    result: updateApplicationFormTemplateViewModel,
                    error: 'applicationTemplateId not defined'
                }
            };
        }

        const applicationTemplate: any = await this.applicationTemplateService.getApplicationTemplateById(updateApplicationFormTemplateViewModel.applicationTemplateId);
        const applicationFormTemplate = applicationTemplate.forms.id(applicationFormTemplateId);

        if (updateApplicationFormTemplateViewModel.title) {
            applicationFormTemplate.title = updateApplicationFormTemplateViewModel.title;
        }


        if (!isNullOrUndefined(updateApplicationFormTemplateViewModel.displayOrder)) {
            applicationFormTemplate.displayOrder = updateApplicationFormTemplateViewModel.displayOrder;
            
        }

        if (!isNullOrUndefined(updateApplicationFormTemplateViewModel.requestForApplicationFormFields)) {
            applicationFormTemplate.requestForApplicationFormFields = updateApplicationFormTemplateViewModel.requestForApplicationFormFields;
        }

        if (!isNullOrUndefined(updateApplicationFormTemplateViewModel.isSummary)) {
            applicationFormTemplate.isSummary = updateApplicationFormTemplateViewModel.isSummary;
        }

        await this.applicationTemplateService.updateApplicationTemplate(applicationTemplate);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Application form template updated',
                result: (await this.applicationTemplateService.getApplicationTemplateById(updateApplicationFormTemplateViewModel.applicationTemplateId))
            }
        };
    }

    async createApplicationStageTemplate(currentUser, createApplicationStageTemplateViewModel: CreateApplicationStageTemplateViewModel) {
        if (!createApplicationStageTemplateViewModel.applicationTemplateId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application stage not created',
                    result: createApplicationStageTemplateViewModel,
                    error: 'applicationTemplateId not defined'
                }
            };
        }

        if (!createApplicationStageTemplateViewModel.name) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application stage not created',
                    result: createApplicationStageTemplateViewModel,
                    error: 'name not defined'
                }
            };
        }

        if (!createApplicationStageTemplateViewModel.stageType) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application stage not created',
                    result: createApplicationStageTemplateViewModel,
                    error: 'stageType not defined'
                }
            };
        }

        const applicationTemplate = await this.applicationTemplateService.getApplicationTemplateById(createApplicationStageTemplateViewModel.applicationTemplateId);
        const newApplicationStage = await this.applicationStageService.createApplicationStage(createApplicationStageTemplateViewModel);
        applicationTemplate.stages.push(newApplicationStage);

        await this.applicationTemplateService.updateApplicationTemplate(applicationTemplate);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Application stage template created successfully',
                result: (await this.applicationTemplateService.getApplicationTemplateById(createApplicationStageTemplateViewModel.applicationTemplateId))
            }
        }
    }

    async updateApplicationStageTemplate(currentUser, applicationStageTemplateId: string, updateApplicationStageTemplateViewModel: UpdateApplicationStageTemplateViewModel) {
        if (!updateApplicationStageTemplateViewModel.applicationTemplateId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application Stage template not updated: applicationTemplateId not defined',
                    result: updateApplicationStageTemplateViewModel,
                    error: 'applicationTemplateId not defined'
                }
            };
        }

        const applicationTemplate: any = await this.applicationTemplateService.getApplicationTemplateById(updateApplicationStageTemplateViewModel.applicationTemplateId);
        const applicationStage: any = applicationTemplate.stages.id(applicationStageTemplateId);

        if (updateApplicationStageTemplateViewModel.categorizationField) {
            applicationStage.categorizationField = updateApplicationStageTemplateViewModel.categorizationField;
        }

        if (updateApplicationStageTemplateViewModel.name) {
            applicationStage.name = updateApplicationStageTemplateViewModel.name;
        }

        if (updateApplicationStageTemplateViewModel.displayOrder) {
            applicationStage.displayOrder = updateApplicationStageTemplateViewModel.displayOrder;
        }

        if (updateApplicationStageTemplateViewModel.targetDuration) {
            applicationStage.targetDuration = updateApplicationStageTemplateViewModel.targetDuration;
        }

        if (updateApplicationStageTemplateViewModel.durationType) {
            applicationStage.durationType = updateApplicationStageTemplateViewModel.durationType;
        }

        if (updateApplicationStageTemplateViewModel.stageType) {
            applicationStage.stageType = updateApplicationStageTemplateViewModel.stageType
        }

        await this.applicationTemplateService.updateApplicationTemplate(applicationTemplate);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Application stage updated successfully',
                result: (await this.applicationTemplateService.getApplicationTemplateById(updateApplicationStageTemplateViewModel.applicationTemplateId))
            }
        }
    }

    async createTemplateCustomProperties(currentUser, createTemplateCustomPropertiesViewModel: CreateTemplateCustomPropertyViewModel) {
        if (!createTemplateCustomPropertiesViewModel.applicationTemplateId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Template custom properties not added: applicationTemplateId not defined',
                    result: createTemplateCustomPropertiesViewModel,
                    error: 'applicationTemplateId not defined'
                }
            };
        }

        if (!createTemplateCustomPropertiesViewModel.name) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Template custom properties not added: name not defined',
                    result: createTemplateCustomPropertiesViewModel,
                    error: 'name not defined'
                }
            };
        }

        if (!createTemplateCustomPropertiesViewModel.possibleValues || createTemplateCustomPropertiesViewModel.possibleValues.length == 0) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Template custom properties not added: possibleValues not defined',
                    result: createTemplateCustomPropertiesViewModel,
                    error: 'possibleValues not defined'
                }
            };
        }

        const applicationTemplate = await this.applicationTemplateService.getApplicationTemplateById(createTemplateCustomPropertiesViewModel.applicationTemplateId);
        const newTemplateCustomProperties = await this.templateCustomPropertiesService.createTemplateCustomProperties(createTemplateCustomPropertiesViewModel);
        applicationTemplate.customProperties.push(newTemplateCustomProperties);

        await this.applicationTemplateService.updateApplicationTemplate(applicationTemplate);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Template updated',
                result: (await this.applicationTemplateService.getApplicationTemplateById(createTemplateCustomPropertiesViewModel.applicationTemplateId))
            }
        };
    }

    async updateTemplateCustomProperties(currentUser, customPropertyId, updateTemplateCustomPropertyViewModel: UpdateTemplateCustomPropertyViewModel) {
        if (!updateTemplateCustomPropertyViewModel.applicationTemplateId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Custom properties not updated: applicationTemplateId not defined',
                    result: updateTemplateCustomPropertyViewModel,
                    error: 'applicationTemplateId not defined'
                }
            };
        }

        const applicationTemplate: any = await this.applicationTemplateService.getApplicationTemplateById(updateTemplateCustomPropertyViewModel.applicationTemplateId);
        const customProperty = applicationTemplate.customProperties.id(customPropertyId);
        if (updateTemplateCustomPropertyViewModel.name) {
            customProperty.name = updateTemplateCustomPropertyViewModel.name;
        }
        if (updateTemplateCustomPropertyViewModel.possibleValues) {
            customProperty.possibleValues = updateTemplateCustomPropertyViewModel.possibleValues;
        }

        await this.applicationTemplateService.updateApplicationTemplate(applicationTemplate);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Application template service',
                result: (await this.applicationTemplateService.getApplicationTemplateById(updateTemplateCustomPropertyViewModel.applicationTemplateId))
            }
        };
    }

    async createEvaluationCriteria(currentUser, createEvaluationCriteriaTemplateViewModel: CreateEvaluationCriteriaTemplateViewModel) {
        if (!createEvaluationCriteriaTemplateViewModel.applicationTemplateId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria not created',
                    result: createEvaluationCriteriaTemplateViewModel,
                    error: 'applicationTemplateId not defined'
                }
            };
        }

        if (!createEvaluationCriteriaTemplateViewModel.applicationStageId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria not created',
                    result: createEvaluationCriteriaTemplateViewModel,
                    error: 'applicationStageId not defined'
                }
            };
        }

        const applicationTemplate: any = await this.applicationTemplateService.getApplicationTemplateById(createEvaluationCriteriaTemplateViewModel.applicationTemplateId);
        const evaluationCriteriaModel = await this.evaluationCriteriaService.createEvaluationCriteria(createEvaluationCriteriaTemplateViewModel);
        (applicationTemplate.stages.id(createEvaluationCriteriaTemplateViewModel.applicationStageId)).evaluationCriteria.push(evaluationCriteriaModel);

        await this.applicationTemplateService.updateApplicationTemplate(applicationTemplate);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Evaluation Criteria created successfully',
                result: (await this.applicationTemplateService.getApplicationTemplateById(createEvaluationCriteriaTemplateViewModel.applicationTemplateId))
            }
        }
    }

    async updateEvaluationCriteria(criteriaId: string, updateEvaluationCriteriaTemplateViewModel: UpdateEvaluationCriteriaTemplateViewModel) {
        if (!updateEvaluationCriteriaTemplateViewModel.applicationTemplateId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria not updated',
                    result: updateEvaluationCriteriaTemplateViewModel,
                    error: 'applicationTemplateId not defined'
                }
            };
        }

        if (!updateEvaluationCriteriaTemplateViewModel.applicationStageId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria not updated',
                    result: updateEvaluationCriteriaTemplateViewModel,
                    error: 'applicationStageId not defined'
                }
            };
        }

        const applicationTemplate: any = await this.applicationTemplateService.getApplicationTemplateById(updateEvaluationCriteriaTemplateViewModel.applicationTemplateId);
        const applicationTemplateStage = applicationTemplate.stages.id(updateEvaluationCriteriaTemplateViewModel.applicationStageId);
        const evaluationCriteria = applicationTemplateStage.evaluationCriteria.id(criteriaId);

        if (!isNullOrUndefined(updateEvaluationCriteriaTemplateViewModel.displayOrder)) {
            evaluationCriteria.displayOrder = updateEvaluationCriteriaTemplateViewModel.displayOrder
        }

        if (!isNullOrUndefined(updateEvaluationCriteriaTemplateViewModel.name)) {
            evaluationCriteria.name = updateEvaluationCriteriaTemplateViewModel.name;
        }

        await this.applicationTemplateService.updateApplicationTemplate(applicationTemplate);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Evaluation Criteria created successfully',
                result: (await this.applicationTemplateService.getApplicationTemplateById(updateEvaluationCriteriaTemplateViewModel.applicationTemplateId))
            }
        }
    }

    async deleteEvaluationCriteria(criteriaId: string, deleteEvaluationCriteriaTemplateViewModel: DeleteEvaluationCriteriaTemplateViewModel) {
        if (!deleteEvaluationCriteriaTemplateViewModel.applicationTemplateId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria not deleted',
                    result: deleteEvaluationCriteriaTemplateViewModel,
                    error: 'applicationTemplateId not defined'
                }
            };
        }

        if (!deleteEvaluationCriteriaTemplateViewModel.applicationStageId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria not deleted',
                    result: deleteEvaluationCriteriaTemplateViewModel,
                    error: 'applicationStageId not defined'
                }
            };
        }

        const applicationTemplate: any = await this.applicationTemplateService.getApplicationTemplateById(deleteEvaluationCriteriaTemplateViewModel.applicationTemplateId);
        const applicationTemplateStage = applicationTemplate.stages.id(deleteEvaluationCriteriaTemplateViewModel.applicationStageId);
        
        lodash.remove(applicationTemplateStage.evaluationCriteria, (evaluationCriteria: any) => {
            return lodash.find(evaluationCriteria, { _id: new ObjectId(criteriaId) });
        });

        await this.applicationTemplateService.updateApplicationTemplate(applicationTemplate);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Evaluation Criteria created successfully',
                result: (await this.applicationTemplateService.getApplicationTemplateById(deleteEvaluationCriteriaTemplateViewModel.applicationTemplateId))
            }
        }
    }

    async createEvaluationSubCriteria(currentUser, createEvaluationSubCriteriaTemplateViewModel: CreateEvaluationSubCriteriaTemplateViewModel) {
        if (!createEvaluationSubCriteriaTemplateViewModel.applicationTemplateId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria not created',
                    result: createEvaluationSubCriteriaTemplateViewModel,
                    error: 'applicationTemplateId not defined'
                }
            };
        }

        if (!createEvaluationSubCriteriaTemplateViewModel.applicationStageId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria not created',
                    result: createEvaluationSubCriteriaTemplateViewModel,
                    error: 'applicationStageId not defined'
                }
            };
        }

        if (!createEvaluationSubCriteriaTemplateViewModel.evaluationCriteriaId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria not created',
                    result: createEvaluationSubCriteriaTemplateViewModel,
                    error: 'evaluationCriteriaId not defined'
                }
            };
        }

        const applicationTemplate: any = await this.applicationTemplateService.getApplicationTemplateById(createEvaluationSubCriteriaTemplateViewModel.applicationTemplateId);
        const applicationTemplateStage = applicationTemplate.stages.id(createEvaluationSubCriteriaTemplateViewModel.applicationStageId);
        const evaluationCriteria = applicationTemplateStage.evaluationCriteria.id(createEvaluationSubCriteriaTemplateViewModel.evaluationCriteriaId);
        evaluationCriteria.subCriteria.push((await this.evaluationSubCriteriaService.createEvaluationSubCriteria(createEvaluationSubCriteriaTemplateViewModel)));

        await this.applicationTemplateService.updateApplicationTemplate(applicationTemplate);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Evaluation Criteria created successfully',
                result: (await this.applicationTemplateService.getApplicationTemplateById(createEvaluationSubCriteriaTemplateViewModel.applicationTemplateId))
            }
        }
    }

    async updateEvaluationSubCriteria(subCriteriaId: string, updateEvaluationSubCriteriaTemplateViewModel: UpdateEvaluationSubCriteriaTemplateViewModel) {
        if (!updateEvaluationSubCriteriaTemplateViewModel.applicationTemplateId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria not updated',
                    result: updateEvaluationSubCriteriaTemplateViewModel,
                    error: 'applicationTemplateId not defined'
                }
            };
        }

        if (!updateEvaluationSubCriteriaTemplateViewModel.applicationStageId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria not updated',
                    result: updateEvaluationSubCriteriaTemplateViewModel,
                    error: 'applicationStageId not defined'
                }
            };
        }

        if (!updateEvaluationSubCriteriaTemplateViewModel.evaluationCriteriaId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria not updated',
                    result: updateEvaluationSubCriteriaTemplateViewModel,
                    error: 'evaluationCriteriaId not defined'
                }
            };
        }

        const applicationTemplate: any = await this.applicationTemplateService.getApplicationTemplateById(updateEvaluationSubCriteriaTemplateViewModel.applicationTemplateId);
        const applicationTemplateStage = applicationTemplate.stages.id(updateEvaluationSubCriteriaTemplateViewModel.applicationStageId);
        const evaluationCriteria = applicationTemplateStage.evaluationCriteria.id(updateEvaluationSubCriteriaTemplateViewModel.evaluationCriteriaId);
        const subCriteria = evaluationCriteria.subCriteria.id(subCriteriaId);

        if (!isNullOrUndefined(updateEvaluationSubCriteriaTemplateViewModel.name)) {
            subCriteria.name = updateEvaluationSubCriteriaTemplateViewModel.name;
        }

        if (!isNullOrUndefined(updateEvaluationSubCriteriaTemplateViewModel.isCalculated)) {
            subCriteria.isCalculated = updateEvaluationSubCriteriaTemplateViewModel.isCalculated;
        }

        if(!isNullOrUndefined(updateEvaluationSubCriteriaTemplateViewModel.displayOrder)) {
            subCriteria.displayOrder = updateEvaluationSubCriteriaTemplateViewModel.displayOrder;
        }

        if (!isNullOrUndefined(updateEvaluationSubCriteriaTemplateViewModel.allowComments)) {
            subCriteria.allowComments = updateEvaluationSubCriteriaTemplateViewModel.allowComments;
        }

        await this.applicationTemplateService.updateApplicationTemplate(applicationTemplate);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Evaluation Criteria created successfully',
                result: (await this.applicationTemplateService.getApplicationTemplateById(updateEvaluationSubCriteriaTemplateViewModel.applicationTemplateId))
            }
        }
    }

    async deleteEvaluationSubCriteria(subCriteriaId: string, deleteEvaluationSubCriteriaTemplateViewModel: DeleteEvaluationSubCriteriaTemplateViewModel) {
        if (!deleteEvaluationSubCriteriaTemplateViewModel.applicationTemplateId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria not deleted',
                    result: deleteEvaluationSubCriteriaTemplateViewModel,
                    error: 'applicationTemplateId not defined'
                }
            };
        }

        if (!deleteEvaluationSubCriteriaTemplateViewModel.applicationStageId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria not deleted',
                    result: deleteEvaluationSubCriteriaTemplateViewModel,
                    error: 'applicationStageId not defined'
                }
            };
        }

        if (!deleteEvaluationSubCriteriaTemplateViewModel.evaluationCriteriaId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria not deleted',
                    result: deleteEvaluationSubCriteriaTemplateViewModel,
                    error: 'evaluationCriteriaId not defined'
                }
            };
        }

        const applicationTemplate: any = await this.applicationTemplateService.getApplicationTemplateById(deleteEvaluationSubCriteriaTemplateViewModel.applicationTemplateId);
        const applicationTemplateStage = applicationTemplate.stages.id(deleteEvaluationSubCriteriaTemplateViewModel.applicationStageId);
        const evaluationCriteria = applicationTemplateStage.evaluationCriteria.id(deleteEvaluationSubCriteriaTemplateViewModel.evaluationCriteriaId);


        lodash.remove(evaluationCriteria.subCriteria, (subCriteria: any) => {
            return lodash.find(subCriteria, { _id: new ObjectId(subCriteriaId) });
        });

        await this.applicationTemplateService.updateApplicationTemplate(applicationTemplate);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Evaluation Criteria created successfully',
                result: (await this.applicationTemplateService.getApplicationTemplateById(deleteEvaluationSubCriteriaTemplateViewModel.applicationTemplateId))
            }
        }
    }

    async createCriteriaQuestion(currentUser, createCriteriaQuestionTemplateViewModel: CreateCriteriaQuestionTemplateViewModel) {
        console.log("Here");
        console.log(createCriteriaQuestionTemplateViewModel);
        
        if (!createCriteriaQuestionTemplateViewModel.applicationTemplateId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria questions not created',
                    result: createCriteriaQuestionTemplateViewModel,
                    error: 'applicationTemplateId not defined'
                }
            };
        }

        if (!createCriteriaQuestionTemplateViewModel.applicationStageId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria questions not created',
                    result: createCriteriaQuestionTemplateViewModel,
                    error: 'applicationStageId not defined'
                }
            };
        }

        if (!createCriteriaQuestionTemplateViewModel.evaluationCriteriaId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria questions not created',
                    result: createCriteriaQuestionTemplateViewModel,
                    error: 'evaluationCriteriaId not defined'
                }
            };
        }

        if (!createCriteriaQuestionTemplateViewModel.evaluationSubCriteriaId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria questions not created',
                    result: createCriteriaQuestionTemplateViewModel,
                    error: 'evaluationSubCriteriaId not defined'
                }
            };
        }

        const applicationTemplate: any = await this.applicationTemplateService.getApplicationTemplateById(createCriteriaQuestionTemplateViewModel.applicationTemplateId);
        const applicationTemplateStage = applicationTemplate.stages.id(createCriteriaQuestionTemplateViewModel.applicationStageId);
        const evaluationCriteria = applicationTemplateStage.evaluationCriteria.id(createCriteriaQuestionTemplateViewModel.evaluationCriteriaId);
        const subCriteria = evaluationCriteria.subCriteria.id(createCriteriaQuestionTemplateViewModel.evaluationSubCriteriaId);

        subCriteria.criteriaQuestions.push(await this.criteriaQuestionService.createCriteriaQuestion(createCriteriaQuestionTemplateViewModel));

        await this.applicationTemplateService.updateApplicationTemplate(applicationTemplate);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Evaluation Criteria created successfully',
                result: (await this.applicationTemplateService.getApplicationTemplateById(createCriteriaQuestionTemplateViewModel.applicationTemplateId))
            }
        };
    }

    async updateCriteriaQuestion(criteriaQuestionId: string, updateCriteriaQuestionTemplateViewModel: UpdateCriteriaQuestionTemplateViewModel) {
        if (!updateCriteriaQuestionTemplateViewModel.applicationTemplateId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria questions not update',
                    result: updateCriteriaQuestionTemplateViewModel,
                    error: 'applicationTemplateId not defined'
                }
            };
        }

        if (!updateCriteriaQuestionTemplateViewModel.applicationStageId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria questions not updated',
                    result: updateCriteriaQuestionTemplateViewModel,
                    error: 'applicationStageId not defined'
                }
            };
        }

        if (!updateCriteriaQuestionTemplateViewModel.evaluationCriteriaId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria questions not created',
                    result: updateCriteriaQuestionTemplateViewModel,
                    error: 'evaluationCriteriaId not defined'
                }
            };
        }

        if (!updateCriteriaQuestionTemplateViewModel.evaluationSubCriteriaId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria questions not updated',
                    result: updateCriteriaQuestionTemplateViewModel,
                    error: 'evaluationSubCriteriaId not defined'
                }
            };
        }

        const applicationTemplate: any = await this.applicationTemplateService.getApplicationTemplateById(updateCriteriaQuestionTemplateViewModel.applicationTemplateId);
        const applicationTemplateStage = applicationTemplate.stages.id(updateCriteriaQuestionTemplateViewModel.applicationStageId);
        const evaluationCriteria = applicationTemplateStage.evaluationCriteria.id(updateCriteriaQuestionTemplateViewModel.evaluationCriteriaId);
        const subCriteria = evaluationCriteria.subCriteria.id(updateCriteriaQuestionTemplateViewModel.evaluationSubCriteriaId);
        const subCriteriaQuestion = subCriteria.criteriaQuestions.id(criteriaQuestionId);

        if (!isNullOrUndefined(updateCriteriaQuestionTemplateViewModel.questionText)) {
            subCriteriaQuestion.questionText = updateCriteriaQuestionTemplateViewModel.questionText;
        }
        
        if (!isNullOrUndefined(updateCriteriaQuestionTemplateViewModel.questionType)) {
            subCriteriaQuestion.questionType = updateCriteriaQuestionTemplateViewModel.questionType;
        }

        if (!isNullOrUndefined(updateCriteriaQuestionTemplateViewModel.possibleMarks)) {
            subCriteriaQuestion.possibleMarks = updateCriteriaQuestionTemplateViewModel.possibleMarks;
        }
        
        

        await this.applicationTemplateService.updateApplicationTemplate(applicationTemplate);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Evaluation Criteria created successfully',
                result: (await this.applicationTemplateService.getApplicationTemplateById(updateCriteriaQuestionTemplateViewModel.applicationTemplateId))
            }
        };
    }

    async deleteCriteriaQuestion(criteriaQuestionId: string, deleteCriteriaQuestionTemplateViewModel: DeleteCriteriaQuestionTemplateViewModel) {
        if (!deleteCriteriaQuestionTemplateViewModel.applicationTemplateId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria questions not deleted',
                    result: deleteCriteriaQuestionTemplateViewModel,
                    error: 'applicationTemplateId not defined'
                }
            };
        }

        if (!deleteCriteriaQuestionTemplateViewModel.applicationStageId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria questions not deleted',
                    result: deleteCriteriaQuestionTemplateViewModel,
                    error: 'applicationStageId not defined'
                }
            };
        }

        if (!deleteCriteriaQuestionTemplateViewModel.evaluationCriteriaId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria questions not deleted',
                    result: deleteCriteriaQuestionTemplateViewModel,
                    error: 'evaluationCriteriaId not defined'
                }
            };
        }

        if (!deleteCriteriaQuestionTemplateViewModel.evaluationSubCriteriaId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Application evaluation criteria questions not deleted',
                    result: deleteCriteriaQuestionTemplateViewModel,
                    error: 'evaluationSubCriteriaId not defined'
                }
            };
        }

        const applicationTemplate: any = await this.applicationTemplateService.getApplicationTemplateById(deleteCriteriaQuestionTemplateViewModel.applicationTemplateId);
        const applicationTemplateStage = applicationTemplate.stages.id(deleteCriteriaQuestionTemplateViewModel.applicationStageId);
        const evaluationCriteria = applicationTemplateStage.evaluationCriteria.id(deleteCriteriaQuestionTemplateViewModel.evaluationCriteriaId);
        const subCriteria = evaluationCriteria.subCriteria.id(deleteCriteriaQuestionTemplateViewModel.evaluationSubCriteriaId);

        lodash.remove(subCriteria.criteriaQuestions,  (criteriaQuestions: any) => {
            return lodash.find(criteriaQuestions, {_id: new ObjectId(criteriaQuestionId)});
        });

        await this.applicationTemplateService.updateApplicationTemplate(applicationTemplate);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Evaluation Criteria created successfully',
                result: (await this.applicationTemplateService.getApplicationTemplateById(deleteCriteriaQuestionTemplateViewModel.applicationTemplateId))
            }
        };
    }

    async getApplicationTemplates(currentUser) {
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Application templates',
                result: (await this.applicationTemplateService.getApplicationTemplates())
            }
        }
    }

    async getRequestsForApplications(currentUser) {
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Requests for application',
                result: (await this.applicationRequestService.getApplicationRequests())
            }
        }
    }

    async getRequestForApplicationWithHasExpressInterestAndApplication(userID: string, rfaID: string): Promise<ResultViewModel<{}>> {
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Requests for application',
                result: {
                    userApplicationID: await this.applicationService.getApplicationByUserAndRFAID(userID, rfaID),
                    isExpressInterest: await this.applicationRequestService
                        .isUserExpressedInterestOnApplication(userID, rfaID),
                    rfa: (await this.applicationRequestService.getApplicationRequests())
                }
            }
        };
    }

    async getUserRequestsForApplications(userID: string, rfaID: string): Promise<ResultViewModel<ApplicationRequestModel>> {
        try {
            return {
                status: HttpStatus.OK,
                body: {
                    message: 'Requests for application',
                    result: (await this.applicationRequestService.getUserApplicationRequestsWithExpressedInterest(userID, rfaID))
                }
            }
        } catch (e) {
            return {
                status: HttpStatus.OK,
                body: {
                    message: 'Requests for application',
                    result: (await this.applicationRequestService.getUserApplicationRequestsWithExpressedInterest(userID, rfaID))
                }
            }
        }
    }

    async getPublicRequestsForApplications(currentuser) {
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Requests for application',
                result: (await this.applicationRequestService.getApplicationRequests(true))
            }
        }
    }

    async createRequestForApplication(currentUser, createApplicationRequestViewModel: CreateApplicationRequestViewModel): Promise<ResultViewModel<any>> {
        if (!createApplicationRequestViewModel.applicationTemplateId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Request for application not created: applicationTemplateId not defined',
                    result: createApplicationRequestViewModel,
                    error: 'applicationTemplateId not defined'
                }
            };
        }

        if (!createApplicationRequestViewModel.referenceNumber) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Request for application not created: referenceNumber not defined',
                    result: createApplicationRequestViewModel,
                    error: 'referenceNumber not defined'
                }
            };
        }

        if (!createApplicationRequestViewModel.title) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Request for application not created: title not defined',
                    result: createApplicationRequestViewModel,
                    error: 'title not defined'
                }
            };
        }

        if (!createApplicationRequestViewModel.shortDescription) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Request for application not created: shortDescription not defined',
                    result: createApplicationRequestViewModel,
                    error: 'shortDescription not defined'
                }
            };
        }

        if (!createApplicationRequestViewModel.longDescription) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Request for application not created: longDescription not defined',
                    result: createApplicationRequestViewModel,
                    error: 'longDescription not defined'
                }
            };
        }

        if (!createApplicationRequestViewModel.keyInformation) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Request for application not created: keyInformation not defined',
                    result: createApplicationRequestViewModel,
                    error: 'keyInformation not defined'
                }
            }
        }

        if (!createApplicationRequestViewModel.deadline) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Request for application not created: deadline not defined',
                    result: createApplicationRequestViewModel,
                    error: 'deadline not defined'
                }
            };
        }

        // Confirm the _id is not provided during the create function
        delete createApplicationRequestViewModel["_id"];

        createApplicationRequestViewModel.owner = currentUser._id;

        try {
            const applicationRequest = await this.applicationRequestService.getApplicationRequestByReferenceNumber(createApplicationRequestViewModel.referenceNumber);

            if (applicationRequest) {
                return {
                    status: HttpStatus.METHOD_NOT_ALLOWED,
                    body: {
                        message: 'Request for application already exists: Reference number already exists',
                        result: applicationRequest,
                        error: 'Reference number already exists'
                    }
                };
            } else {

                return {
                    status: HttpStatus.OK,
                    body: {
                        message: 'Request for application created successfully',
                        result: (await this.applicationRequestService.createApplicationRequest(createApplicationRequestViewModel))
                    }
                };
            }
        } catch (e) {
            console.log(e);
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                body: {
                    message: 'Request for application creation failed',
                    error: e
                }
            };
        }
    }

    async getRequestForApplicationById(requestForApplicationId: string) {
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Request for application',
                result:(await this.applicationRequestService.getRequestForApplicationById(requestForApplicationId))
            }
        }
    }

    async updateRequestForApplication(currentUser, requestForApplicationId: string, updateApplicationRequestViewModel: UpdateApplicationRequestViewModel) {
        const requestForApplication = await this.applicationRequestService.getRequestForApplicationById(requestForApplicationId);

        if (updateApplicationRequestViewModel.applicationTemplateId) {
            requestForApplication.applicationTemplateId = updateApplicationRequestViewModel.applicationTemplateId;
        }
        if (updateApplicationRequestViewModel.referenceNumber) {
            requestForApplication.referenceNumber = updateApplicationRequestViewModel.referenceNumber;
        }
        if (updateApplicationRequestViewModel.title) {
            requestForApplication.title = updateApplicationRequestViewModel.title;
        }
        if (updateApplicationRequestViewModel.shortDescription) {
            requestForApplication.shortDescription = updateApplicationRequestViewModel.shortDescription;
        }
        if (updateApplicationRequestViewModel.longDescription) {
            requestForApplication.longDescription = updateApplicationRequestViewModel.longDescription;
        }
        if (updateApplicationRequestViewModel.keyInformation) {
            requestForApplication.keyInformation = updateApplicationRequestViewModel.keyInformation;
        }
        if (updateApplicationRequestViewModel.filesToUpload && updateApplicationRequestViewModel.filesToUpload.length >= 0) {
            requestForApplication.filesToUpload = updateApplicationRequestViewModel.filesToUpload;
        }

        if (updateApplicationRequestViewModel.deadline) {
            requestForApplication.deadline = updateApplicationRequestViewModel.deadline;
        }

        if (updateApplicationRequestViewModel.reviewDeadline){
            requestForApplication.reviewDeadline = updateApplicationRequestViewModel.reviewDeadline;
        }

        if (updateApplicationRequestViewModel.currentStage) {
            requestForApplication.currentStage = updateApplicationRequestViewModel.currentStage;
        }

        await this.applicationRequestService.updateApplicationRequest(requestForApplication);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Request for application updated successfully',
                result: (await this.applicationRequestService.getRequestForApplicationById(requestForApplicationId))
            }
        };
    }

    async deleteRequestForApplication(currentUser, requestForApplicationId: string) {

        // Prevent deletion of an RFA  if there are applications/submissions that are dependent on it
        const applicationsForRFA = await this.applicationService.getApplicationsForAnRFA(requestForApplicationId);

        if(!isNullOrUndefined(applicationsForRFA)) {
            throw new HttpException({
                message: "Please delete all applications & submissions before deleting this Request/Call for Application.",
                status: HttpStatus.FORBIDDEN,
                error: "The following applications exist for the rfa: " + applicationsForRFA.toString(),
              }, HttpStatus.FORBIDDEN);
        }

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Request for application deleted successfully',
                result: (await this.applicationRequestService.deleteApplicationRequest(requestForApplicationId))
            }
        };
    }

    async publishRequestForApplication(currentUser, applicationRequestId: string) {
        const applicationRequest: any = await this.applicationRequestService.getRequestForApplicationById(applicationRequestId);
        applicationRequest.published = true;
        applicationRequest.datePublished = new Date(Date.now());
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Request for application found',
                result: (await this.applicationRequestService.updateApplicationRequest(applicationRequest))
            }
        }
    }

    async unPublishRequestForApplication(currentUser, applicationRequestId: string) {
        const applicationRequest: any = await this.applicationRequestService.getRequestForApplicationById(applicationRequestId);
        applicationRequest.published = false;
        applicationRequest.dateUnPublished = new Date(Date.now());
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Request for application found',
                result: (await this.applicationRequestService.updateApplicationRequest(applicationRequest))
            }
        }
    }

    async createActionPermission(currentUser, createActionPermissionTemplateViewModel: CreateActionPermissionTemplateViewModel) {

        if (!createActionPermissionTemplateViewModel.applicationTemplateId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Action permission not created: applicationTemplateId not defined',
                    result: createActionPermissionTemplateViewModel,
                    error: 'actionTemplateId not defined'
                }
            };
        }

        if (!createActionPermissionTemplateViewModel.applicationStageId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Action permission not created: applicationStageId not defined',
                    result: createActionPermissionTemplateViewModel,
                    error: 'applicationStageId not defined'
                }
            };
        }

        if (!createActionPermissionTemplateViewModel.action) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Action permission not created: action not defined',
                    result: createActionPermissionTemplateViewModel,
                    error: 'action not defined'
                }
            };
        }

        if (!createActionPermissionTemplateViewModel.users || createActionPermissionTemplateViewModel.users.length == 0) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Action permission not created: users not defined',
                    result: createActionPermissionTemplateViewModel,
                    error: 'users not defined'
                }
            };
        }

        const applicationTemplate: any = await this.applicationTemplateService.getApplicationTemplateById(createActionPermissionTemplateViewModel.applicationTemplateId);
        const actionPermission = await this.actionPermissionService.createActionPermission(createActionPermissionTemplateViewModel);
        (applicationTemplate.stages.id(createActionPermissionTemplateViewModel.applicationStageId)).actionPermissions.push(actionPermission);

        await this.applicationTemplateService.updateApplicationTemplate(applicationTemplate);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Action permission created successfully',
                result: (await this.applicationTemplateService.getApplicationTemplateById(createActionPermissionTemplateViewModel.applicationTemplateId))
            }
        };
    }

    async getSubmittedApplications() {
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Applications',
                result: (await this.applicationService.getSubmittedApplications())
            }
        }
    }

    async searchAllApplications(applicationSearchFilter: ApplicationSearchFilterViewModel) {
        if (!applicationSearchFilter.requestForApplicationId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: "Application not found: requestForApplicationId not defined",
                    result: applicationSearchFilter,
                    error: "requestForApplicationId not defined"
                }
            }
        }

        // if (!applicationSearchFilter.customProperty) {
        //     return {
        //         status: HttpStatus.BAD_REQUEST,
        //         body: {
        //             message: "Application not found: customProperty not defined",
        //             result: applicationSearchFilter,
        //             error: "customProperty not defined"
        //         }
        //     }
        // }

        return {
            status: HttpStatus.OK,
            body:{
                message: 'Applications',
                result: (await this.applicationService.getSubmittedApplicationsByFilter(applicationSearchFilter))
            }
        }
    }

    async expressRequestForApplicationInterest(currentUser, expressApplicationRequestInterestViewModel: ApplicationRequestInterestViewModel) {
        currentUser = (currentUser as UserModel);
        if (!expressApplicationRequestInterestViewModel.requestForApplicationId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Interest not expressed: requestForApplicationId not defined',
                    result: expressApplicationRequestInterestViewModel,
                    error: 'requestForApplication not defined'
                }
            };
        }

        const requestForApplication = await this.applicationRequestService.getRequestForApplicationById(expressApplicationRequestInterestViewModel.requestForApplicationId);

        if (requestForApplication.interestExpressed.includes(currentUser._id)) {
            return {
                status: HttpStatus.METHOD_NOT_ALLOWED,
                body: {
                    message: 'Interest not expressed: User already expressed interest',
                    result: expressApplicationRequestInterestViewModel
                }
            };
        } else {
            requestForApplication.interestExpressed.push(currentUser._id);

            await this.applicationRequestService.updateApplicationRequest(requestForApplication);

            // Check if user had created a submission for the same rfa
            let anApplicationForTheUser = await this.applicationService.getApplicationByUserAndRFAID(currentUser._id, requestForApplication._id);

            // Create a new application as soon as the user expresses interest (if not exists)
            if (isNullOrUndefined(anApplicationForTheUser)) {
                anApplicationForTheUser = await this.applicationService.createApplication(({
                    requestForApplication: requestForApplication._id,
                    user: currentUser._id
                } as ApplicationModel));
            }

            return {
                status: HttpStatus.OK,
                body: {
                    message: 'Interest Expressed',
                    result: {
                        userApplicationID: anApplicationForTheUser._id,
                        isExpressInterest: await this.applicationRequestService
                            .isUserExpressedInterestOnApplication(currentUser._id, expressApplicationRequestInterestViewModel.requestForApplicationId),
                        rfa: (await this.applicationRequestService.getRequestForApplicationById(expressApplicationRequestInterestViewModel.requestForApplicationId))
                    }
                }
            };
        }
    }

    async removeRequestForApplicationInterest(currentUser, removeApplicationRequestInterestViewModel: ApplicationRequestInterestViewModel) {
        if (!removeApplicationRequestInterestViewModel.requestForApplicationId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Interest not revoked: requestForApplication not defined',
                    result: removeApplicationRequestInterestViewModel,
                    error: 'requestForApplication not defined'
                }
            };
        }

        const requestForApplication = await this.applicationRequestService.getRequestForApplicationById(removeApplicationRequestInterestViewModel.requestForApplicationId);
        requestForApplication.interestExpressed.splice(requestForApplication.interestExpressed.indexOf(currentUser._id), 1);

        await this.applicationRequestService.updateApplicationRequest(requestForApplication);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Interest revoked',
                result: (await this.applicationRequestService.getRequestForApplicationById(removeApplicationRequestInterestViewModel.requestForApplicationId))
            }
        };
    }

    async getRequestForApplication(currentUser, requestForApplicationId: string) {
        const requestForApplication = await this.applicationRequestService.getRequestForApplicationById(requestForApplicationId);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'User expressed interest',
                result: { isCurrentUserExpressedInterest: requestForApplication.interestExpressed.includes(currentUser._id) }

            }
        }
    }

    async submitApplication(currentUser, submitApplicationViewModel: SubmitApplicationViewModel) {
        if (!submitApplicationViewModel.applicationId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Submission not successfull',
                    result: submitApplicationViewModel
                }
            };
        }

        const application = await this.applicationService.getApplicationById(submitApplicationViewModel.applicationId);
        const requestForApplication = await this.applicationRequestService.getRequestForApplicationById(application.requestForApplication);
        const requestForApplicationTemplate = await this.applicationTemplateService.getApplicationTemplateById(requestForApplication.applicationTemplateId[0]);
        const requestForApplicationTemplateStage = lodash.find(requestForApplicationTemplate.stages, stage => stage.displayOrder == 0);

        application.submitted = true;
        application.dateSubmitted = new Date(Date.now());
        application.currentStage = requestForApplicationTemplateStage.id;
        application.customProperties = submitApplicationViewModel.customProperties;


        await this.applicationService.update(application);
        const user = await this.userService.getUserById(currentUser._id);
        const deadline = moment(requestForApplication.deadline).format("dddd, MMMM Do YYYY");
        const reviewDeadline = moment(requestForApplication.reviewDeadline).format("dddd, MMMM Do YYYY");

        await this.mailingService.sendMail({
            from: this.configService.get<string>('DEFAULT_USER'),
            to: [user.email],
            subject: `${requestForApplication.referenceNumber} - APPLICATION RECEIVED`,
            text: ``,
            html: `<p>Dear ${user.name},</p>
            <p>Thank you for submitting your consortium’s proposal under the Call “Mainstreaming Ecological Organic Agriculture (EOA) into Agricultural Systems in Africa for the Period 2019-2023 (Phase II)” in the frame of ${requestForApplication.referenceNumber} with ${deadline} as the deadline</p>
            <p>We shall get back to you once all the procedures of checking and reviewing the applications have been completed by ${reviewDeadline}</p>
            <p>If you have any questions, please send an email to gms@eoai-africa.org</p>
            <p>Best Regards,<br/>EOA Initiative Project Management Unit <br/>Biovision Africa Trust</p>
            `
        });

        this.notificationManagementService.createNotification({
            dateCreated: new Date(Date.now()),
            status: NotificationStatus.NOT_READ,
            message: `A new application to request for application ${requestForApplication.referenceNumber} has been made`,
            userId: requestForApplication.owner
        });

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Submission successful',
                // result: (await this.applicationService.getApplicationById(submitApplicationViewModel.applicationId))
                result: application
            }
        }
    }

    async findUserApplicationByRFAID(userID: string, rfaID: string): Promise<ResultViewModel<ApplicationModel>> {
        return {
            status: HttpStatus.OK,
            body: {
                message: "Successfully retrieved applicaition",
                result: await this.applicationService.getApplicationByUserAndRFAID(userID, rfaID)
            }
        } as ResultViewModel<ApplicationModel>;
    }

    async withdrawApplication(currentUser, applicationId: string) {
        const application = await this.applicationService.getApplicationById(applicationId);
        if (((application.user) as UserModel)._id == currentUser._id) {

            const deleteFiles = [];
            for (const uploadedFile of application.uploadedFiles) {
                deleteFiles.push(uploadedFile.fileId);
            }

            return {
                status: HttpStatus.OK,
                body: {
                    message: 'Application withdrawn',
                    result: {
                        deleteFiles: deleteFiles,
                        withdrawResponse: (await this.applicationService.deleteApplication(applicationId))
                    }
                }
            };
        } else {
            throw new HttpException({
                message: "You can only delete applications/submissions if you authored them.",
                status: HttpStatus.FORBIDDEN,
                error: "Cannot delete the application since the user didn't author it.",
              }, HttpStatus.FORBIDDEN);
        }
    }

    async getApplication(currentUser, applicationId: string) {
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Application',
                result: (await this.applicationService.getApplicationById(applicationId))
                // result: applicationId
            }
        }
    }

    async getUserApplications(userID: string) {
        const applications = await this.applicationService.getUserApplications(userID);
        // const toReturn = [];
        // for (const application of applications) {
        //     if (((application.user) as UserModel)._id == currentUser._id) {
        //         toReturn.push(application);
        //     }
        // }
        return {
            status: HttpStatus.OK,
            body: {
                message: 'List of user applications returned to frontend',
                result: applications
            }
        }
    }

    async uploadRequestForApplicationAttachement(currentUser, uploadedFileId: string, uploadRequestForApplicationViewModel: UploadRequestForApplicationViewModel) {
        if (!uploadRequestForApplicationViewModel.requestForApplicationId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Attachment not saved: requestForApplicationId not defined',
                    result: uploadRequestForApplicationViewModel,
                    error: 'requestForApplicationId not defined'
                }
            };
        }

        if (!uploadRequestForApplicationViewModel.name) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Attachement not saved: name not defined',
                    result: uploadRequestForApplicationViewModel,
                    error: 'name not defined'
                }
            };
        }

        const requestForApplication = await this.applicationRequestService.getRequestForApplicationById(uploadRequestForApplicationViewModel.requestForApplicationId);
        const newFile = {
            fileId: uploadedFileId,
            fileType: uploadRequestForApplicationViewModel.fileType,
            name: uploadRequestForApplicationViewModel.name
        };
        
        requestForApplication.attachments.push(newFile);

        await this.applicationRequestService.updateApplicationRequest(requestForApplication);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Attachement saved',
                result: (await this.applicationRequestService.getRequestForApplicationById(uploadRequestForApplicationViewModel.requestForApplicationId))
            }
        }
    }

    async deleteRequestForApplicationAttachement(deleteRequestForApplicationAttachmentViewModel: DeleteRequestForApplicationAttachmentViewModel) {
        const requestForApplication = await this.applicationRequestService.getRequestForApplicationById(deleteRequestForApplicationAttachmentViewModel.requestForApplicationId);
        lodash.remove(requestForApplication.attachments, (attachment) => {
            return attachment.fileId == deleteRequestForApplicationAttachmentViewModel.attachmentFileId;
        });

        await this.applicationRequestService.updateApplicationRequest(requestForApplication);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Attachment to the request for application',
                result: { 
                    requestForApplication: (await this.applicationRequestService.getRequestForApplicationById(deleteRequestForApplicationAttachmentViewModel.requestForApplicationId)),
                    fileId: deleteRequestForApplicationAttachmentViewModel.attachmentFileId
                }
            }
        };
    }

    async moveApplicationToNextStage(moveApplicationToNextStage: MoveApplicationToNextStage) {
        if (!moveApplicationToNextStage.nextStageId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: "Applications not moved to the next stage: nextStageId not defined",
                    result: moveApplicationToNextStage,
                    error: "nextStageId not defined"
                }
            };
        }

        if (!moveApplicationToNextStage.applicationIds || moveApplicationToNextStage.applicationIds.length == 0) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: "Applications not moved to the next stage: applicationIds not defined",
                    result: moveApplicationToNextStage,
                    error: "applicationIds not defined"
                }
            };
        }

        moveApplicationToNextStage.applicationIds.map(async (applicationId) => {
            const application = await this.applicationService.getApplicationById(applicationId);
            application.currentStage = moveApplicationToNextStage.nextStageId;

            await this.applicationService.update(application);
        });

        return {
            status: HttpStatus.OK,
            body: {
                message: "Applications moved to the next stage",
                result: (await this.applicationService.getApplicationsByIds(moveApplicationToNextStage.applicationIds))
            }
        }
    }

    async awardApplicationsGrant(awardApplicationsGrantViewModel: AwardApplicationsGrantViewModel) {
        if (!awardApplicationsGrantViewModel.applicationIds || awardApplicationsGrantViewModel.applicationIds.length == 0) {
            return {
                status: HttpStatus.METHOD_NOT_ALLOWED,
                body: {
                    message: 'Applications not awarded grant',
                    result: awardApplicationsGrantViewModel,
                    error: 'applicationsIds not defined'
                }
            };
        }

        const awardedApplications = [];

        for (const applicationId of awardApplicationsGrantViewModel.applicationIds) {
            const application = await this.applicationService.getApplicationById(applicationId);
            application.granted = true;

            this.applicationService.update(application);

            awardedApplications.push(await this.applicationService.getApplicationById(applicationId));
        }

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Awarded applications',
                result: awardedApplications
            }
        };
    }

    async approveApplicationsGrant(approveApplicationsGrantViewModel: ApproveApplicationsGrantViewModel) {
        if (!approveApplicationsGrantViewModel.applicationIds || approveApplicationsGrantViewModel.applicationIds.length == 0) {
            return {
                status: HttpStatus.METHOD_NOT_ALLOWED,
                body: {
                    message: 'Applications not awarded grant',
                    result: approveApplicationsGrantViewModel,
                    error: 'applicationsIds not defined'
                }
            };
        }

        const awardedApplications = [];

        for (const applicationId of approveApplicationsGrantViewModel.applicationIds) {
            const application = await this.applicationService.getApplicationById(applicationId);
            application.approved = true;

            this.applicationService.update(application);

            awardedApplications.push(await this.applicationService.getApplicationById(applicationId));
        }

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Approved applications',
                result: awardedApplications
            }
        };
    }

    async getApplicationsByRequestForApplicationId(requestForApplicationId: string) {
        return {
            status: HttpStatus.OK,
            body: {
                message:'Applications',
                result: (await this.applicationService.getApplicationsByRequestForApplicationId(requestForApplicationId))
            }
        };
    }

    async createApplicationReportingTemplate(createReportingTemplateViewModel: CreateReportingTemplateViewModel) {
        if (!createReportingTemplateViewModel.requestForApplicationTemplateId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Reporting template not created',
                    result: createReportingTemplateViewModel,
                    error: 'requestForApplicationTemplateId not defined'
                }
            };
        }

        
        const requestForApplicationTemplate = await this.applicationTemplateService.getApplicationTemplateById(createReportingTemplateViewModel.requestForApplicationTemplateId);
        const newReportingTemplate = await this.reportingTemplateService.createReportingTemplate(createReportingTemplateViewModel);

        requestForApplicationTemplate.reportingTemplates.push(newReportingTemplate);

        await this.applicationTemplateService.updateApplicationTemplate(requestForApplicationTemplate);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Reporting Template successfully added',
                result: (await this.applicationTemplateService.getApplicationTemplateById(createReportingTemplateViewModel.requestForApplicationTemplateId))
            }
        };
    }

    async deleteApplicationReportingTemplate(deleteReportingTemplateViewModel: DeleteReportingTemplateViewModel) {
        if (!deleteReportingTemplateViewModel.reportingTemplateId) {
            return {
                status: HttpStatus.BAD_REQUEST,
                body: {
                    message: 'Reporting template not deleted',
                    result: deleteReportingTemplateViewModel,
                    error: 'reportingTemplateId not defined'
                }
            };
        }

        if (!deleteReportingTemplateViewModel.requestForApplicationTemplateId) {
            return  {
                status: HttpStatus.BAD_REQUEST,
                body:{
                    message: 'Reporting template not deleted',
                    result: deleteReportingTemplateViewModel,
                    error: 'requestForApplicationTemplateId not defined'
                }
            };
        }

        const requestForApplicationTemplate = await this.applicationTemplateService.getApplicationTemplateById(deleteReportingTemplateViewModel.requestForApplicationTemplateId);

        lodash.remove(requestForApplicationTemplate.reportingTemplates, (reportingTemplate) => {
            return reportingTemplate._id == deleteReportingTemplateViewModel.reportingTemplateId;
        });

        await this.applicationTemplateService.updateApplicationTemplate(requestForApplicationTemplate);

        return {
            status: HttpStatus.OK,
            body: {
                message: 'Reporting template deleted',
                result: (await this.applicationTemplateService.getApplicationTemplateById(deleteReportingTemplateViewModel.requestForApplicationTemplateId))
            }
        };
    }

    async searchGrantedApplications(requestForApplicationId: string) {
        return {
            status: HttpStatus.OK,
            body: {
                message: 'Granted applications',
                result: (await this.applicationService.getGrantedApplications(requestForApplicationId))
            }
        }
    }
}
