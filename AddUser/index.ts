import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import AddUserRequest from "../request_models/AddUserRequest";
import UserService from "../services/UserService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const addUserRequest = parse(req);
    const service = new UserService();
    const user = service.addUser(addUserRequest);
    const success = user != null;

    context.res = {
        status: success ? 200 : 400,
        body: {
            user: user,
        }
    };
};

const parse = function(req: HttpRequest) : AddUserRequest {
    return {
        spotifyId: req.body.spotifyId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    };
}

export default httpTrigger;