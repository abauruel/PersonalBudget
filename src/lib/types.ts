import { prisma } from "../services/db";

export async function getTypes() {
  try {
    return prisma.type.findMany();
  } catch (error) {
    console.error(error.message);
  }
}

export async function createType(name: string) {
  try {
    const typeFound = await prisma.type.findMany({ where: { name } });
    console.log(typeFound);
    if (typeFound.length > 0) {
      throw new Error("type name already exists");
    }

    return prisma.type.create({ data: { name } });
  } catch (error) {
    console.error(error.message);
  }
}
