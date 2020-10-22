import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import AddUserRequest from "../request_models/AddUserRequest";
import { errorResult, successResult } from "../response";
import UserService from "../services/UserService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    if (validate(req)) {
        const addUserRequest = parse(req);
        const service = new UserService();
        const user = await service.addUser(addUserRequest);
        const success = user != null;
    
        if (success) {
            successResult(context, { user: user });
        } else {
            errorResult(context);
        }
    } else {
        errorResult(context, "Missing or invalid parameters")
    }
};

const validate = function (req: HttpRequest) : boolean {
    return req.body &&
        typeof(req.body.spotifyId) == "string" &&
        typeof(req.body.firstName) == "string" &&
        typeof(req.body.lastName) == "string";
}

const parse = function (req: HttpRequest) : AddUserRequest {
    return {
        spotifyId: req.body.spotifyId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    };
}

export default httpTrigger;