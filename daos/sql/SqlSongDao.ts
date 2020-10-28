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
            let existingSongs = this.songsFromResult(existingResult.recordset);
            let existingSpotifyIds = existingSongs.map(s => s.spotifyId);

            spotifyIds = spotifyIds.filter((value) => existingSpotifyIds.indexOf(value) < 0);
            let songs: Song[] = existingSongs;

            if (spotifyIds.length > 0) {
                let queryString = `insert into Songs (SpotifyId) output inserted.Id, inserted.SpotifyId values ${spotifyIds.map(s => `('${s}')`)}`
                let result = await sql.query(queryString);
    
                songs = songs.concat(this.songsFromResult(result.recordset));
            }

            return songs;
        } catch {
            return null;
        }
    }

    async getUserSongsFromTag(userId: number, tagId: number) : Promise<Song[]> {
        await sql.connect(sqlconfig.string());

        try {
            let queryString = 
                `select Songs.Id, Songs.SpotifyId from Tags ` + 
                `join UserSongTags on Tags.Id = UserSongTags.TagId ` +
                `join UserSongs on UserSongTags.UserSongId = UserSongs.Id ` +
                `join Songs on Songs.Id = UserSongs.SongId ` +
                `where Tags.Id = ${tagId} and Tags.UserId = ${userId} `;

            let result = await sql.query(queryString);
            let songs = this.songsFromResult(result.recordset);

            return songs;
        } catch {
            return null;
        }
    }

    async generatePlaylist(userId: number, songQuery: string[][]) : Promise<Song[]> {
        await sql.connect(sqlconfig.string());

        try {
            let queryOperator = songQuery.map(o => `Tags.Id = ${o.join(' or Tags.Id = ')}`).join(' or ');
            let queryString =
                `select Songs.Id as Id, Songs.SpotifyId as SpotifyId, Tags.Id as TagId from UserSongs ` +
                `join UserSongTags on UserSongs.Id = UserSongTags.UserSongId ` +
                `join Tags on UserSongTags.TagId = Tags.Id ` +
                `join Songs on UserSongs.SongId = Songs.Id ` +
                `where Tags.UserId = ${userId} and (${queryOperator}) `;


            let result = await sql.query(queryString);
            let songToTagDict = {}
            result.recordset.forEach(resultRow => {
                let songTags = songToTagDict[resultRow.Id]
                if (Array.isArray(songTags)) {
                    songTags.push(resultRow)
                } else {
                    songToTagDict[resultRow.Id] = [resultRow]
                }
            });
           
            let finalResult = [];
            for (let songId in songToTagDict) {
                let songDataItems = songToTagDict[songId];
                let songTags = songDataItems.map(s => s.TagId);
                
                let matchesQuery: boolean = false;
                for (let outerTagQueryIndex = 0; outerTagQueryIndex < songQuery.length; outerTagQueryIndex++) {
                    const innerTagIds = songQuery[outerTagQueryIndex];
                    let matchesInnerQuery: boolean = true;
                    
                    for (let tagIdIndex = 0; tagIdIndex < innerTagIds.length; tagIdIndex++) {
                        const tagId = innerTagIds[tagIdIndex];
                        if (songTags.indexOf(tagId) < 0) {
                            matchesInnerQuery = false;
                            break;
                        }
                    }

                    if (matchesInnerQuery) {
                        matchesQuery = true;
                        break;
                    }
                }

                if (matchesQuery) {
                    finalResult.push(songDataItems[0]);
                }
            }

            const songs = this.songsFromResult(finalResult);
            return songs;
        } catch {
            return null;
        }
    }

    private songsFromResult(result) : Song[] {
        return result.map(s => {
            return <Song> {
                id: s.Id,
                spotifyId: s.SpotifyId,
            }
        });
    }
}