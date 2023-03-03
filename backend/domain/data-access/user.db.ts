import { User } from '../model/user';
import database from '../data-access/prisma/database';
import { UserMapper } from './user.mapper';

const createUser = async (user: User): Promise<User> => {
  return await database.user.create({data : user});
};

const getAllUsers = async (): Promise<User[]> => {
  return database.user.findMany();
}

const getUserById = async ({id}: {id: number}): Promise<User> => {
  return await database.user.findUnique({ where: { userid: id } })
}

const deleteUserById = async ({id}: {id: number}): Promise<boolean> => {
  return ;
}

const updateUser = async ({id}: {id: number}, {data}: {data: Partial<User>}): Promise<User> => {
  return await database.user.update({ where: { userid: id }, data: data })
}

export default {
  createUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser
};

