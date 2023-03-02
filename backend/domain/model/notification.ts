import { Chat } from "./chat";
import { User } from "./user";

export class Notification {
    readonly notificationid: number;
    readonly userid: User;
    readonly chatid: Chat;
    readonly messsage: Chat;
    readonly time: string;

    constructor(userid: User, chatid: Chat, messsage: Chat, time: string, notificationid: number) {
        this.notificationid = notificationid;
        this.userid = userid;
        this.chatid = chatid;
        this.messsage = messsage;
        this.time = time;
    }

    equals(other: Notification): boolean {
        return this.notificationid === other.notificationid && this.userid === other.userid && this.chatid === other.chatid && this.messsage === other.messsage && this.time === other.time;
    }

    static create({ notificationid, userid, chatid, messsage, time }): Notification {
        return new Notification(userid, chatid, messsage, time, notificationid);
    }

}
