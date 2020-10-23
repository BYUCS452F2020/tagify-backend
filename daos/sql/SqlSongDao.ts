const sql = require('mssql');
require('dotenv').config();

import Song from "../../data_models/Song";
import sqlconfig from "../../sqlconfig";
import ISongDao from "../interface/ISongDao";

export default class SqlSongDao implements ISongDao {
    async addSong(spotifyId: string) : Promise<Song> {
        return null;
    }

    async addSongs(spotifyIds: string[]) : Promise<Song[]> {
        await sql.connect(sqlconfig.string());

        try {
            let existingQueryString = `select * from Songs where ${spotifyIds.map(s => `SpotifyId = '${s}'`).join(' or ')}`
            let existingResult = await sql.query(existingQueryString);
            let existingSongs = this.songsFromResult(existingResult);
            let existingSpotifyIds = existingSongs.map(s => s.spotifyId);

            spotifyIds = spotifyIds.filter((value) => existingSpotifyIds.indexOf(value) < 0);
            let songs: Song[] = existingSongs;

            if (spotifyIds.length > 0) {
                let queryString = `insert into Songs (SpotifyId) output inserted.Id, inserted.SpotifyId values ${spotifyIds.map(s => `('${s}')`)}`
                let result = await sql.query(queryString);
    
                songs = songs.concat(this.songsFromResult(result));
            }

            return songs;
        } catch {
            return null;
        }
    }

    private songsFromResult(result) : Song[] {
        return result.recordset.map(s => {
            return <Song> {
                id: s.Id,
                spotifyId: s.SpotifyId,
            }
        });
    }
}