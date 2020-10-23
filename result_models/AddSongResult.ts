import Song from "../data_models/Song";
import UserSong from "../data_models/UserSong";

export interface AddSongResult {
    songs: Song[];
    userSongs: UserSong[];
}