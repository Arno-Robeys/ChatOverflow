import { User as PrismaUser } from "@prisma/client";
import { User } from "../model/user";

export class UserMapper {
    static toDomain(prismaUser: PrismaUser): User {
        return new User({
            firstname: prismaUser.firstname,
            lastname: prismaUser.lastname,
            email: prismaUser.email,
            password: prismaUser.password,
            userid: prismaUser.userid,
            nickname: prismaUser.nickname,
        })
    }

    static toPersistence(user: User): Omit<PrismaUser,'userid'> {
        return { firstname: user.firstname, lastname: user.lastname, password: user.password, nickname: user.nickname, email: user.email }
    }

}
