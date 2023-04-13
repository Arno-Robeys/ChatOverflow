import { Profile } from '../domain/model/profile';
import profileDB from '../domain/data-access/profile.db';


const createProfile = async (profile: Profile): Promise<Profile> => {
    if(!profile) throw new Error("A profile must be provided")
    return profileDB.createProfile(profile);
};

const getAllProfiles = async (): Promise<Profile[]> => {
    return profileDB.getAllProfiles();
};

const getProfileById = async ({id}: {id: string}): Promise<Profile> => {
    if(!id) throw new Error("A profile id must be provided")
    if(isNaN(Number(id))) throw new Error("A profile id must be a number")
    return profileDB.getProfileById({id: parseInt(id)});
}

const deleteProfileById = async ({id}: {id: string}): Promise<boolean> => {
    if(!id) throw new Error("A profile id must be provided")
    if(isNaN(Number(id))) throw new Error("A profile id must be a number")
    try {
        const deleteProfile = await profileDB.deleteProfileById({id: parseInt(id)});
        return true;
    } catch(err) {
        throw new Error("A profile with that id does not exist")
    }
}

const updateProfile = async ({ id }: { id: string },{ data }: { data: Partial<Profile> }): Promise<Profile> => {
    if(!id) throw new Error("A user id must be provided")
    if(isNaN(Number(id))) throw new Error("A user id must be a number")
    if(!data) throw new Error("A profile data must be provided")
    return profileDB.updateProfile({id: parseInt(id)}, {data});
}

export default {
    createProfile,
    getAllProfiles,
    deleteProfileById,
    updateProfile,
    getProfileById
}