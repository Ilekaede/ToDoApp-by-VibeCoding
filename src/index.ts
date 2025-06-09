import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { cors } from "hono/cors";

const app = new Hono();
const prisma = new PrismaClient();

// CORSの設定
app.use("/*", cors());

// Todo一覧の取得
app.get("/todos", async (c) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return c.json(todos);
  } catch (error) {
    return c.json({ error: "Failed to fetch todos" }, 500);
  }
});

// Todoの作成
app.post("/todos", async (c) => {
  try {
    const body = await c.req.json();
    const todo = await prisma.todo.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return c.json(todo, 201);
  } catch (error) {
    return c.json({ error: "Failed to create todo" }, 500);
  }
});

// Todoの更新
app.put("/todos/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const body = await c.req.json();
    const todo = await prisma.todo.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        completed: body.completed,
      },
    });
    return c.json(todo);
  } catch (error) {
    return c.json({ error: "Failed to update todo" }, 500);
  }
});

// Todoの削除
app.delete("/todos/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    await prisma.todo.delete({
      where: { id },
    });
    return c.json({ message: "Todo deleted successfully" });
  } catch (error) {
    return c.json({ error: "Failed to delete todo" }, 500);
  }
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
