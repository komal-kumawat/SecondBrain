"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
// validationSchema.ts
const zod_1 = require("zod");
exports.userValidation = zod_1.z.object({
    username: zod_1.z.string().min(3),
    password: zod_1.z.string().min(6),
});
