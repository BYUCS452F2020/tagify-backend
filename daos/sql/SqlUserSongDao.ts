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
            let queryString = `insert into UserSongs (UserId, SongId) output inserted.Id, inserted.UserId, inserted.SongId values ${songIds.map(s => `('${userId}', '${s}')`)}`
            let result = await sql.query(queryString);

            var userSongs: UserSong[] = result.recordset.map(s => {
                return <UserSong> {
                    id: s.Id,
                    userId: s.UserId,
                    songId: s.SongId,
                }
            });

            return userSongs;
        } catch {
            return null;
        }
    }
}