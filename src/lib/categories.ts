import { Prisma } from "@prisma/client";
import { prisma } from "../services/db";

type createcategoryProps = {
  name: string;
  typeId: number;
  costCenterId: number;
};

export async function getCategories() {
  try {
    const category = await prisma.category.findMany({});
    console.log("category=>", category);
    return category;
  } catch (error) {
    console.error(error.message);
  }
}

export async function createCategory(
  category: Prisma.CategoryUncheckedCreateInput
) {
  try {
    const categoryFound = await prisma.category.findMany({
      where: { name: category.name },
    });
    if (categoryFound.length > 0) {
      throw new Error("category name already exists");
    }

    return prisma.category.create({
      data: { ...category },
    });
  } catch (erro) {
    console.error(erro.message);
  }
}
