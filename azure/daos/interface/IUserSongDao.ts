import UserSong from "../../data_models/UserSong";

export default interface IUserSongDao {
    addUserSong(userId: number, songId: number) : Promise<UserSong>;
    addUserSongs(userId: number, songIds: number[]) : Promise<UserSong[]>;
    getUserSongs(userId: number) : Promise<UserSong[]>;
}