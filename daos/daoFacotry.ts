import ISongDao from "./interface/ISongDao";
import IUserDao from "./interface/IUserDao";
import IUserSongDao from "./interface/IUserSongDao";
import SqlSongDao from "./sql/SqlSongDao";
import SqlUserDao from "./sql/SqlUserDao";
import SqlUserSongDao from "./sql/SqlUserSongDao";

export const UserDaoFactory = class {
    static create() : IUserDao {
        return new SqlUserDao();
    }
}

export const SongDaoFactory = class {
    static create() : ISongDao {
        return new SqlSongDao();
    }
}

export const UserSongDaoFactory = class {
    static create() : IUserSongDao {
        return new SqlUserSongDao();
    }
}