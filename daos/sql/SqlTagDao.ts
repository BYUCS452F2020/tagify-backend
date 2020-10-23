const sql = require('mssql');
require('dotenv').config();

import Tag from "../../data_models/Tag";
import sqlconfig from "../../sqlconfig";
import ITagDao from "../interface/ITagDao";

export default class SqlTagDao implements ITagDao {
    async getUserTagsFromSong(userId: number, songId: number) : Promise<Tag[]> {
        await sql.connect(sqlconfig.string());

        try {
            let queryString = 
                `select Tags.Id, Tags.UserId, Tags.Name from Songs ` + 
                `join SongTags on Songs.Id = SongTags.SongId ` +
                `join Tags on Tags.Id = SongTags.TagId ` +
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
}