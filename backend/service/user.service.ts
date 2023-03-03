import { User } from '../domain/model/user';
import userDB from '../domain/data-access/user.db';


const getAllUsers = async (): Promise<User[]> => {
    return userDB.getAllUsers();
};

const getUserById = async (userid: string): Promise<User> => {
    if(Number.isNaN(Number(userid))) throw new Error('Id must be numeric');

    const user = await userDB.getUserById({id: parseInt(userid)});

    if(!user) throw new Error('User not found');
    return user;
}



export default {
    getAllUsers,
    getUserById
};
