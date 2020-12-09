"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagDaoFactory = exports.UserSongDaoFactory = exports.SongDaoFactory = exports.UserDaoFactory = void 0;
const SqlSongDao_1 = require("./sql/SqlSongDao");
const SqlTagDao_1 = require("./sql/SqlTagDao");
const SqlUserDao_1 = require("./sql/SqlUserDao");
const SqlUserSongDao_1 = require("./sql/SqlUserSongDao");
exports.UserDaoFactory = class {
    static create() {
        return new SqlUserDao_1.default();
    }
};
exports.SongDaoFactory = class {
    static create() {
        return new SqlSongDao_1.default();
    }
};
exports.UserSongDaoFactory = class {
    static create() {
        return new SqlUserSongDao_1.default();
    }
};
exports.TagDaoFactory = class {
    static create() {
        return new SqlTagDao_1.default();
    }
};
//# sourceMappingURL=daoFacotry.js.map