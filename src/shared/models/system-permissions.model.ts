export interface ModulePermissions {
    systemName: string;
    description: string;
}

export interface SystemPermissions {
    ModuleName: string;
    Permissions: Array<ModulePermissions>;
}