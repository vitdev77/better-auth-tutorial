import prisma from "@/lib/prisma";

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "account" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "session" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "user" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "verification" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
