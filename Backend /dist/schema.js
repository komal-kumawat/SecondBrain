"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = exports.Tag = exports.Link = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});
const User = mongoose_1.default.model("User", userSchema);
exports.User = User;
const tagsSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true, unique: true }
});
const Tag = mongoose_1.default.model("Tag", tagsSchema);
exports.Tag = Tag;
const contentTypes = ['image', 'video', 'article', 'audio'];
const contentSchema = new mongoose_1.default.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: { type: [mongoose_1.default.Types.ObjectId], ref: "Tag", default: [], required: false },
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "User", required: true }
});
const Content = mongoose_1.default.model("Content", contentSchema);
exports.Content = Content;
const linkSchema = new mongoose_1.default.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "User", required: true }
});
const Link = mongoose_1.default.model("Link", linkSchema);
exports.Link = Link;
