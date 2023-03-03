import { User } from "./user";

export class Chat {
    readonly chatid: number;
    readonly users: User[];

    constructor(users: User[], chatid: number) {
        this.chatid = chatid;
        this.users = users;
    }



}