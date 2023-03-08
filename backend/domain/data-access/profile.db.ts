import { Profile } from '../model/profile';
import database from '../data-access/prisma/database';
import { ProfileMapper } from './profile.mapper';

const createProfile = async (profile: Profile): Promise<Profile> => {
    return ProfileMapper.toDomain(await database.profile.create({data : ProfileMapper.toPersistence(profile)}));
};

const getAllProfiles = async (): Promise<Profile[]> => {;
    const profiles = await database.profile.findMany()
    if(!profiles) throw new Error("No profiles found");
    return profiles.map((profile) => ProfileMapper.toDomain(profile));
}

const getProfileById = async ({id}: {id: number}): Promise<Profile> => {
    const profile = await database.profile.findUnique({ where: { userid: id } });
    if(!profile) throw new Error("Profile not found");
    return ProfileMapper.toDomain(profile);
}

const updateProfile = async ({ id }: { id: number },{ data }: { data: Partial<Profile> }): Promise<Profile> => {
    const profileToUpdate = ProfileMapper.toPersistence(data as Profile);
    const updatedProfile = await database.profile.update({where: { userid: id },data: profileToUpdate});
    return ProfileMapper.toDomain(updatedProfile);
}

const deleteProfileById = async ({id}: {id: number}): Promise<boolean> => {
    return Boolean(await database.profile.delete({ where: { userid: id } }));
}

export default {
    createProfile,
    getAllProfiles,
    getProfileById,
    deleteProfileById,
    updateProfile
};