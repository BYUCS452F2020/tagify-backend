import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import GeneratePlaylistRequest from "../request_models/GeneratePlaylistRequest";
import { errorResult, successResult } from "../response";
import SongService from "../services/SongService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    if (validate(req)) {
        const request = parse(req);
        const service = new SongService();
        const result = await service.generatePlaylist(request);
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

const validate = function(req: HttpRequest) : boolean {
    return req.query.userId && req.query.songQuery
        && !isNaN(parseInt(req.query.userId)) && Array.isArray(JSON.parse(req.query.songQuery))
}

const parse = function(req: HttpRequest) : GeneratePlaylistRequest {
    return {
        userId: parseInt(req.query.userId),
        songQuery: JSON.parse(req.query.songQuery),
    }
}

export default httpTrigger;