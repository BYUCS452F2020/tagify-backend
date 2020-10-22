import IUserDao from "../interface/IUserDao";
import AddUserRequest from "../../request_models/AddUserRequest";
import User from "../../data_models/User";

export default class TestUserDao implements IUserDao {
    addUser(user: AddUserRequest) : User {
        return {
            id: 1,
            spotifyId: user.spotifyId,
            firstName: user.firstName,
            lastName: user.lastName,
        };
    }
}