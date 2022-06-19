import { prisma } from "../services/db";

type createcategoryProps = {
  name: string;
  typeId: number;
};

export async function getCategories() {
  try {
    return prisma.categories.findMany({});
  } catch (error) {
    console.error(error.message);
  }
}

export async function createCategory(category: createcategoryProps) {
  try {
    const categoryFound = await prisma.categories.findMany({
      where: { name: category.name },
    });
    if (categoryFound.length > 0) {
      throw new Error("category name already exists");
    }
    return prisma.categories.create({
      data: { ...category },
    });
  } catch (erro) {
    console.error(erro.message);
  }
}
