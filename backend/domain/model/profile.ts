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
}