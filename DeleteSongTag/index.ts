import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { errorResult, successResult } from "../response";
import TagService from "../services/TagService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    if(validate(req)) {
        const tagService = new TagService();
        const tagId = parseInt(req.query.tagId);
        const songId = parseInt(req.query.songId);
        const result = await tagService.deleteSongTag(tagId, songId);
        const success = (result != null);

        if(success) {
            successResult(context, result);
        } else {
            errorResult(context);
        }
    } else {
        errorResult(context, "missing params");
    }
};

const validate = function(req: HttpRequest) : boolean {
    return (req.query.songId && req.query.tagId
        && !isNaN(parseInt(req.query.songId)) 
        && !isNaN(parseInt(req.query.tagId)));
}

export default httpTrigger;