import IUserDao from "../interface/IUserDao";
import AddUserRequest from "../../request_models/AddUserRequest";
import User from "../../data_models/User";

export default class SqlUserDao implements IUserDao {
    addUser(user: AddUserRequest) : User {
        return null;
    }
}