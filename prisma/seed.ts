import { config } from "dotenv";
config({ path: [".env.local", ".env"] });

import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  await prisma.setting.upsert({
    where: { key: "theme" },
    update: {},
    create: { key: "theme", value: "dark" },
  });
  await prisma.setting.upsert({
    where: { key: "name" },
    update: {},
    create: { key: "name", value: "Mujeeb ur Rehman" },
  });
  await prisma.setting.upsert({
    where: { key: "city" },
    update: {},
    create: { key: "city", value: "Charsadda" },
  });

  console.log("Seed complete: default settings created.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
