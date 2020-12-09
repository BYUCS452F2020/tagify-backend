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
const daoFacotry_1 = require("../daos/daoFacotry");
class UserService {
    /**
     * Adds a new user to the system
     * @param addUserRequest Encapsulates the data of the user being added
     * @returns The user that was added to the system
     */
    addUser(addUserRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const dao = daoFacotry_1.UserDaoFactory.create();
            const user = yield dao.addUser(addUserRequest);
            return user;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dao = daoFacotry_1.UserDaoFactory.create();
            const success = yield dao.deleteUser(id);
            return success;
        });
    }
    deleteUserFromSpotifyId(spotifyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const dao = daoFacotry_1.UserDaoFactory.create();
            const success = yield dao.deleteUserFromSpotifyId(spotifyId);
            return success;
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map