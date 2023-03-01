import { PrismaClient } from '@prisma/client';
import { User } from '../model/user';

const prisma = new PrismaClient();

export class UserDao {
  async createUser(user: User): Promise<User> {
    return await prisma.user.create({ data: user });
  }

  async getUserById(userId: number): Promise<User | null> {
    return await prisma.user.findUnique({ where: { userid: userId } });
  }

  async updateUser(userId: number, data: Partial<User>): Promise<User | null> {
    return await prisma.user.update({ where: { userid: userId }, data: data });
  }

  async deleteUser(userId: number): Promise<User | null> {
    return await prisma.user.delete({ where: { userid: userId } });
  }

  async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany();
  }
}
