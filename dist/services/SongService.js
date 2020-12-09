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
const daoFacotry_1 = require("../daos/daoFacotry");
class SongService {
    addSongs(addSongsRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = addSongsRequest.userId;
            const songSpotifyIds = addSongsRequest.songs;
            const userSongDao = daoFacotry_1.UserSongDaoFactory.create();
            const songDao = daoFacotry_1.SongDaoFactory.create();
            const userDao = daoFacotry_1.UserDaoFactory.create();
            const user = yield userDao.getUser(userId);
            if (user == null) {
                return null;
            }
            const songs = yield songDao.addSongs(songSpotifyIds);
            const songIds = songs.map(s => s.id); //Cant get the songs ids this way because some might not be added correctly
            const userSongs = yield userSongDao.addUserSongs(userId, songIds);
            return {
                songs: songs,
                userSongs: userSongs,
            };
        });
    }
    getTagSongs(getTagSongRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const songDao = daoFacotry_1.SongDaoFactory.create();
            const userId = getTagSongRequest.userId;
            const tagId = getTagSongRequest.tagId;
            const songs = yield songDao.getUserSongsFromTag(userId, tagId);
            return {
                songs: songs,
            };
        });
    }
    getUserSongs(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSongDao = daoFacotry_1.UserSongDaoFactory.create();
            const songs = yield userSongDao.getUserSongs(userId);
            return {
                songs: songs
            };
        });
    }
}
exports.default = SongService;
//# sourceMappingURL=SongService.js.map