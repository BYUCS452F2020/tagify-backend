import Tag from "../../data_models/Tag";

export default interface ITagDao {
    getUserTagsFromSong(userId: number, songId: number) : Promise<Tag[]>;
}