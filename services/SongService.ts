import { SongDaoFactory, UserDaoFactory, UserSongDaoFactory } from "../daos/daoFacotry";
import Song from "../data_models/Song";
import AddSongsRequest from "../request_models/AddSongsRequest";

export default class SongService {
    async addSongs(addSongsRequest: AddSongsRequest): Promise<Song[]> {
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

        return songs;
    }
}