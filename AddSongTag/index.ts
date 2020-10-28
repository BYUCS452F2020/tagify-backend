import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { successResult, errorResult } from "../response";
import TagService from "../services/TagService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    if(validate(req)) {
        const tagId = parseInt(req.query.tagId);
        const songId = parseInt(req.query.songId);

        const tagService = new TagService();
        const result = await tagService.addSongTag(tagId, songId);
        const success = (result != null);

        if (success) {
            successResult(context, result);
        } else {
            errorResult(context);
        }
    } else {
        errorResult(context, "Missing or invalid parameters");
    }
};

const validate = function(req: HttpRequest) : boolean {
    return (req.query.songId && req.query.tagId 
        && !isNaN(parseInt(req.query.songId)) 
        && !isNaN(parseInt(req.query.tagId)));
}

export default httpTrigger;