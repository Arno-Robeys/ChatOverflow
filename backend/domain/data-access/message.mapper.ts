import { Message as PrismaMessage } from '@prisma/client';
import { Message } from '../model/message';

export class MessageMapper {
    static toDomain(prismaMessage: PrismaMessage): Message {
        return new Message({
            userid: prismaMessage.userid,
            message: prismaMessage.message,
            time: prismaMessage.time,
            chatid: prismaMessage.chatid,
            messageid: prismaMessage.messageid
        })
            
    }

    static toPersistence(message: Message): Omit<PrismaMessage,'messageid'> {
        return { userid: message.userid, message: message.message, time: message.time, chatid: message.chatid }        
    }

}