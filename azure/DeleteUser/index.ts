import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { request } from "http";
import AddUserRequest from "../request_models/AddUserRequest";
import { errorResult, successResult } from "../response";
import UserService from "../services/UserService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    if (validate(req)) {
        const service = new UserService();
        const userId = req.body.id;
        let success : boolean;
        if (userId) {
            success = await service.deleteUser(userId);
        } else {
            const spotifyId = req.body.spotifyId;
            success = await service.deleteUserFromSpotifyId(spotifyId);
        }
        successResult(context);
    } else {
        errorResult(context, "Missing or invalid parameters");
    }
};

const validate = function (req: HttpRequest): boolean {
    return typeof(req.body.id) == "number" || typeof(req.body.spotifyId) == "string";
}

export default httpTrigger;