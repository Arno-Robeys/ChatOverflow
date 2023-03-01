import { User } from "./user";

export class chat {
    readonly chatid?: number;
    readonly userid?: User;
    readonly message: string;
    readonly time: string;
    readonly read: boolean;
}