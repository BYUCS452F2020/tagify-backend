import Song from "../../data_models/Song";

export default interface ISongDao {
    addSong(spotifyId: string) : Promise<Song>;
    addSongs(spotifyIds: string[]) : Promise<Song[]>;

    getUserSongsFromTag(userId: number, tagId: number) : Promise<Song[]>;
    generatePlaylist(userId: number, songQuery: string[][]) : Promise<Song[]>;
}