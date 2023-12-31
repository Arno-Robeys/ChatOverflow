export type UserProfile = {
    userid: number;
    firstname: string;
    lastname: string;
    nickname: string;
    email: string;
    profile: {
        avatar: string | null;
        description: string;
        education: string;
        hobby: string;
        tags: string;
        work: string;
    }}