import { execSync } from "child_process";
import supertest from "supertest";
import { db } from "../src/server/lib/prisma";
import { server } from "../src/server/server";

beforeAll(async () => {
  execSync("dotenv -e .env.test -- npx prisma migrate deploy");

  const email = "teste@teste.com";
  const senha = "12345678";

  await testServer.post("/cadastrar")
    .send({
      nome: "Teste",
      email,
      senha
    });

  const signInRes = await testServer.post("/entrar")
    .send({
      email,
      senha
    });

  process.env.TEST_ACCESS_TOKEN = signInRes.body.accessToken;

  await db.$connect();
});

afterAll(async () => {
  await db.$disconnect();
});

export const testServer = supertest(server);
