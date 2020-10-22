import AddUserRequest from "../../request_models/AddUserRequest";
import User from "../../data_models/User";

export default interface IUserDao {
    addUser(user: AddUserRequest) : Promise<User>;
}