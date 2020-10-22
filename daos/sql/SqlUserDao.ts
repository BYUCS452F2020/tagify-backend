const sql = require('mssql');
require('dotenv').config();

import IUserDao from "../interface/IUserDao";
import AddUserRequest from "../../request_models/AddUserRequest";
import User from "../../data_models/User";
import sqlconfig from "../../sqlConfig";

export default class SqlUserDao implements IUserDao {
    async addUser(user: AddUserRequest) : Promise<User> {
        await sql.connect(sqlconfig.string());

        try {
            await sql.query(`insert into Users (SpotifyId, FirstName, LastName) values ('${user.spotifyId}', '${user.firstName}', '${user.lastName}')`);
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
}