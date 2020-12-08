const sql = require('mssql');
require('dotenv').config();

import Tag from "../../data_models/Tag";
import sqlconfig from "../../sqlconfig";
import ITagDao from "../interface/ITagDao";
import UserSongTag from "../../data_models/UserSongTag";

export default class SqlTagDao implements ITagDao {
    async getUserTagsFromSong(userId: number, songId: number) : Promise<Tag[]> {
        await sql.connect(sqlconfig.string());

        try {
            let queryString = 
                `select Tags.Id, Tags.UserId, Tags.Name from Songs ` + 
                `join UserSongs on Songs.Id = UserSongs.SongId ` +
                `join UserSongTags on UserSongs.Id = UserSongTags.UserSongId ` +
                `join Tags on Tags.Id = UserSongTags.TagId ` +
                `where Songs.Id = ${songId} and Tags.UserId = ${userId} `;

            let result = await sql.query(queryString);
            let tags = this.tagsFromResult(result);

            return tags;
        } catch {
            return null;
        }
    }
    private tagsFromResult(result) : Tag[] {
        return result.recordset.map(t => {
            return <Tag> {
                id: t.Id,
                userId: t.UserId,
                name: t.Name,
            }
        });
    }

    async addTag(tagName: String, userId: number) : Promise<Tag> {
        await sql.connect(sqlconfig.string());
        try {
            let queryString = `insert into Tags (UserId, Name) values (${userId}, '${tagName}')`;

            const result = await sql.query(queryString);
            console.log(result);
            if(result.rowsAffected[0] == 0) {
                return null;
            }

            const result2 = await sql.query(`select * from Tags where Id = @@Identity`);
            const record = result2.recordset[0];

            if(record.UserId != userId || record.Name != tagName) {
                console.log("here");
                return null;
            }

            return {
                id: record.id,
                userId: record.UserId,
                name: record.Name
            }
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async deleteTag(tagName: String, userId: number) : Promise<any> {
        await sql.connect(sqlconfig.string());
        try {
            let queryString = `delete from Tags where UserId = ${userId} AND Name = '${tagName}'`;

            const result = await sql.query(queryString);
            console.log(result);
            if(result.rowsAffected[0] == 0) {
                return null;
            }

            return {
                success: true
            }
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async addUserSongTag(userId: number, tagId: number, userSongId: number) : Promise<UserSongTag> {
        await sql.connect(sqlconfig.string());
        try {
            let queryString = `insert into UserSongTags (UserId, TagId, UserSongId) values (${userId}, ${tagId}, ${userSongId})`;

            const result = await sql.query(queryString);
            console.log(result);
            if(result.rowsAffected[0] == 0) {
                return null;
            }

            return {
                songId: userSongId,
                tagId: tagId
            }
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async deleteUserSongTag(tagId: number, userSongId: number) : Promise<boolean> {
        await sql.connect(sqlconfig.string());
        try {
            let queryString = `delete from UserSongTags where UserSongId=${userSongId} AND TagId=${tagId}`;

            const result = await sql.query(queryString);
            console.log(result);
            if(result.rowsAffected[0] == 0) {
                return false;
            }

            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}
