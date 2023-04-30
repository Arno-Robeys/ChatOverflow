import { Prisma, User as PrismaUser } from "@prisma/client";
import { User } from "../model/user";
import { Profile as PrismaProfile } from "@prisma/client";
import { ProfileMapper } from "./profile.mapper";
import { Profile } from "../model/profile";

export class UserMapper {
    static toDomain(prismaUser: PrismaUser & { profile?: PrismaProfile}): User {
        return new User({
            firstname: prismaUser.firstname,
            lastname: prismaUser.lastname,
            email: prismaUser.email,
            password: prismaUser.password,
            userid: prismaUser.userid,
            nickname: prismaUser.nickname,
            profile: prismaUser.profile ? ProfileMapper.toDomain(prismaUser.profile) : undefined
        })
    }


    static toPersistence(user: User & { profile?: Profile}): Omit<PrismaUser, 'userid'> {
        const profileData = user.profile ? { profile: { update: ProfileMapper.toPersistence(user.profile) } } : {};
        return {firstname: user.firstname, lastname: user.lastname, password: user.password, nickname: user.nickname, email: user.email, ...profileData};
      }

}
