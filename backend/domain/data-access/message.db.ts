import { Message } from '../model/message';
import database from './prisma/database';
import { MessageMapper } from './message.mapper';

const createMessage = async (message: Message): Promise<Message> => {
    return ;
};

const getAllMessages = async (): Promise<Message[]> => {
    const messages = await database.message.findMany()
    return messages.map((message) => MessageMapper.toDomain(message));

}

const getAllMessagesByChatId = async ({chatid}: {chatid: number}): Promise<Message[]> => {
    const messages = await database.message.findMany({where: {chatid: chatid}})
    return messages.map((message) => MessageMapper.toDomain(message));
}

const getMessageById = async ({id}: {id: number}): Promise<Message> => {
    return MessageMapper.toDomain(await database.message.findUnique({ where: { messageid: id } }));
}

const deleteMessageById = async ({id}: {id: number}): Promise<boolean> => {
    return Boolean(await database.message.delete({ where: { messageid: id } }));
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
