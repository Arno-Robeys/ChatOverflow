import { Profile as PrismaProfile } from "@prisma/client";
import { Profile } from "../model/profile";

export class ProfileMapper {
    static toDomain(prismaProfile: PrismaProfile): Profile {
        return new Profile({
            userid: prismaProfile.userid,
            description: prismaProfile.description,
            avatar: prismaProfile.avatar,
            work: prismaProfile.work,
            education: prismaProfile.education,
            hobby: prismaProfile.hobby,
            tags: prismaProfile.tags,
        })
    }

    static toPersistence(profile: Profile): PrismaProfile {
        return {userid: profile.userid, description: profile.description, avatar: profile.avatar, work: profile.work, education: profile.education, hobby: profile.hobby, tags: profile.tags }
    }

}
