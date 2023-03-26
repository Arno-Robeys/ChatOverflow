import { User } from '../domain/model/user';
import userDB from '../domain/data-access/user.db';

const getAllUsers = async (): Promise<User[]> => {
    return userDB.getAllUsers();
};

const createUser = async (user: User): Promise<User> => {

    if(!user.firstname || !user.lastname || !user.password) throw new Error("All fields must be provided")

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailRegex.test(user.email)) throw new Error("Email must be valid")

    return userDB.createUser(user);
  };

const getAllUsersByName = async (name: string): Promise<User[]> => {
    if(!name) throw new Error('Name must be provided');
    const users = await userDB.getAllUsersByName({name: name});
    if(!users) throw new Error('No users found');
    return users;
}

const getUserById = async (userid: string): Promise<User> => {
    if(Number.isNaN(Number(userid))) throw new Error('Id must be numeric');

    const user = await userDB.getUserById({id: parseInt(userid)});

    return user;
};

const loginUser = async (email: string, password: string): Promise<User> => {
    if(!email) throw new Error('Email must be provided');
    if(!password) throw new Error('Password must be provided');
    const user = await userDB.getUserByEmail({email: email});
    if(user.password != password) throw new Error("Password incorrect")
    return user;
};

const deleteUserById = async ({id}: {id: string}): Promise<boolean> => {
    if(Number.isNaN(Number(id))) throw new Error('Id must be numeric');

    try {
        return await userDB.deleteUserById({id: parseInt(id)});
    } catch(err) {
        throw new Error('User could not be deleted');
    }
};
  
const updateUser = async ({ id }: { id: string },{ data }: { data: Partial<User> }): Promise<User> => {
    if(Number.isNaN(Number(id))) throw new Error('Id must be numeric');

    return userDB.updateUser({id: parseInt(id)}, { data: data });
};

const getUserAndProfileById = async (id: string): Promise<User> => {
    if(Number.isNaN(Number(id))) throw new Error('Id must be numeric');
    return userDB.getUserAndProfileById({id: parseInt(id)});
}




export default {
    createUser,
    getAllUsers,
    loginUser,
    getUserById,
    getAllUsersByName,
    deleteUserById,
    updateUser,
    getUserAndProfileById
};
