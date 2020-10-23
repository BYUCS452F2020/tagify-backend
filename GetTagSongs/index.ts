import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { request } from "http";
import GetTagSongsRequest from "../request_models/GetTagSongsRequest";
import { errorResult, successResult } from "../response";
import SongService from "../services/SongService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    if (validate(req)) {
        const request = parse(req);
        const service = new SongService();
        const result = await service.getTagSongs(request);
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
    return req.query.userId && req.query.tagId
        && !isNaN(parseInt(req.query.userId)) && !isNaN(parseInt(req.query.tagId))
}

const parse = function(req: HttpRequest) : GetTagSongsRequest {
    return {
        userId: parseInt(req.query.userId),
        tagId: parseInt(req.query.tagId),
    }
}

export default httpTrigger;