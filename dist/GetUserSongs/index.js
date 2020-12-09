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
            const userId = req.query.userId;
            const songService = new SongService_1.default();
            const result = yield songService.getUserSongs(parseInt(userId));
            const success = (result != null);
            if (success) {
                return response_1.successResult(context, result);
            }
            else {
                return response_1.errorResult(context);
            }
        }
        else {
            return response_1.errorResult(context, "Missing query param 'userId'");
        }
    });
};
const validate = function (req) {
    return (req.query.userId && !isNaN(parseInt(req.query.userId)));
};
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map