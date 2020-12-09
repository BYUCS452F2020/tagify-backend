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
const TagService_1 = require("../services/TagService");
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        if (validate(req)) {
            const tagService = new TagService_1.default();
            const tagId = parseInt(req.query.tagId);
            const songId = parseInt(req.query.songId);
            const result = yield tagService.deleteSongTag(tagId, songId);
            const success = (result != null);
            if (success) {
                response_1.successResult(context, result);
            }
            else {
                response_1.errorResult(context);
            }
        }
        else {
            response_1.errorResult(context, "missing params");
        }
    });
};
const validate = function (req) {
    return (req.query.songId && req.query.tagId
        && !isNaN(parseInt(req.query.songId))
        && !isNaN(parseInt(req.query.tagId)));
};
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map