export class User {
    readonly userid?: number;
    readonly firstname: string;
    readonly lastname: string;
    readonly email: string;
    readonly password: string;
    readonly nickname?: string;

    constructor(user: {
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        userid?: number;
        nickname?: string;
    }) {
        this.userid = user.userid;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.password = user.password;
        this.nickname = user.nickname;
    }

 
}