import { User } from '../domain/model/user';
import userDB from '../domain/data-access/user.db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserLogin } from '../types/userLogin.type';

const getAllUsers = async (): Promise<User[]> => {
    return userDB.getAllUsers();
};

const createUser = async (firstname: string, lastname: string, email: string, password: string): Promise<User> => {
    if(!firstname.trim() || !lastname.trim() || !password.trim()) throw new Error("All fields must be provided")

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const pass = await bcrypt.hash(password, 12);
    if(!emailRegex.test(email)) throw new Error("Email must be valid")
    return await userDB.createUser(new User({firstname: firstname, lastname: lastname, email: email, password: pass}));
  };

const getAllUsersByName = async (name: string): Promise<User[]> => {
    if(!name) throw new Error('Name must be provided');
    const users = await userDB.getAllUsersByName({name: name});
    if(!users || users.length === 0) throw new Error('No users found');
    return users;
}

const getUserById = async (userid: string): Promise<User> => {
    if(Number.isNaN(Number(userid))) throw new Error('Id must be numeric');

    const user = await userDB.getUserById({id: parseInt(userid)});

    return user;
};

const loginUser = async (email: string, password: string): Promise<UserLogin> => {
    if(!email) throw new Error('Email must be provided');
    if(!password) throw new Error('Password must be provided');
    const user = await userDB.getUserByEmail({email: email});
    const check = await bcrypt.compare(password, user.password);
    if(!check) throw new Error("Password incorrect")
    return { userid: user.userid, firstname: user.firstname, lastname: user.lastname, email: user.email , token: generateJwtToken(email)};
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
    if(!data) throw new Error('Data must be provided');
    if(!data.firstname.trim() || !data.lastname.trim()) throw new Error('Firstname and Lastname must be provided');
    if(data.profile.description.length > 400) throw new Error('Description mag maximaal 400 characters zijn')
    
    return userDB.updateUser({id: parseInt(id)}, { data: data });
};

const getUserAndProfileById = async (id: string): Promise<User> => {
    if(Number.isNaN(Number(id))) throw new Error('Id must be numeric');
    return userDB.getUserAndProfileById({id: parseInt(id)});
}

const generateJwtToken = (email: string) => {
    try {
        const token = jwt.sign({email: email}, process.env.JWT_SECRET, {expiresIn: `${process.env.JWT_EXPIRES_HOUR}h`, issuer: "whatt"});
        return token;
    } catch(err) {
        throw new Error('Token could not be generated');
    }
}




export default {
    createUser,
    getAllUsers,
    loginUser,
    getUserById,
    getAllUsersByName,
    deleteUserById,
    updateUser,
    getUserAndProfileById,
};
