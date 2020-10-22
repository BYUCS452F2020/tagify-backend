import IUserDao from "./interface/IUserDao";
import SqlUserDao from "./sql/SqlUserDao";

export const UserDaoFactory = class {
    static create() : IUserDao {
        return new SqlUserDao();
    }
}