import { Notification } from '../model/notification';

const notifications: Notification[] = [];

export class NotificationDao {
    async createNotification(notification: Notification): Promise<Notification> {
        return Notification.create({ notificationid: notification.notificationid, userid: notification.userid, chatid: notification.chatid, messsage: notification.messsage, time: notification.time });
    }

    async getAllNotifications(): Promise<Notification[]> {
        return notifications;
    }
}
