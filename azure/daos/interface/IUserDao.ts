import AddUserRequest from "../../request_models/AddUserRequest";
import User from "../../data_models/User";

export default interface IUserDao {
    getUser(id: number) : Promise<User>;
    addUser(user: AddUserRequest) : Promise<User>;
    deleteUser(id: number) : Promise<boolean>;
    deleteUserFromSpotifyId(spotifyId: string) : Promise<boolean>;
}