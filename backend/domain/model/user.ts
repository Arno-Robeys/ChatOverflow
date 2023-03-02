export class User {
    readonly userid?: number;
    readonly firstname: string;
    readonly lastname: string;
    readonly email: string;
    readonly password: string;
    readonly nickname?: string;

    constructor(firstname: string, lastname: string, email: string, password: string, nickname?: string, userid?: number) {
        this.userid = userid;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
    }

    equals(other: User): boolean {
        return this.userid === other.userid && this.firstname === other.firstname && this.lastname === other.lastname && this.email === other.email && this.password === other.password && this.nickname === other.nickname;
    }

    static create({ userid, firstname, lastname, email, password, nickname }): User {
        return new User(firstname, lastname, email, password, nickname, userid);
    }   
}