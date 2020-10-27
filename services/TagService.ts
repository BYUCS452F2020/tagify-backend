import { TagDaoFactory } from "../daos/daoFacotry";
import Tag from "../data_models/Tag";
import GetSongTagsRequest from "../request_models/GetSongTagsRequest";
import GetSongTagsResult from "../result_models/GetSongTagsResult";

export default class TagService {
    async getSongTags(getSongTagsRequest: GetSongTagsRequest) : Promise<GetSongTagsResult> {
        const tagDao = TagDaoFactory.create();

        const userId = getSongTagsRequest.userId;
        const songId = getSongTagsRequest.songId;
        const tags = await tagDao.getUserTagsFromSong(userId, songId)

        return {
            tags: tags,
        }
    }

    async addTag(tagName: String, userId: number) : Promise<Tag> {
        const tagDao = TagDaoFactory.create();
        return await tagDao.addTag(tagName, userId);
    }
}