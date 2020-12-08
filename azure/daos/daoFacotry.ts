import FirestoreSongDao from "./firestore/FirestoreSongDao";
import ISongDao from "./interface/ISongDao";
import ITagDao from "./interface/ITagDao";
import IUserDao from "./interface/IUserDao";
import IUserSongDao from "./interface/IUserSongDao";
import SqlSongDao from "./sql/SqlSongDao";
import SqlTagDao from "./sql/SqlTagDao";
import SqlUserDao from "./sql/SqlUserDao";
import SqlUserSongDao from "./sql/SqlUserSongDao";

export const UserDaoFactory = class {
    static create() : IUserDao {
        return new SqlUserDao();
    }
}

export const SongDaoFactory = class {
    static create() : ISongDao {
        return new FirestoreSongDao();
    }
}

export const UserSongDaoFactory = class {
    static create() : IUserSongDao {
        return new SqlUserSongDao();
    }
}

export const TagDaoFactory = class {
    static create() : ITagDao {
        return new SqlTagDao();
    }
}