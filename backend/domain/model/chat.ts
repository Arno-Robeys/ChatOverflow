import { User } from "./user";

export class Chat {
    readonly chatid: number;
    readonly userid: User;
    readonly message: string;
    readonly time: string;
    readonly read: boolean;

    constructor(userid: User, message: string, time: string, read: boolean, chatid: number) {
        this.chatid = chatid;
        this.userid = userid;
        this.message = message;
        this.time = time;
        this.read = read;
    }

    equals(other: Chat): boolean {
        return this.chatid === other.chatid && this.userid === other.userid && this.message === other.message && this.time === other.time && this.read === other.read;
    }

    static create({ chatid, userid, message, time, read }): Chat {
        return new Chat(userid, message, time, read, chatid);
    }
}