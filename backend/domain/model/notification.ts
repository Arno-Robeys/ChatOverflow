
export class Notification {
    readonly notificationid: number;
    readonly userid: number;
    readonly chatid: number;
    readonly messageid: number;
    readonly time: Date;

    constructor(notification: {
        userid: number;
        chatid: number;
        messageid: number;
        time: Date;
        notificationid: number;
    }) {
        this.notificationid = notification.notificationid;
        this.userid = notification.userid;
        this.chatid = notification.chatid;
        this.messageid = notification.messageid;
        this.time = notification.time;
    }
    



}
