import { Notification } from "../domain/model/notification";
import notificationDB from "../domain/data-access/notification.db";


const createNotification = async (notification: Notification): Promise<Notification> => {
    if(!notification) throw new Error("A notification must be provided")
    return notificationDB.createNotification(notification);
};

const getAllNotifications = async (): Promise<Notification[]> => {
    return notificationDB.getAllNotifications();
};

const getAllNotificationsByUserId = async (userid: string): Promise<Notification[]> => {
    if(!userid) throw new Error("A user id must be provided")
    if(Number.isNaN(Number(userid))) throw new Error("A user id must be a number");
    return notificationDB.getAllNotificationsByUserId({userid: parseInt(userid)});
};

const deleteNotificationById = async (id: string): Promise<Boolean> => {
    if(!id) throw new Error("A notification id must be provided")
    if(Number.isNaN(Number(id))) throw new Error("A notification id must be a number");
    return notificationDB.deleteNotificationById({id: parseInt(id)});
};

// update notification with id as parameter when user change message body
const updateNotificationById = async (id: string, userid: string): Promise<Notification> => {
    if(!id) throw new Error("A notification id must be provided")
    if(Number.isNaN(Number(id))) throw new Error("A notification id must be a number");
    if(!userid) throw new Error("A message id must be provided")
    if(Number.isNaN(Number(userid))) throw new Error("A message id must be a number");
    return notificationDB.updateNotificationById({id: parseInt(id), userid: parseInt(userid)});
};




export default {
    createNotification,
    getAllNotifications,
    deleteNotificationById,
    getAllNotificationsByUserId,
    updateNotificationById
}