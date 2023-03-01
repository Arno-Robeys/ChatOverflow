import { PrismaClient } from '@prisma/client';
import { Notification } from '../model/notification';

const prisma = new PrismaClient();

export class NotificationDao {
    async createNotification(notification: Notification): Promise<Notification> {
        return await prisma.notification.create({ data: notification }, { include: { user: true, chat: true } });
    }
}
