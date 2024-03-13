import { execSync } from "child_process";
import supertest from "supertest";
import { db } from "../src/server/lib/prisma";
import { server } from "../src/server/server";

beforeAll(async () => {
  execSync("dotenv -e .env.test -- npx prisma migrate deploy");

  await db.$connect();
});

afterAll(async () => {
  await db.$disconnect();
});

export const testServer = supertest(server);
