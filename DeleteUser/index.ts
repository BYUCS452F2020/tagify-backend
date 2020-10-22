import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import AddUserRequest from "../request_models/AddUserRequest";
import UserService from "../services/UserService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const service = new UserService();
    const userId = req.body.id;
    let success : boolean;
    if (userId) {
        success = await service.deleteUser(userId);
    } else {
        const spotifyId = req.body.spotifyId;
        if (spotifyId) {
            success = await service.deleteUserFromSpotifyId(spotifyId);
        }
    }

    context.res = {
        status: success ? 200 : 400,
        body: {
            success: success,
        },
    }
};

const parse = function (req: HttpRequest): AddUserRequest {
    return {
        spotifyId: req.body.spotifyId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    };
}

export default httpTrigger;