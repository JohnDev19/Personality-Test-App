import { users, type User, type InsertUser, type TestResult, type InsertTestResult } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createTestResult(result: InsertTestResult): Promise<TestResult>;
  getUserResults(userId: number): Promise<TestResult[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private testResults: Map<number, TestResult>;
  private currentUserId: number;
  private currentResultId: number;

  constructor() {
    this.users = new Map();
    this.testResults = new Map();
    this.currentUserId = 1;
    this.currentResultId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createTestResult(result: InsertTestResult): Promise<TestResult> {
    const id = this.currentResultId++;
    const testResult: TestResult = { ...result, id };
    this.testResults.set(id, testResult);
    return testResult;
  }

  async getUserResults(userId: number): Promise<TestResult[]> {
    return Array.from(this.testResults.values()).filter(
      (result) => result.userId === userId
    );
  }
}

export const storage = new MemStorage();
