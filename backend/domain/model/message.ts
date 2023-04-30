import { Notification } from "./notification";
import { User } from "./user";

export class Message {
    readonly chatid: number;
    readonly userid: number;
    readonly messageid: number;
    readonly message: string;
    readonly time: Date;
    readonly notification?: Notification;
    readonly user?: User;

    constructor(chatMessage: {
        userid: number;
        message: string;
        messageid: number;
        time: Date;
        chatid: number;
        notification?: Notification;
        user?: User;
    }) {
        this.chatid = chatMessage.chatid;
        this.userid = chatMessage.userid;
        this.message = chatMessage.message;
        this.time = chatMessage.time;
        this.messageid = chatMessage.messageid;
        this.notification = chatMessage.notification;
        this.user = chatMessage.user;
    }
    


}