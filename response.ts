import { Context } from "@azure/functions"

export const successResult = function(context: Context, body = undefined) {
    if (typeof(body) == "object") {
        body.success = true;
    } else {
        body = {
            success: true,
        }
    }

    context.res = {
        status: 200,
        body: body,
    }
}

export const errorResult = function(context: Context, message: string = undefined, status: number = 400) {
    context.res = {
        status: status,
        body: {
            success: false,
        },
    }
    if (message) {
        context.res.body.message = message;
    }
}