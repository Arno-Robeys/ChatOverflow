
export class Notification {
    readonly notificationid: number;
    readonly userid: number;
    readonly chatid: number;
    readonly message: number;
    readonly time: Date;

    constructor(notification: {
        userid: number;
        chatid: number;
        message: number;
        time: Date;
        notificationid: number;
    }) {
        this.notificationid = notification.notificationid;
        this.userid = notification.userid;
        this.chatid = notification.chatid;
        this.message = notification.message;
        this.time = notification.time;
    }
    



}
