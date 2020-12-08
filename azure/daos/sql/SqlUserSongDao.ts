const sql = require('mssql');
require('dotenv').config();

import UserSong from "../../data_models/UserSong";
import sqlconfig from "../../sqlconfig";
import IUserSongDao from "../interface/IUserSongDao";

export default class SqlUserSongDao implements IUserSongDao {
    async addUserSong(userId: number, songId: number) : Promise<UserSong> {
        return null;
    }

    async addUserSongs(userId: number, songIds: number[]) : Promise<UserSong[]> {
        await sql.connect(sqlconfig.string());

        try {
            let existingQueryString = `select * from UserSongs where userId = ${userId} and (${songIds.map(s => `SongId = '${s}'`).join(' or ')})`
            let existingResult = await sql.query(existingQueryString);
            let existingUserSongs = this.userSongsFromResult(existingResult);
            let existingsSongIds = existingUserSongs.map(us => us.songId);

            songIds = songIds.filter((value) => existingsSongIds.indexOf(value) < 0);
            let userSongs: UserSong[] = existingUserSongs;

            if (songIds.length > 0) {
                let queryString = `insert into UserSongs (UserId, SongId) output inserted.Id, inserted.UserId, inserted.SongId values ${songIds.map(s => `('${userId}', '${s}')`)}`
                let result = await sql.query(queryString);

                userSongs = this.userSongsFromResult(result);
            }

            return userSongs;
        } catch {
            return null;
        }
    }

    async getUserSongs(userId: number) : Promise<UserSong[]> {
        await sql.connect(sqlconfig.string());
        try {
            let queryString = 
            `select Songs.SpotifyId, UserSongs.*
            from Songs join UserSongs
            on Songs.Id = UserSongs.SongId
            where UserSongs.UserId = ${userId}`;

            let result = await sql.query(queryString);
            let songList = this.userSongsFromResult(result);
            return songList;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    private userSongsFromResult(result) : UserSong[] {
        return result.recordset.map(s => {
            return <UserSong> {
                id: s.Id,
                userId: s.UserId,
                songId: s.SongId,
                spotifyId: s.SpotifyId
            }
        });
    }
}