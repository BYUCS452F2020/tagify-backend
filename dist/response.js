"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResult = exports.successResult = void 0;
exports.successResult = function (context, body = undefined) {
    if (typeof (body) == "object") {
        body.success = true;
    }
    else {
        body = {
            success: true,
        };
    }
    context.res = {
        status: 200,
        body: body,
    };
};
exports.errorResult = function (context, message = undefined, status = 400) {
    context.res = {
        status: status,
        body: {
            success: false,
        },
    };
    if (message) {
        context.res.body.message = message;
    }
};
//# sourceMappingURL=response.js.map