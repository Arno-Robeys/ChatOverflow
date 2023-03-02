import { Profile } from '../model/profile';

const profiles: Profile[] = [
    Profile.create({ userid: 1, description: 'dummy', avatar: 'dummy', work: 'dummy', hobby: 'dummy', rating: 'dummy', education: 'dummy', tags: 'dummy' }),
    Profile.create({ userid: 2, description: 'dummy2', avatar: 'dummy2', work: 'dummy2', hobby: 'dummy2', rating: 'dummy2', education: 'dummy2', tags: 'dummy2' }),
];

export class ProfileDao {
    async createProfile(profile: Profile): Promise<Profile> {
        return Profile.create({ userid: profile.userid, description: profile.description, avatar: profile.avatar, work: profile.work, hobby: profile.hobby, rating: profile.rating, education: profile.education, tags: profile.tags });
    }

    async getAllProfiles(): Promise<Profile[]> {
        return profiles;
    }
}
