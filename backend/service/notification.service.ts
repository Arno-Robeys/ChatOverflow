import { Notification } from "../domain/model/notification";
import notificationDB from "../domain/data-access/notification.db";


const createNotification = async (notification: Notification): Promise<Notification> => {
    if(!notification) throw new Error("A notification must be provided")
    return notificationDB.createNotification(notification);
};

const getAllNotifications = async (): Promise<Notification[]> => {
    return notificationDB.getAllNotifications();
};

export default {
    createNotification,
    getAllNotifications,
};