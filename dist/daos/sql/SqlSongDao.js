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
class SqlSongDao {
    addSong(spotifyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    addSongs(spotifyIds) {
        return __awaiter(this, void 0, void 0, function* () {
            yield sql.connect(sqlconfig_1.default.string());
            try {
                let existingQueryString = `select * from Songs where ${spotifyIds.map(s => `SpotifyId = '${s}'`).join(' or ')}`;
                let existingResult = yield sql.query(existingQueryString);
                let existingSongs = this.songsFromResult(existingResult);
                let existingSpotifyIds = existingSongs.map(s => s.spotifyId);
                spotifyIds = spotifyIds.filter((value) => existingSpotifyIds.indexOf(value) < 0);
                let songs = existingSongs;
                if (spotifyIds.length > 0) {
                    let queryString = `insert into Songs (SpotifyId) output inserted.Id, inserted.SpotifyId values ${spotifyIds.map(s => `('${s}')`)}`;
                    let result = yield sql.query(queryString);
                    songs = songs.concat(this.songsFromResult(result));
                }
                return songs;
            }
            catch (_a) {
                return null;
            }
        });
    }
    getUserSongsFromTag(userId, tagId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield sql.connect(sqlconfig_1.default.string());
            try {
                let queryString = `select Songs.Id, Songs.SpotifyId from Tags ` +
                    `join SongTags on Tags.Id = SongTags.TagId ` +
                    `join Songs on Songs.Id = SongTags.SongId ` +
                    `where Tags.Id = ${tagId} and Tags.UserId = ${userId} `;
                let result = yield sql.query(queryString);
                let songs = this.songsFromResult(result);
                return songs;
            }
            catch (_a) {
                return null;
            }
        });
    }
    songsFromResult(result) {
        return result.recordset.map(s => {
            return {
                id: s.Id,
                spotifyId: s.SpotifyId,
            };
        });
    }
}
exports.default = SqlSongDao;
//# sourceMappingURL=SqlSongDao.js.map