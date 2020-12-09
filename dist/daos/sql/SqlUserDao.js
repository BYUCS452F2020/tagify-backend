"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sql = require('mssql');
require('dotenv').config();
const sqlConfig_1 = require("../../sqlConfig");
class SqlUserDao {
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield sql.connect(sqlConfig_1.default.string());
            try {
                const result = yield sql.query(`select * from Users where Id = ${id}`);
                const record = result.recordset[0];
                return {
                    id: record.Id,
                    spotifyId: record.SpotifyId,
                    firstName: record.FirstName,
                    lastName: record.LastName,
                };
            }
            catch (_a) {
                return null;
            }
        });
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield sql.connect(sqlConfig_1.default.string());
            try {
                const result = yield sql.query(`insert into Users (SpotifyId, FirstName, LastName) values ('${user.spotifyId}', '${user.firstName}', '${user.lastName}')`);
                if (result.rowsAffected[0] == 0) {
                    return null;
                }
            }
            catch (_a) {
                return null;
            }
            const result = yield sql.query(`select * from Users where Id = @@Identity`);
            const record = result.recordset[0];
            return {
                id: record.Id,
                spotifyId: record.SpotifyId,
                firstName: record.FirstName,
                lastName: record.LastName,
            };
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield sql.connect(sqlConfig_1.default.string());
            try {
                var result = yield sql.query(`delete from Users where Id = ${id}`);
                return result.rowsAffected[0] == 1;
            }
            catch (_a) {
                return false;
            }
        });
    }
    deleteUserFromSpotifyId(spotifyId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield sql.connect(sqlConfig_1.default.string());
            try {
                var result = yield sql.query(`delete from Users where SpotifyId = '${spotifyId}'`);
                return result.rowsAffected[0] == 1;
            }
            catch (_a) {
                return false;
            }
        });
    }
}
exports.default = SqlUserDao;
//# sourceMappingURL=SqlUserDao.js.map