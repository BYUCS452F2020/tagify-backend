"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../response");
const UserService_1 = require("../services/UserService");
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        if (validate(req)) {
            const addUserRequest = parse(req);
            const service = new UserService_1.default();
            const user = yield service.addUser(addUserRequest);
            const success = user != null;
            if (success) {
                response_1.successResult(context, { user: user });
            }
            else {
                response_1.errorResult(context);
            }
        }
        else {
            response_1.errorResult(context, "Missing or invalid parameters");
        }
    });
};
const validate = function (req) {
    return req.body &&
        typeof (req.body.spotifyId) == "string" &&
        typeof (req.body.firstName) == "string" &&
        typeof (req.body.lastName) == "string";
};
const parse = function (req) {
    return {
        spotifyId: req.body.spotifyId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    };
};
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map