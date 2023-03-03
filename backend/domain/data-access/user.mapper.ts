import { User as PrismaUser } from "@prisma/client";
import { User } from "../model/user";

export class UserMapper {
    static toDomain(prismaUser: PrismaUser): User {
        return ;
    }

    static toPersistence(user: User): PrismaUser {
        return ;
    }

}
