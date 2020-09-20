export interface InviteUsersViewModel {
    emails: Array<string>;
    message: string;
}

export interface InviteUserViewModel {
    email: string;
    message: string;
    status: string;
    invitedBy: string;
}