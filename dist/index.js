"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const node_server_1 = require("@hono/node-server");
const client_1 = require("@prisma/client");
const cors_1 = require("hono/cors");
const zod_1 = require("zod");
const error_1 = require("./utils/error");
const validation_1 = require("./utils/validation");
const app = new hono_1.Hono();
const prisma = new client_1.PrismaClient();
// バリデーションスキーマ
const createTodoSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().optional(),
});
const updateTodoSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required").optional(),
    description: zod_1.z.string().optional(),
    completed: zod_1.z.boolean().optional(),
});
// CORSの設定
app.use("/*", (0, cors_1.cors)());
// レスポンスヘルパー
const successResponse = (data, status = 200) => {
    return { success: true, data };
};
const errorResponse = (message, status = 500) => {
    return { success: false, error: message };
};
// Todo一覧の取得
app.get("/todos", async (c) => {
    try {
        const todos = await prisma.todo.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return c.json(successResponse(todos));
    }
    catch (error) {
        const errorResponse = (0, error_1.handleError)(error);
        return c.json(errorResponse, errorResponse.error.statusCode);
    }
});
// 特定のTodoの取得
app.get("/todos/:id", async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            throw new error_1.ValidationError("Invalid ID format");
        }
        const todo = await prisma.todo.findUnique({
            where: { id },
        });
        if (!todo) {
            throw new error_1.NotFoundError(`Todo with ID ${id} not found`);
        }
        return c.json(successResponse(todo));
    }
    catch (error) {
        const errorResponse = (0, error_1.handleError)(error);
        return c.json(errorResponse, errorResponse.error.statusCode);
    }
});
// Todoの作成
app.post("/todos", async (c) => {
    try {
        let body;
        try {
            body = await c.req.json();
        }
        catch (e) {
            throw new error_1.ValidationError("Invalid JSON format");
        }
        const validatedData = (0, validation_1.validateTodoInput)(body);
        const todo = await prisma.todo.create({
            data: validatedData,
        });
        return c.json(successResponse(todo, 201), 201);
    }
    catch (error) {
        const errorResponse = (0, error_1.handleError)(error);
        return c.json(errorResponse, errorResponse.error.statusCode);
    }
});
// Todoの更新
app.put("/todos/:id", async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            throw new error_1.ValidationError("Invalid ID format");
        }
        let body;
        try {
            body = await c.req.json();
        }
        catch (e) {
            throw new error_1.ValidationError("Invalid JSON format");
        }
        const validatedData = (0, validation_1.validateTodoInput)(body);
        const todo = await prisma.todo.update({
            where: { id },
            data: validatedData,
        });
        return c.json(successResponse(todo));
    }
    catch (error) {
        const errorResponse = (0, error_1.handleError)(error);
        return c.json(errorResponse, errorResponse.error.statusCode);
    }
});
// Todoの削除
app.delete("/todos/:id", async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            throw new error_1.ValidationError("Invalid ID format");
        }
        const todo = await prisma.todo.delete({
            where: { id },
        });
        return c.json(successResponse(todo));
    }
    catch (error) {
        const errorResponse = (0, error_1.handleError)(error);
        return c.json(errorResponse, errorResponse.error.statusCode);
    }
});
const port = 3000;
console.log(`Server is running on port ${port}`);
(0, node_server_1.serve)(app, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
