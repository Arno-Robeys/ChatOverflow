import { Profile } from '../domain/model/profile';
import profileDB from '../domain/data-access/profile.db';


const createProfile = async (profile: Profile): Promise<Profile> => {
    if(!profile) throw new Error("A profile must be provided")
    return profileDB.createProfile(profile);
};

const getAllProfiles = async (): Promise<Profile[]> => {
    return profileDB.getAllProfiles();
};

const getProfileById = async ({id}: {id: number}): Promise<Profile> => {
    return profileDB.getProfileById({id: id});
}

export default {
    createProfile,
    getAllProfiles
}