import AddUserRequest from '../request_models/AddUserRequest';
import User from '../data_models/User';
import { UserDaoFactory } from '../daos/daoFacotry';

export default class UserService {
    /**
     * Adds a new user to the system
     * @param addUserRequest Encapsulates the data of the user being added
     * @returns The user that was added to the system
     */
    async addUser(addUserRequest: AddUserRequest) : Promise<User> {
        const dao = UserDaoFactory.create();
        const user = await dao.addUser(addUserRequest);
        
        return user;
    }

    async deleteUser(id: number) : Promise<boolean> {
        const dao = UserDaoFactory.create();
        const success = await dao.deleteUser(id);

        return success;
    }

    async deleteUserFromSpotifyId(spotifyId: string) : Promise<boolean> {
        const dao = UserDaoFactory.create();
        const success = await dao.deleteUserFromSpotifyId(spotifyId);

        return success;
    }
}