export interface MailingViewModel {
    to: Array<string>;
    from: string;
    subject: string;
    text: string;
    html: string;
}