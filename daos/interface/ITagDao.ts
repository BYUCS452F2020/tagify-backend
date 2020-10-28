import Tag from "../../data_models/Tag";
import UserSongTag from "../../data_models/UserSongTag";

export default interface ITagDao {
    getUserTagsFromSong(userId: number, songId: number) : Promise<Tag[]>;
    addTag(tagName: String, userId: number) : Promise<Tag>;
    deleteTag(tagName: String, userId: number) : Promise<any>;
    addUserSongTag(userId: number, tagId: number, userSongId: number) : Promise<UserSongTag>;
    deleteUserSongTag(tagId: number, userSongId: number) : Promise<boolean>;
}