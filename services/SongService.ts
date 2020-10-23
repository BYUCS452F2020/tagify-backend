import { SongDaoFactory, UserDaoFactory, UserSongDaoFactory } from "../daos/daoFacotry";
import AddSongsRequest from "../request_models/AddSongsRequest";
import GetTagSongsRequest from "../request_models/GetTagSongsRequest";
import AddSongResult from "../result_models/AddSongResult";
import GetTagSongsResult from "../result_models/GetTagSongsResult";

export default class SongService {
    async addSongs(addSongsRequest: AddSongsRequest): Promise<AddSongResult> {
        const userId = addSongsRequest.userId;
        const songSpotifyIds = addSongsRequest.songs;

        const userSongDao = UserSongDaoFactory.create();
        const songDao = SongDaoFactory.create();
        const userDao = UserDaoFactory.create();

        const user = await userDao.getUser(userId);

        if (user == null) {
            return null;
        }

        const songs = await songDao.addSongs(songSpotifyIds);
        const songIds = songs.map(s => s.id); //Cant get the songs ids this way because some might not be added correctly
        const userSongs = await userSongDao.addUserSongs(userId, songIds);

        return {
            songs: songs,
            userSongs: userSongs,
        };
    }

    async getTagSongs(getTagSongRequest: GetTagSongsRequest) : Promise<GetTagSongsResult> {
        const songDao = SongDaoFactory.create();

        const userId = getTagSongRequest.userId;
        const tagId = getTagSongRequest.tagId;
        const songs = await songDao.getUserSongsFromTag(userId, tagId);

        return {
            songs: songs,
        }
    }
}