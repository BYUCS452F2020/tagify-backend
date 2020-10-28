import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { errorResult, successResult } from "../response";
import TagService from "../services/TagService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    if (validate(req)) {
        const service = new TagService();
        const tag = await service.deleteTag(req.body.tagName, req.body.userId);
        const success = (tag != null);
    
        if (success) {
            successResult(context);
        } else {
            errorResult(context);
        }
    } else {
        errorResult(context, "Missing or invalid parameters")
    }
};

const validate = function (req: HttpRequest) : boolean {
    return req.body &&
        typeof(req.body.tagName) == "string" &&
        typeof(req.body.userId) == "number";
}

export default httpTrigger;