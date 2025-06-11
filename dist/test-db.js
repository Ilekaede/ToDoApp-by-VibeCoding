"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: ["query", "info", "warn", "error"],
});
async function testConnection() {
    try {
        console.log("Attempting to connect to the database...");
        console.log("Connection URL:", process.env.DATABASE_URL);
        // データベース接続をテスト
        await prisma.$connect();
        console.log("Successfully connected to the database");
        // 接続を閉じる
        await prisma.$disconnect();
    }
    catch (error) {
        console.error("Failed to connect to the database:");
        console.error("Error details:", error);
        if (error?.code === "P1001") {
            console.log("\nTroubleshooting tips:");
            console.log("1. Check if the database server is running");
            console.log("2. Verify the connection string is correct");
            console.log("3. Check if the database is accessible from your IP address");
            console.log("4. Try adding ?pgbouncer=true to the connection string");
        }
    }
}
testConnection();
