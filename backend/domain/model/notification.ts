import { Message } from './message';

export class Notification {
    readonly notificationid: number;
    readonly userid: number;
    readonly chatid: number;
    readonly messageid: number;
    readonly message?: Message;
    readonly read: boolean;

    constructor(notification: {
        userid: number;
        chatid: number;
        messageid: number;
        notificationid: number;
        message?: Message;
        read?: boolean;
    }) {
        this.notificationid = notification.notificationid;
        this.userid = notification.userid;
        this.chatid = notification.chatid;
        this.messageid = notification.messageid;
        this.message = notification.message;
        this.read = notification.read;
    }
    



}
