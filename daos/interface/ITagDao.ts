import Tag from "../../data_models/Tag";

export default interface ITagDao {
    getUserTagsFromSong(userId: number, songId: number) : Promise<Tag[]>;
    addTag(tagName: String, userId: number) : Promise<Tag>;
    deleteTag(tagName: String, userId: number) : Promise<any>;
}