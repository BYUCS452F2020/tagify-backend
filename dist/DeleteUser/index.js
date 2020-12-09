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
            const service = new UserService_1.default();
            const userId = req.body.id;
            let success;
            if (userId) {
                success = yield service.deleteUser(userId);
            }
            else {
                const spotifyId = req.body.spotifyId;
                success = yield service.deleteUserFromSpotifyId(spotifyId);
            }
            response_1.successResult(context);
        }
        else {
            response_1.errorResult(context, "Missing or invalid parameters");
        }
    });
};
const validate = function (req) {
    return typeof (req.body.id) == "number" || typeof (req.body.spotifyId) == "string";
};
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map