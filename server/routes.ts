import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTestResultSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/test/submit", async (req, res) => {
    try {
      const testResult = insertTestResultSchema.parse(req.body);
      const result = await storage.createTestResult(testResult);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: "Invalid test result data" });
    }
  });

  app.get("/api/test/results/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const results = await storage.getUserResults(userId);
    res.json(results);
  });

  const httpServer = createServer(app);
  return httpServer;
}
