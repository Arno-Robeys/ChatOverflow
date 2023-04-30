import { Message } from '../model/message';
import database from './prisma/database';
import { MessageMapper } from './message.mapper';

const createMessage = async (message: Message): Promise<Message> => {
    return MessageMapper.toDomain(await database.message.create({data : MessageMapper.toPersistence(message)}));
};

const getAllMessages = async (): Promise<Message[]> => {
    const messages = await database.message.findMany()
    return messages.map((message) => MessageMapper.toDomain(message));

}

const getAllMessagesByChatId = async ({chatid}: {chatid: number}): Promise<Message[]> => {
    const messages = await database.message.findMany({where: {chatid: chatid}, orderBy: { time: 'asc' }})
    if(!messages) throw new Error("No messages found");
    return messages.map((message) => MessageMapper.toDomain(message));
}

const getMessageById = async ({id}: {id: number}): Promise<Message> => {
    const message = await database.message.findUnique({ where: { messageid: id } });
    if(!message) throw new Error("No message found");
    return MessageMapper.toDomain(message);
}

const deleteMessageById = async ({id}: {id: number}): Promise<boolean> => {
    return Boolean(await database.notification.deleteMany({where: { messageid: id }}) && await database.message.delete({ where: { messageid: id } }));
}

const updateMessage = async ({ id }: { id: number },{ data }: { data: Partial<Message> }): Promise<Message> => {
    const messageToUpdate = MessageMapper.toPersistence(data as Message);
    const updatedMessage = await database.message.update({where: { messageid: id },data: messageToUpdate});
    return MessageMapper.toDomain(updatedMessage);
};

export default {
    createMessage,
    getAllMessages,
    getAllMessagesByChatId,
    getMessageById,
    deleteMessageById,
    updateMessage
}
