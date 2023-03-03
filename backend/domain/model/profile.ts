import { User } from "./user";

export class Profile {
    readonly userid?: User;
    readonly description?: string;
    readonly avatar?: string;
    readonly work?: string;
    readonly hobby?: string;
    readonly rating?: string;
    readonly education?: string;
    readonly tags?: string;

    constructor(userid: User, description?: string, avatar?: string, work?: string, hobby?: string, rating?: string, education?: string, tags?: string) {
        this.userid = userid;
        this.description = description;
        this.avatar = avatar;
        this.work = work;
        this.hobby = hobby;
        this.rating = rating;
        this.education = education;
        this.tags = tags;
    }




}