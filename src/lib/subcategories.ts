import { prisma } from "../services/db";

type subCategoryProps = {
  name: string;
  categoryId: number;
};

export async function getSubcategories(categoryId: number) {
  try {
    return prisma.subcategory.findMany({
      where: {
        categoryId,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
}
export async function createSubcategory(subcategory: subCategoryProps) {
  try {
    const subcategoryFound = await prisma.subcategory.findMany({
      where: {
        name: subcategory.name,
        categoryId: subcategory.categoryId,
      },
    });

    if (subcategoryFound.length > 0) {
      throw new Error("subcategory already exists");
    }

    return prisma.subcategory.create({
      data: {
        name: subcategory.name,
        categoryId: subcategory.categoryId,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
}
