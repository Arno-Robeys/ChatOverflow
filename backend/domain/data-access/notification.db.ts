import { Notification } from '../model/notification';
import database from './prisma/database';
import { NotificationMapper } from './notification.mapper';

const createNotification = async (notification: Notification): Promise<Notification> => {
    return NotificationMapper.toDomain(await database.notification.create({data : NotificationMapper.toPersistence(notification)}));
}

const getAllNotifications = async (): Promise<Notification[]> => {
    const notifications = await database.notification.findMany()
    if(!notifications) throw new Error("No notifications found");
    return notifications.map((notification) => NotificationMapper.toDomain(notification));
}

const getNotificationById = async ({id}: {id: number}): Promise<Notification> => {
    const notification = await database.notification.findUnique({ where: { notificationid: id } });
    if(!notification) throw new Error("No notification found");
    return NotificationMapper.toDomain(notification);
}

const getAllNotificationsByUserId = async ({userid}: {userid: number}): Promise<Notification[]> => {
    const notifications = await database.notification.findMany({where: {userid: userid}, include: {message: true}})
    if(!notifications) throw new Error("No notifications found");
    return notifications.map((notification) => NotificationMapper.toDomain(notification));
}

const deleteNotificationById = async ({id}: {id: number}): Promise<boolean> => {
    try {
        return Boolean(await database.notification.delete({ where: { notificationid: id } }));
    } catch (error) {
        throw new Error("No notification found");
    }
}

// update notification with id as parameter when user change message body
const updateNotificationById = async ({id, userid}: {id: number, userid: number}): Promise<Notification> => {
    const notification = await database.notification.update({
        where: { notificationid: id },
        data: { userid: userid }
    });
    if(!notification) throw new Error("No notification found");
    return NotificationMapper.toDomain(notification);
}






export default {
    createNotification,
    getAllNotifications,
    getNotificationById,
    getAllNotificationsByUserId,
    deleteNotificationById,
    updateNotificationById
}