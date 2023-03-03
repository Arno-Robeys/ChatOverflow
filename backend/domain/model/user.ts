export class User {
    readonly userid?: number;
    readonly firstname: string;
    readonly lastname: string;
    readonly email: string;
    readonly password: string;
    readonly nickname?: string;

    constructor(firstname: string, lastname: string, email: string, password: string, userid?: number, nickname?: string) {
        this.userid = userid;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
    }

 
}