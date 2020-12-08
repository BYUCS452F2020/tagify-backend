import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { successResult, errorResult } from "../response";
import TagService from "../services/TagService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    if(validate(req)) {
        const userId = parseInt(req.body.userId);
        const tagId = parseInt(req.body.tagId);
        const userSongId = parseInt(req.body.userSongId);

        const tagService = new TagService();
        const result = await tagService.addUserSongTag(userId, tagId, userSongId);
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
    return (req.body.userId && req.body.userSongId && req.body.tagId 
        && !isNaN(parseInt(req.body.userId)) 
        && !isNaN(parseInt(req.body.userSongId)) 
        && !isNaN(parseInt(req.body.tagId)));
}

export default httpTrigger;