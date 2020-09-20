import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { UserGroupService } from "src/user-management/services/user-group/user-group.service";

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector,
                private userGroupService: UserGroupService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
        if (!permissions) {
            return true;
        }

        const req = context.switchToHttp().getRequest();
        let allowed = false;
        return this.userGroupService.getGroupsforUser(req.user._id).then((userGroups: any) => {
            for (const userGroup of userGroups) {
                if (userGroup.permissions.includes(permissions)) {
                    allowed = true;
                    break;
                }
            }
            return allowed;
        });
    }

}