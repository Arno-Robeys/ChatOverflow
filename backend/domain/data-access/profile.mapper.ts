import { Profile as PrismaProfile } from "@prisma/client";
import { Profile } from "../model/profile";

export class ProfileMapper {
    static toDomain(prismaUser: PrismaProfile): Profile {
        return new Profile({
            userid: prismaUser.userid,
            description: prismaUser.description,
            avatar: prismaUser.avatar,
            work: prismaUser.work,
            education: prismaUser.education,
            hobby: prismaUser.hobby,
            tags: prismaUser.tags,
        })
    }

    static toPersistence(user: Profile): PrismaProfile {
        return {userid: user.userid, description: user.description, avatar: user.avatar, work: user.work, education: user.education, hobby: user.hobby, tags: user.tags }
    }

}
