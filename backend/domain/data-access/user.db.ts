import { User } from '../model/user';
import database from '../data-access/prisma/database';
import { UserMapper } from './user.mapper';

const createUser = async (user: User): Promise<User> => {
  return UserMapper.toDomain(await database.user.create({data: UserMapper.toPersistence(user)}));
};

const getAllUsers = async (): Promise<User[]> => {;
  const users = await database.user.findMany()
  if(!users) throw new Error("No users found");
  return users.map((user) => UserMapper.toDomain(user));
}

const getAllUsersByName = async ({name}: {name: string}): Promise<User[]> => {
  const users = await database.user.findMany({
    where: {
      OR: [
        { firstname: { contains: name, mode: "insensitive" } },
        { lastname: { contains: name, mode: "insensitive" } },
        { nickname: { contains: name, mode: "insensitive" } },
        { AND: [
            { firstname: { contains: name.split(' ')[0], mode: "insensitive" } },
            { lastname: { contains: name.split(' ')[1], mode: "insensitive" } },
          ]}]}})
  if(!users) throw new Error("No users found");
  return users.map((user) => UserMapper.toDomain(user));
}

const getUserById = async ({id}: {id: number}): Promise<User> => {
  const user = await database.user.findUnique({ where: { userid: id } });
  if(!user) throw new Error("User not found");
  return UserMapper.toDomain(user);
}

const getUserAndProfileById = async ({id}: {id: number}): Promise<User> => {
  const user = await database.user.findUnique({ where: { userid: id }, include: { profile: true } });
  if(!user) throw new Error("User not found");
  return UserMapper.toDomain(user);
}

const getUserByEmail = async ({email}: {email: string}): Promise<User> => {
  const user = await database.user.findUnique({ where: { email: email } });
  if(!user) throw new Error("Invalid email");
  return UserMapper.toDomain(user);
}

const deleteUserById = async ({id}: {id: number}): Promise<boolean> => {
  return Boolean(await database.user.delete({ where: { userid: id } }));
}

const updateUser = async ({ id }: { id: number },{ data }: { data: Partial<User> }): Promise<User> => {
  const userToUpdate = UserMapper.toPersistence(data as User);
  const updatedUser = await database.user.update({where: { userid: id }, data: userToUpdate, include: { profile: true }});
  return UserMapper.toDomain(updatedUser);
};

export default {
  createUser,
  getAllUsers,
  getAllUsersByName,
  getUserById,
  getUserByEmail,
  deleteUserById,
  updateUser,
  getUserAndProfileById,
};

