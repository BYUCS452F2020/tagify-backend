const sql = require('mssql');
require('dotenv').config();

import IUserDao from "../interface/IUserDao";
import AddUserRequest from "../../request_models/AddUserRequest";
import User from "../../data_models/User";
import sqlconfig from "../../sqlConfig";

export default class SqlUserDao implements IUserDao {
    async getUser(id: number) : Promise<User> {
        await sql.connect(sqlconfig.string());

        try {
            const result = await sql.query(`select * from Users where Id = ${id}`);
            const record = result.recordset[0];

            return {
                id: record.Id,
                spotifyId: record.SpotifyId,
                firstName: record.FirstName,
                lastName: record.LastName,
            }
        } catch {
            return null;
        }
    }

    async addUser(user: AddUserRequest) : Promise<User> {
        await sql.connect(sqlconfig.string());

        try {
            const result = await sql.query(`insert into Users (SpotifyId, FirstName, LastName) values ('${user.spotifyId}', '${user.firstName}', '${user.lastName}')`);
            if (result.rowsAffected[0] == 0) {
                return null;
            }
        } catch {
            return null;
        }

        const result = await sql.query(`select * from Users where Id = @@Identity`)
        const record = result.recordset[0]
        
        return {
            id: record.Id,
            spotifyId: record.SpotifyId,
            firstName: record.FirstName,
            lastName: record.LastName,
        }
    }

    async deleteUser(id: number) : Promise<boolean> {
        await sql.connect(sqlconfig.string());

        try {
            var result = await sql.query(`delete from Users where Id = ${id}`)
            return result.rowsAffected[0] == 1;
        } catch {
            return false;
        }
    }

    async deleteUserFromSpotifyId(spotifyId: string) : Promise<boolean> {
        await sql.connect(sqlconfig.string());

        try {
            var result = await sql.query(`delete from Users where SpotifyId = '${spotifyId}'`)
            return result.rowsAffected[0] == 1;
        } catch {
            return false;
        }
    }
}