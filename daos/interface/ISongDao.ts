import Song from "../../data_models/Song";

export default interface ISongDao {
    addSong(spotifyId: string) : Promise<Song>;
    addSongs(spotifyIds: string[]) : Promise<Song[]>;
}