import { Notification as PrismaNotification } from '@prisma/client';
import { Notification } from '../model/notification';
import { Message as PrismaMessage } from '@prisma/client';
import { MessageMapper } from './message.mapper';

export class NotificationMapper {
    static toDomain(prismaNotification: PrismaNotification & {message?: PrismaMessage}): Notification {

        return new Notification({
            userid: prismaNotification.userid,
            chatid: prismaNotification.chatid,
            messageid: prismaNotification.messageid,
            notificationid: prismaNotification.notificationid,
            message: prismaNotification.message ? MessageMapper.toDomain(prismaNotification.message) : undefined
        })
    }

    static toPersistence(notification: Notification): Omit<PrismaNotification,'notificationid'> {
        return { userid: notification.userid, chatid: notification.chatid, messageid: notification.messageid }
    }

}