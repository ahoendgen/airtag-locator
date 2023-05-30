import { PrismaClient } from '@prisma/client';

class Database extends PrismaClient {
  private static _instance: Database;

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }
}

function getDatabaseClient(): Database {
  return Database.Instance;
}

export default getDatabaseClient;
