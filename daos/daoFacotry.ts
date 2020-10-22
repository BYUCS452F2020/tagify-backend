import IUserDao from "./interface/IUserDao";
import SqlUserDao from "./sql/SqlUserDao";
import TestUserDao from "./test/TestUserDao";

let impl = "test";

export const UserDaoFactory = class {
    static create() : IUserDao {
        switch (impl) {
            case "test":
                return new TestUserDao();
            case "sql":
                return new SqlUserDao();
            default:
                throw new Error("Unknown UserDao implementation");
        }
    }
}