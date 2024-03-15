import { execSync } from "child_process";
import { server } from "./server/server";

const startServer = () => {
  server.listen(process.env.PORT || 3333, () => {
    console.log(`🚀 Server is running in http://localhost:${process.env.PORT || 3333}`);
  });
};

if (process.env.IS_LOCALHOST !== "true") {
  try {
    execSync("npx prisma migrate deploy");
    console.log("Prisma migrations executed successfully!");
    execSync("npx prisma db seed");
    console.log("Prisma seeds executed successfully!");
    startServer();
  } catch (error) {
    console.error("Error executing Prisma migrations:", error);
    process.exit(1);
  }
} else {
  startServer();
}


