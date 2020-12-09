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
class TagService {
    getSongTags(getSongTagsRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const tagDao = daoFacotry_1.TagDaoFactory.create();
            const userId = getSongTagsRequest.userId;
            const songId = getSongTagsRequest.songId;
            const tags = yield tagDao.getUserTagsFromSong(userId, songId);
            return {
                tags: tags
            };
        });
    }
    addSongTag(tagId, songId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tagDao = daoFacotry_1.TagDaoFactory.create();
            return yield tagDao.addSongTag(tagId, songId);
        });
    }
    deleteSongTag(tagId, songId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tagDao = daoFacotry_1.TagDaoFactory.create();
            return yield tagDao.deleteSongTag(tagId, songId);
        });
    }
    addTag(tagName, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tagDao = daoFacotry_1.TagDaoFactory.create();
            return yield tagDao.addTag(tagName, userId);
        });
    }
    deleteTag(tagName, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tagDao = daoFacotry_1.TagDaoFactory.create();
            return yield tagDao.deleteTag(tagName, userId);
        });
    }
}
exports.default = TagService;
//# sourceMappingURL=TagService.js.map