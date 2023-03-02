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

    equals(other: Profile): boolean {
        return this.userid === other.userid && this.description === other.description && this.avatar === other.avatar && this.work === other.work && this.hobby === other.hobby && this.rating === other.rating && this.education === other.education && this.tags === other.tags;
    }

    static create({ userid, description, avatar, work, hobby, rating, education, tags }): Profile {
        return new Profile(userid, description, avatar, work, hobby, rating, education, tags);
    }
    

}