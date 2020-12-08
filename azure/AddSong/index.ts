import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import AddSongsRequest from "../request_models/AddSongsRequest";
import { errorResult, successResult } from "../response";
import SongService from "../services/SongService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    if (validate(req)) {
        const addSongsRequest = parse(req);
        const service = new SongService();
        const result = await service.addSongs(addSongsRequest);
        const success = result != null;
    
        if (success) {
            successResult(context, result);
        } else {
            errorResult(context);
        }
    } else {
        errorResult(context, "Missing or invalid parameters")
    }
};

const validate = function (req: HttpRequest) : boolean {
    if (req.body && typeof(req.body.userId) == "number" && Array.isArray(req.body.songs)) {
        req.body.songs.forEach(element => {
            if (typeof(element) != "string") {
                return false;
            }
        });
        return true;
    }
    return false;
}

const parse = function (req: HttpRequest) : AddSongsRequest {
    return {
        userId: req.body.userId,
        songs: req.body.songs,
    };
}


export default httpTrigger;