"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sql = require('mssql');
require('dotenv').config();
const sqlconfig_1 = require("../../sqlconfig");
class SqlTagDao {
    getUserTagsFromSong(userId, songId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield sql.connect(sqlconfig_1.default.string());
            try {
                let queryString = `select Tags.Id, Tags.UserId, Tags.Name from Songs ` +
                    `join SongTags on Songs.Id = SongTags.SongId ` +
                    `join Tags on Tags.Id = SongTags.TagId ` +
                    `where Songs.Id = ${songId} and Tags.UserId = ${userId} `;
                let result = yield sql.query(queryString);
                let tags = this.tagsFromResult(result);
                return tags;
            }
            catch (_a) {
                return null;
            }
        });
    }
    tagsFromResult(result) {
        return result.recordset.map(t => {
            return {
                id: t.Id,
                userId: t.UserId,
                name: t.Name,
            };
        });
    }
    addTag(tagName, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield sql.connect(sqlconfig_1.default.string());
            try {
                let queryString = `insert into Tags (UserId, Name) values (${userId}, '${tagName}')`;
                const result = yield sql.query(queryString);
                console.log(result);
                if (result.rowsAffected[0] == 0) {
                    return null;
                }
                const result2 = yield sql.query(`select * from Tags where Id = @@Identity`);
                const record = result2.recordset[0];
                if (record.UserId != userId || record.Name != tagName) {
                    console.log("here");
                    return null;
                }
                return {
                    id: record.id,
                    userId: record.UserId,
                    name: record.Name
                };
            }
            catch (e) {
                console.error(e);
                return null;
            }
        });
    }
    deleteTag(tagName, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield sql.connect(sqlconfig_1.default.string());
            try {
                let queryString = `delete from Tags where UserId = ${userId} AND Name = '${tagName}'`;
                const result = yield sql.query(queryString);
                console.log(result);
                if (result.rowsAffected[0] == 0) {
                    return null;
                }
                return {
                    success: true
                };
            }
            catch (e) {
                console.error(e);
                return null;
            }
        });
    }
    addSongTag(tagId, songId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield sql.connect(sqlconfig_1.default.string());
            try {
                let queryString = `insert into SongTags (TagId, SongId) values (${tagId}, ${songId})`;
                const result = yield sql.query(queryString);
                console.log(result);
                if (result.rowsAffected[0] == 0) {
                    return null;
                }
                return {
                    songId: songId,
                    tagId: tagId
                };
            }
            catch (e) {
                console.error(e);
                return null;
            }
        });
    }
    deleteSongTag(tagId, songId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield sql.connect(sqlconfig_1.default.string());
            try {
                let queryString = `delete from SongTags where songId=${songId} AND tagId=${tagId}`;
                const result = yield sql.query(queryString);
                console.log(result);
                if (result.rowsAffected[0] == 0) {
                    return false;
                }
                return true;
            }
            catch (e) {
                console.error(e);
                return false;
            }
        });
    }
}
exports.default = SqlTagDao;
//# sourceMappingURL=SqlTagDao.js.map