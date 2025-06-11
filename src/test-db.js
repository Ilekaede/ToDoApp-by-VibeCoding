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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: ["query", "info", "warn", "error"],
});
function testConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Attempting to connect to the database...");
            console.log("Connection URL:", process.env.DATABASE_URL);
            // データベース接続をテスト
            yield prisma.$connect();
            console.log("Successfully connected to the database");
            // 接続を閉じる
            yield prisma.$disconnect();
        }
        catch (error) {
            console.error("Failed to connect to the database:");
            console.error("Error details:", error);
            if ((error === null || error === void 0 ? void 0 : error.code) === "P1001") {
                console.log("\nTroubleshooting tips:");
                console.log("1. Check if the database server is running");
                console.log("2. Verify the connection string is correct");
                console.log("3. Check if the database is accessible from your IP address");
                console.log("4. Try adding ?pgbouncer=true to the connection string");
            }
        }
    });
}
testConnection();
