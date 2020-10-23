import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import GetSongTagsRequest from "../request_models/GetSongTagsRequest";
import { errorResult, successResult } from "../response";
import TagService from "../services/TagService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    if (validate(req)) {
        const request = parse(req);
        const service = new TagService();
        const result = await service.getSongTags(request);
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
    return req.query.userId && req.query.songId
        && !isNaN(parseInt(req.query.userId)) && !isNaN(parseInt(req.query.songId))
}

const parse = function(req: HttpRequest) : GetSongTagsRequest {
    return {
        userId: parseInt(req.query.userId),
        songId: parseInt(req.query.songId),
    }
}

export default httpTrigger;