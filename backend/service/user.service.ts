import { User } from '../domain/model/user';
import userDB from '../domain/data-access/user.db';
import userDb from '../domain/data-access/user.db';


const createUser = async (user: User): Promise<User> => {
    if(!user) throw new Error("An user must be provided")

    return userDB.createUser(user);
  };

const getAllUsers = async (): Promise<User[]> => {
    return userDB.getAllUsers();
};

const getUserById = async (userid: string): Promise<User> => {
    if(Number.isNaN(Number(userid))) throw new Error('Id must be numeric');

    const user = await userDB.getUserById({id: parseInt(userid)});

    if(!user) throw new Error('User not found');
    return user;
};

const deleteUserById = async ({id}: {id: string}): Promise<boolean> => {
    if(Number.isNaN(Number(id))) throw new Error('Id must be numeric');

    const userDelete = await userDB.deleteUserById({id: parseInt(id)});

    if(!userDelete) throw new Error("No user found to delete")
    return userDelete
};
  
const updateUser = async ({ id }: { id: string },{ data }: { data: Partial<User> }): Promise<User> => {
    if(Number.isNaN(Number(id))) throw new Error('Id must be numeric');

    return userDb.updateUser({id: parseInt(id)}, { data: data });
};



export default {
    createUser,
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUser,
};
