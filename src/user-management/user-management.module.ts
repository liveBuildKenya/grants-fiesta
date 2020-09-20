import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UserManagementService } from './services/user-management/user-management.service';
import { UserService } from './services/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.model';
import { AuthenticationController } from './controllers/authentication/authentication.controller';
import { AuthenticationService } from './services/authentication/authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from './authentication/strategies/local.strategy';
import { JwtStrategy } from './authentication/strategies/jwt.strategy';
import { UserRoleController } from './controllers/user-role/user-role.controller';
import { InviteSchema } from './models/invite.model';
import { InviteService } from './services/invite/invite.service';
import { FileManagementModule } from 'src/file-management/file-management.module';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from 'src/file-management/services/grid-fs-multer-config/grid-fs-multer-config.service';
import { UserGroupSchema } from './models/userGroups.model';
import { UserGroupService } from './services/user-group/user-group.service';
import { MenuService } from './services/menu/menu.service';
import { MenuSchema } from './models/menu.model';
import { MenuController } from './controllers/menu/menu.controller';
import { PermissionSetsController } from './controllers/permission-sets/permission-sets.controller';
import { PermissionSetsService } from './services/permission-sets/permission-sets.service';
import { PermissionSetSchema } from './models/permission-set';
import { UserGroupController } from './controllers/user/user-group.controller';
import { MailingManagementModule } from 'src/mailing-management/mailing-management.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FileManagementModule,
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Invite', schema: InviteSchema },
      { name: 'UserGroup', schema: UserGroupSchema },
      { name: 'PermissionSet', schema: PermissionSetSchema },
      { name: 'Menu', schema: MenuSchema }
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
      imports: [ConfigModule.forRoot()]
    }),
    MailingManagementModule
  ],
  controllers: [
    UserController, 
    AuthenticationController, 
    UserRoleController, 
    MenuController, 
    PermissionSetsController, 
    UserGroupController
  ],
  providers: [
    UserManagementService, 
    UserService, 
    AuthenticationService, 
    LocalStrategy, 
    JwtStrategy,
    InviteService,
    UserGroupService,
    MenuService,
    PermissionSetsService
  ],
  exports: [
    JwtStrategy,
    UserService,
    UserManagementService,
    PermissionSetsService,
    UserGroupService
  ]
})
export class UserManagementModule {}
