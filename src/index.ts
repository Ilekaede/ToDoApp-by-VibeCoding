import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { PrismaClient } from "@prisma/client";
import { cors } from "hono/cors";
import { z } from "zod";
import {
  handleError,
  ValidationError,
  NotFoundError,
  DatabaseError,
} from "./utils/error";
import { validateTodoInput } from "./utils/validation";

const app = new Hono();
const prisma = new PrismaClient();

// 型定義
interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// バリデーションスキーマ
const createTodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

const updateTodoSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

// CORSの設定
app.use("/*", cors());

// レスポンスヘルパー
const successResponse = (data: any, status = 200) => {
  return { success: true, data };
};

const errorResponse = (message: string, status = 500) => {
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
  } catch (error) {
    const errorResponse = handleError(error);
    return c.json(errorResponse, errorResponse.error.statusCode);
  }
});

// 特定のTodoの取得
app.get("/todos/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
      throw new ValidationError("Invalid ID format");
    }

    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      throw new NotFoundError(`Todo with ID ${id} not found`);
    }

    return c.json(successResponse(todo));
  } catch (error) {
    const errorResponse = handleError(error);
    return c.json(errorResponse, errorResponse.error.statusCode);
  }
});

// Todoの作成
app.post("/todos", async (c) => {
  try {
    let body;
    try {
      body = await c.req.json();
    } catch (e) {
      throw new ValidationError("Invalid JSON format");
    }
    const validatedData = validateTodoInput(body);

    const todo = await prisma.todo.create({
      data: validatedData,
    });
    return c.json(successResponse(todo, 201), 201);
  } catch (error) {
    const errorResponse = handleError(error);
    return c.json(errorResponse, errorResponse.error.statusCode);
  }
});

// Todoの更新
app.put("/todos/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
      throw new ValidationError("Invalid ID format");
    }

    let body;
    try {
      body = await c.req.json();
    } catch (e) {
      throw new ValidationError("Invalid JSON format");
    }
    const validatedData = validateTodoInput(body);

    const todo = await prisma.todo.update({
      where: { id },
      data: validatedData,
    });
    return c.json(successResponse(todo));
  } catch (error) {
    const errorResponse = handleError(error);
    return c.json(errorResponse, errorResponse.error.statusCode);
  }
});

// Todoの削除
app.delete("/todos/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
      throw new ValidationError("Invalid ID format");
    }

    const todo = await prisma.todo.delete({
      where: { id },
    });
    return c.json(successResponse(todo));
  } catch (error) {
    const errorResponse = handleError(error);
    return c.json(errorResponse, errorResponse.error.statusCode);
  }
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve(app, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
