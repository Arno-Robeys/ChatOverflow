import { chat } from "./chat";
import { User } from "./user";

export class Notification {
    readonly notificationid?: number;
    readonly userid?: User;
    readonly chatid?: chat;
    readonly messsage?: chat;
    readonly time?: string;
}
