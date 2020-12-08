import { TagDaoFactory } from "../daos/daoFacotry";
import Tag from "../data_models/Tag";
import UserSongTag from "../data_models/UserSongTag";
import GetUserSongTagsRequest from "../request_models/GetUserSongTagsRequest";
import GetUserSongTagsResult from "../result_models/GetUserSongTagsResult";
import SqlTagDao from "../daos/sql/SqlTagDao";

export default class TagService {
    async getUserSongTags(getUserSongTagsRequest: GetUserSongTagsRequest) : Promise<GetUserSongTagsResult> {
        const tagDao = TagDaoFactory.create();

        const userId = getUserSongTagsRequest.userId;
        const songId = getUserSongTagsRequest.songId;
        const tags = await tagDao.getUserTagsFromSong(userId, songId)

        return {
            tags: tags
        }
    }

    async addUserSongTag(userId: number, tagId: number, userSongId: number) : Promise<UserSongTag> {
        const tagDao = TagDaoFactory.create();
        return await tagDao.addUserSongTag(userId, tagId, userSongId);
    }

    async deleteUserSongTag(tagId: number, songId: number) : Promise<boolean> {
        const tagDao = TagDaoFactory.create();
        return await tagDao.deleteUserSongTag(tagId, songId);
    }

    async addTag(tagName: String, userId: number) : Promise<Tag> {
        const tagDao = TagDaoFactory.create();
        return await tagDao.addTag(tagName, userId);
    }

    async deleteTag(tagName: String, userId: number) : Promise<Tag> {
        const tagDao = TagDaoFactory.create();
        return await tagDao.deleteTag(tagName, userId);
    }
}