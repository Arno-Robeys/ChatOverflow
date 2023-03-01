import { User } from '../model/user';
import { PrismaClient } from '@prisma/client';

export class UserMapper {
  static toUser(prismaUser: PrismaClient): User {
    const user: User = {
      userid: prismaUser.userid,
      firstname: prismaUser.firstname,
      lastname: prismaUser.lastname,
      email: prismaUser.email,
      password: prismaUser.password,
      nickname: prismaUser.nickname || undefined,
    };

    return user;
  }

  static toPrismaUser(user: User): PrismaClient {
    const prismaUser: PrismaClient = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      nickname: user.nickname || null,
    };

    return prismaUser;
  }
}
