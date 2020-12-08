import { SongDaoFactory, UserDaoFactory, UserSongDaoFactory } from "../daos/daoFacotry";
import AddSongsRequest from "../request_models/AddSongsRequest";
import GeneratePlaylistRequest from "../request_models/GeneratePlaylistRequest";
import GetUserTagSongsRequest from "../request_models/GetUserTagSongsRequest";
import AddSongResult from "../result_models/AddSongResult";
import GeneratePlaylistResult from "../result_models/GeneratePlaylistResponse";
import GetUserTagSongsResult from "../result_models/GetUserTagSongsResult";
import GetUserSongsResult from "../result_models/GetUserSongResults";

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

    async getUserTagSongs(getTagSongRequest: GetUserTagSongsRequest) : Promise<GetUserTagSongsResult> {
        const songDao = SongDaoFactory.create();

        const userId = getTagSongRequest.userId;
        const tagId = getTagSongRequest.tagId;
        const songs = await songDao.getUserSongsFromTag(userId, tagId);

        return {
            songs: songs,
        }
    }

    async getUserSongs(userId: number) : Promise<GetUserSongsResult> {
        const userSongDao = UserSongDaoFactory.create();
        const songs = await userSongDao.getUserSongs(userId);
        return {
            songs: songs
        };
    }

    async generatePlaylist(generatePlaylistRequest: GeneratePlaylistRequest) : Promise<GeneratePlaylistResult> {
        const songDao = SongDaoFactory.create();

        const userId = generatePlaylistRequest.userId;
        const songQuery = generatePlaylistRequest.songQuery;
        const songs = await songDao.generatePlaylist(userId, songQuery);

        return {
            songs: songs,
        }
    }
}