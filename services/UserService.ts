import AddUserRequest from '../request_models/AddUserRequest';
import User from '../data_models/User';
import { UserDaoFactory } from '../daos/daoFacotry';

export default class UserService {
    /**
     * Adds a new user to the system
     * @param addUserRequest Encapsulates the data of the user being added
     * @returns The user that was added to the system
     */
    addUser(addUserRequest: AddUserRequest) : User {
        const dao = UserDaoFactory.create();
        const user = dao.addUser(addUserRequest);
        
        return user;
    }
}