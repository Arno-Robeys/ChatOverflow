import { Notification as PrismaNotification } from '@prisma/client';
import { Notification } from '../model/notification';
import { Message } from '../model/message';

export class NotificationMapper {
    static toDomain(prismaNotification: PrismaNotification): Notification {
        return new Notification({
            userid: prismaNotification.userid,
            chatid: prismaNotification.chatid,
            message: prismaNotification.message,
            time: prismaNotification.time,
            read: prismaNotification.read,
            notificationid: prismaNotification.notificationid
        })
    }

    static toPersistence(notification: Notification): Omit<PrismaNotification,'notificationid'> {
        return { userid: notification.userid, chatid: notification.chatid ,message: notification.message, time: notification.time, read: notification.read, notificationid: notification.notificationid }
    }

}