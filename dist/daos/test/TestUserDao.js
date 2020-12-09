"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestUserDao {
    getUser(id) {
        return new Promise((resolve, reject) => {
            resolve({
                id: id,
                spotifyId: "some_spotify_id",
                firstName: "First",
                lastName: "Last",
            });
        });
    }
    addUser(user) {
        return new Promise((resolve, reject) => {
            resolve({
                id: 1,
                spotifyId: user.spotifyId,
                firstName: user.firstName,
                lastName: user.lastName,
            });
        });
    }
    deleteUser(id) {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }
    deleteUserFromSpotifyId(spotifyId) {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }
}
exports.default = TestUserDao;
//# sourceMappingURL=TestUserDao.js.map