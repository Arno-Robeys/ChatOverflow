import { Chat } from "./chat";
import { Profile } from "./profile";

export class User {
    readonly userid?: number;
    readonly firstname: string;
    readonly lastname: string;
    readonly email: string;
    readonly password: string;
    readonly nickname?: string;
    readonly profile?: Profile;
    readonly chats?: Chat;

    constructor(user: {
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        userid?: number;
        nickname?: string;
        profile?: Profile;
        chats?: Chat;
    }) {
        this.userid = user.userid;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.password = user.password;
        this.nickname = user.nickname;
        this.profile = user.profile;
        this.chats = user.chats;
    }

 
}