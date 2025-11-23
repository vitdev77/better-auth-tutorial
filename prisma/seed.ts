import prisma from "@/lib/prisma";
import { brands, modelColors, models, series } from "./data-for-seeding";

async function up() {
  // adding brands
  await prisma.brand.createMany({
    data: brands,
  });

  // adding series
  await prisma.series.createMany({
    data: series,
  });

  // adding models
  // await prisma.model.create({
  //   data: {
  //     name: "MDRB471MGF01O",
  //     imageUrl: "/products/mdrb471mgf01O.jpg",
  //     modelColorId: 1,
  //     seriesId: 1,
  //   },
  // });

  // adding model colors
  await prisma.modelColor.createMany({
    data: modelColors,
  });
}

async function down() {
  // clear user tables
  await prisma.$executeRaw`TRUNCATE TABLE "accounts" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "sessions" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "verifications" RESTART IDENTITY CASCADE`;

  //clear product tables
  await prisma.$executeRaw`TRUNCATE TABLE "brands" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "series" RESTART IDENTITY CASCADE`;
  // await prisma.$executeRaw`TRUNCATE TABLE "models" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "model_colors" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
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
