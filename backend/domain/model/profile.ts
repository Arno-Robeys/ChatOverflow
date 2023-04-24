
export class Profile {
    readonly userid: number;
    readonly description?: string;
    readonly avatar?: string;
    readonly work?: string;
    readonly hobby?: string;
    readonly education?: string;
    readonly tags?: string;

    constructor(user: {
        userid: number;
        description?: string;
        avatar?: string;
        work?: string;
        hobby?: string;
        education?: string;
        tags?: string;
    }) {
        this.userid = user.userid;
        this.description = user.description;
        this.avatar = user.avatar;
        this.work = user.work;
        this.hobby = user.hobby;
        this.education = user.education;
        this.tags = user.tags;
    }
    




}