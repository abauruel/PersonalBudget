import { prisma } from "../services/db";

type subCategoryProps = {
  name: string;
  categoryId: number;
};

export async function getSubcategories(categoryId: number) {
  try {
    return prisma.subcategories.findMany({
      where: {
        idcategory: categoryId,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
}
export async function createSubcategory(subcategory: subCategoryProps) {
  try {
    const subcategoryFound = await prisma.subcategories.findMany({
      where: {
        name: subcategory.name,
        idcategory: subcategory.categoryId,
      },
    });

    if (subcategoryFound.length > 0) {
      throw new Error("subcategory already exists");
    }

    return prisma.subcategories.create({
      data: {
        name: subcategory.name,
        idcategory: subcategory.categoryId,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
}
