import { User } from '../domain/model/user';
import userDB from '../domain/data-access/user.db';
import userDb from '../domain/data-access/user.db';


const createUser = async (user: User): Promise<User> => {
    if(!user) throw new Error("An user must be provided")
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailRegex.test(user.email)) throw new Error("Email must be valid")

    const userUnique = await userDB.getUserByEmail({email: user.email})
    if(userUnique) throw new Error("An user with this email already exist")

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

const getAllUsersByName = async (name: string): Promise<User[]> => {
    if(!name) throw new Error('Name must be provided');
    const users = await userDB.getAllUsersByName({name: name});
    if(!users) throw new Error('No users found');
    return users;
}

const loginUser = async (email: string, password: string): Promise<User> => {
    const user = await userDB.getUserByEmail({email: email});
    if(!user) throw new Error('User not found');
    if(user.password != password) throw new Error("Password incorrect")
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
    loginUser,
    getAllUsersByName,
    getUserById,
    deleteUserById,
    updateUser,
};
