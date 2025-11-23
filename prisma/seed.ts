import prisma from "@/lib/prisma";

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "accounts" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "sessions" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "verifications" RESTART IDENTITY CASCADE`;
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
