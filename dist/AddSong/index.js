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
const SongService_1 = require("../services/SongService");
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        if (validate(req)) {
            const addSongsRequest = parse(req);
            const service = new SongService_1.default();
            const result = yield service.addSongs(addSongsRequest);
            const success = result != null;
            if (success) {
                response_1.successResult(context, result);
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
    if (req.body && typeof (req.body.userId) == "number" && Array.isArray(req.body.songs)) {
        req.body.songs.forEach(element => {
            if (typeof (element) != "string") {
                return false;
            }
        });
        return true;
    }
    return false;
};
const parse = function (req) {
    return {
        userId: req.body.userId,
        songs: req.body.songs,
    };
};
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map