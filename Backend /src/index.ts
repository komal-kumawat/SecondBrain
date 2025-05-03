import express from "express";
import mongoose from "mongoose";
import { Content, Link, User, } from "./schema";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import cors from "cors";
import { userMiddleware } from "./middleware";
dotenv.config();
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
    throw new Error("MONGO_URL is not defined in .env");
  }
  

const JWT_SECRET = process.env.JWT_SECRET || "1234@1234"
mongoose.connect(mongoUrl)
    .then(() => {
        console.log("connected to mongoDB successfully ")
    }
    ).catch(err => {
        console.log("error connecting mongodb"+err)
    })

app.post("/api/v1/signup", async (req, res) => {

    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            res.status(403).json({ error: "user already exist" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username: username,
            password: hashedPassword
        });
        res.status(200).json({ message: "User created successfully", user: newUser })
    } catch (err) {
        res.status(500).json({ error: err, msg: "server error" });
    }

})

app.post("/api/v1/signin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            res.status(403).json({ error: "user does not exist" });
            return;
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(401).json({ error: "incorrect password" });
            return;

        }
        const token = jwt.sign(
            { id: user._id },
            JWT_SECRET, // make sure this is imported or from process.env
        );



        res.status(200).json({ message: "Signin successful", token });

    } catch (err) {
        res.status(500).json(err);
    }

})

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const { type, link, title } = req.body;

    try {
        const createdContent = await Content.create({
            type,
            link,
            title,
            tags: [],  // This should be an array of valid MongoDB ObjectIds (if required)
            // @ts-ignore
            userId: req.userId,  // Middleware must set this properly
        });

        res.json({
            msg: "Content added successfully",
            createdContent,
        });
    } catch (err) {
        res.status(403).json({ error: err, msg: "Error while adding content" });
    }
});


app.get("/api/v1/content", userMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    try {
        const createdContent = await Content.find({
            userId: userId
        }
        ).populate("userId", "username");
        if (!createdContent) {
            res.status(401).json({ msg: "content not found" });
            return;
        }
        res.json({ msg: "content found successfully", createdContent });
    } catch (err) {
        res.status(500).json(err);
    }

})

app.delete("/api/v1/content/:id", userMiddleware, async (req, res) => {
    const contentId = req.params.id;
    // @ts-ignore
    const userId = req.userId;
    try {
        const result = await Content.deleteMany({ _id: contentId, userId: userId });
        if (result.deletedCount === 0) {
            res.status(403).json({ msg: "content not found or not owned by you" });
            return;
        }
        res.status(200).json({ msg: "content deleted successfully" })
    } catch (err) {
        res.status(403).json({ msg: "trying to delete the content that you don't own" })
    }

})

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;

    if (share) {

        const existingLink = await Link.findOne({
            // @ts-ignore
            userId: req.userId
        });
        if (existingLink) {
            // @ts-ignore
            const content = await Content.findOne({ userId: req.userId });
            res.json({
                hash: existingLink.hash,
                content
            });
            return;
        }
        const hash = Math.random().toString(36).substring(2, 12); // Generate a random 10-character string
        await Link.create({
            // @ts-ignore
            userId: req.userId,
            hash: hash
        });
        // @ts-ignore
        const content = await Content.findOne({ userId: req.userId });
        res.json({
            msg: "link created successfully",
            hash,
            content
        });
    } else {
        await Link.deleteOne({
            // @ts-ignore
            userId: req.userId
        });
        res.json({
            msg: "link deleted successfully"
        });
    }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    const link = await Link.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            msg: "sorry incorrect input"
        })
        return;
    }
    const content = await Content.findOne({
        userId: link.userId
    })
    const user = await User.findOne({
        _id: link.userId
    })
    if (!user) {
        res.status(411).json({
            msg: "user not found ,error should ideally not happen "
        })
        return;
    }
    res.json({
        username: user.username,
        content: content,
    })

})

app.listen(port, () => {
    console.log("app listening ot port ", port);
})