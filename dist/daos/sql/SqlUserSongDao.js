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
class SqlUserSongDao {
    addUserSong(userId, songId) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    addUserSongs(userId, songIds) {
        return __awaiter(this, void 0, void 0, function* () {
            yield sql.connect(sqlconfig_1.default.string());
            try {
                let existingQueryString = `select * from UserSongs where userId = ${userId} and (${songIds.map(s => `SongId = '${s}'`).join(' or ')})`;
                let existingResult = yield sql.query(existingQueryString);
                let existingUserSongs = this.userSongsFromResult(existingResult);
                let existingsSongIds = existingUserSongs.map(us => us.songId);
                songIds = songIds.filter((value) => existingsSongIds.indexOf(value) < 0);
                let userSongs = existingUserSongs;
                if (songIds.length > 0) {
                    let queryString = `insert into UserSongs (UserId, SongId) output inserted.Id, inserted.UserId, inserted.SongId values ${songIds.map(s => `('${userId}', '${s}')`)}`;
                    let result = yield sql.query(queryString);
                    userSongs = this.userSongsFromResult(result);
                }
                return userSongs;
            }
            catch (_a) {
                return null;
            }
        });
    }
    getUserSongs(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield sql.connect(sqlconfig_1.default.string());
            try {
                let queryString = `select Songs.SpotifyId, UserSongs.*
            from Songs join UserSongs
            on Songs.Id = UserSongs.SongId
            where UserSongs.UserId = ${userId}`;
                let result = yield sql.query(queryString);
                let songList = this.userSongsFromResult(result);
                return songList;
            }
            catch (e) {
                console.error(e);
                return null;
            }
        });
    }
    userSongsFromResult(result) {
        return result.recordset.map(s => {
            return {
                id: s.Id,
                userId: s.UserId,
                songId: s.SongId,
                spotifyId: s.SpotifyId
            };
        });
    }
}
exports.default = SqlUserSongDao;
//# sourceMappingURL=SqlUserSongDao.js.map