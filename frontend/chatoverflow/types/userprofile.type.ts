export type UserProfile = {
    userid: number;
    firstname: string;
    lastname: string;
    nickname: string;
    email: string;
    profile: {
        avatar: string;
        description: string;
        education: string;
        hobby: string;
        rating: number;
        tags: string;
        work: string;
    }}