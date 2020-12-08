import IUserDao from "../interface/IUserDao";
import AddUserRequest from "../../request_models/AddUserRequest";
import User from "../../data_models/User";

export default class TestUserDao implements IUserDao {
    getUser(id: number) : Promise<User> {
        return new Promise<User>((resolve, reject) => {
            resolve({
                id: id,
                spotifyId: "some_spotify_id",
                firstName: "First",
                lastName: "Last",
            })
        })
    }
    addUser(user: AddUserRequest) : Promise<User> {
        return new Promise<User>((resolve, reject) => {
            resolve({
                id: 1,
                spotifyId: user.spotifyId,
                firstName: user.firstName,
                lastName: user.lastName,
            })
        });
    }

    deleteUser(id: number) : Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        })
    }

    deleteUserFromSpotifyId(spotifyId: string) : Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        })
    }
}