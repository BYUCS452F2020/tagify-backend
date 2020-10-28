import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { errorResult, successResult } from "../response";
import SongService from "../services/SongService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    if(validate(req)) {
        const userId = req.query.userId;
        const songService = new SongService();
        const result = await songService.getUserSongs(parseInt(userId));
        const success = (result != null);

        if(success) {
            return successResult(context, result);
        } else {
            return errorResult(context);
        }
    } else {
        return errorResult(context, "Missing query param 'userId'")
    }
};

const validate = function(req: HttpRequest) : boolean {
    return (req.query.userId && !isNaN(parseInt(req.query.userId)));
}

export default httpTrigger;