import Tag from "../../data_models/Tag";
import SongTag from "../../data_models/SongTag";

export default interface ITagDao {
    getUserTagsFromSong(userId: number, songId: number) : Promise<Tag[]>;
    addTag(tagName: String, userId: number) : Promise<Tag>;
    deleteTag(tagName: String, userId: number) : Promise<any>;
    addSongTag(tagId: number, songId: number) : Promise<SongTag>;
}