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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = require("./schema");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const middleware_1 = require("./middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
const mongoUrl = process.env.MONGO_URL || "mongodb+srv://komalK:komal%40123@atlascluster.fukzabb.mongodb.net/secondBrain";
const JWT_SECRET = process.env.JWT_SECRET || "1234@1234";
mongoose_1.default.connect(mongoUrl)
    .then(() => {
    console.log("connected to mongoDB successfully ");
}).catch(err => {
    console.log("error connecting mongodb");
});
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const existingUser = yield schema_1.User.findOne({ username: username });
        if (existingUser) {
            res.status(403).json({ error: "user already exist" });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield schema_1.User.create({
            username: username,
            password: hashedPassword
        });
        res.status(200).json({ message: "User created successfully", user: newUser });
    }
    catch (err) {
        res.status(500).json({ error: err, msg: "server error" });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield schema_1.User.findOne({ username: username });
        if (!user) {
            res.status(403).json({ error: "user does not exist" });
            return;
        }
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(401).json({ error: "incorrect password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET);
        res.status(200).json({ message: "Signin successful", token });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, link, title } = req.body;
    try {
        const createdContent = yield schema_1.Content.create({
            type,
            link,
            title,
            tags: [], // This should be an array of valid MongoDB ObjectIds (if required)
            // @ts-ignore
            userId: req.userId, // Middleware must set this properly
        });
        res.json({
            msg: "Content added successfully",
            createdContent,
        });
    }
    catch (err) {
        res.status(403).json({ error: err, msg: "Error while adding content" });
    }
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId;
    try {
        const createdContent = yield schema_1.Content.find({
            userId: userId
        }).populate("userId", "username");
        if (!createdContent) {
            res.status(401).json({ msg: "content not found" });
            return;
        }
        res.json({ msg: "content found successfully", createdContent });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
app.delete("/api/v1/content/:id", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.params.id;
    // @ts-ignore
    const userId = req.userId;
    try {
        const result = yield schema_1.Content.deleteMany({ _id: contentId, userId: userId });
        if (result.deletedCount === 0) {
            res.status(403).json({ msg: "content not found or not owned by you" });
            return;
        }
        res.status(200).json({ msg: "content deleted successfully" });
    }
    catch (err) {
        res.status(403).json({ msg: "trying to delete the content that you don't own" });
    }
}));
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield schema_1.Link.findOne({
            // @ts-ignore
            userId: req.userId
        });
        if (existingLink) {
            // @ts-ignore
            const content = yield schema_1.Content.findOne({ userId: req.userId });
            res.json({
                hash: existingLink.hash,
                content
            });
            return;
        }
        const hash = Math.random().toString(36).substring(2, 12); // Generate a random 10-character string
        yield schema_1.Link.create({
            // @ts-ignore
            userId: req.userId,
            hash: hash
        });
        // @ts-ignore
        const content = yield schema_1.Content.findOne({ userId: req.userId });
        res.json({
            msg: "link created successfully",
            hash,
            content
        });
    }
    else {
        yield schema_1.Link.deleteOne({
            // @ts-ignore
            userId: req.userId
        });
        res.json({
            msg: "link deleted successfully"
        });
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield schema_1.Link.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            msg: "sorry incorrect input"
        });
        return;
    }
    const content = yield schema_1.Content.findOne({
        userId: link.userId
    });
    const user = yield schema_1.User.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            msg: "user not found ,error should ideally not happen "
        });
        return;
    }
    res.json({
        username: user.username,
        content: content,
    });
}));
app.listen(port, () => {
    console.log("app listening ot port ", port);
});
