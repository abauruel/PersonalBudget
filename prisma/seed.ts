import { PrismaClient } from "@prisma/client";
import {
  subcategoryDebts,
  subcategoryEducation,
  subcategoryHabitationNames,
  subcategoryHealth,
  subcategoryLeisure,
  subcategoryOthers,
  subcategoryPersonalExpenses,
  subcategoryTransportation,
} from "./seedSubcategories";
const prisma = new PrismaClient();

async function main() {
  const despesasEssenciais = await prisma.costCenter.upsert({
    where: { name: "despesas essenciais" },
    update: {},
    create: {
      name: "despesas essenciais",
    },
  });

  const gastosLivres = await prisma.costCenter.upsert({
    where: { name: "gastos livres" },
    update: {},
    create: {
      name: "gastos livres",
    },
  });

  const despesasEducacao = await prisma.costCenter.upsert({
    where: { name: "despesas educação" },
    update: {},
    create: {
      name: "despesas educação",
    },
  });
  const boletoPessoal = await prisma.costCenter.upsert({
    where: { name: "boleto pessoal" },
    update: {},
    create: {
      name: "boleto pessoal",
    },
  });

  const personalExpense = await seedCategories(
    despesasEssenciais.id,
    "Despesas pessoais"
  );
  for (const name of subcategoryPersonalExpenses) {
    await seedSubCategory({ categoryId: personalExpense.id, name });
  }

  const habitacao = await seedCategories(despesasEssenciais.id, "Habitação");
  for (const name of subcategoryHabitationNames) {
    await seedSubCategory({ categoryId: habitacao.id, name });
  }

  const debt = await seedCategories(despesasEssenciais.id, "Dívidas");
  for (const name of subcategoryDebts) {
    await seedSubCategory({ categoryId: debt.id, name });
  }

  const health = await seedCategories(despesasEssenciais.id, "Saúde");
  for (const name of subcategoryHealth) {
    await seedSubCategory({ categoryId: health.id, name });
  }

  const transportation = await seedCategories(
    despesasEssenciais.id,
    "Transporte"
  );
  for (const name of subcategoryTransportation) {
    await seedSubCategory({ categoryId: transportation.id, name });
  }

  const education = await seedCategories(despesasEducacao.id, "Educação");
  for (const name of subcategoryEducation) {
    await seedSubCategory({ categoryId: education.id, name });
  }

  const leisure = await seedCategories(gastosLivres.id, "Lazer");
  for (const name of subcategoryLeisure) {
    await seedSubCategory({ categoryId: leisure.id, name });
  }
  const others = await seedCategories(gastosLivres.id, "Outros");
  for (const name of subcategoryOthers) {
    await seedSubCategory({ categoryId: others.id, name });
  }

  const personalPaymentSlip = await seedCategories(
    boletoPessoal.id,
    "Boleto pessoal"
  );
  await seedSubCategory({
    categoryId: personalPaymentSlip.id,
    name: "METINHAZINHA ( Um jantar, um sapato, uma blusinha - 3 meses ) ",
  });
  await seedSubCategory({
    categoryId: personalPaymentSlip.id,
    name: "METINHA ( Reserva de Emergência - 6 meses )",
  });
  await seedSubCategory({
    categoryId: personalPaymentSlip.id,
    name: "META ( Viagem Internacional - 1 ano )",
  });
  await seedSubCategory({
    categoryId: personalPaymentSlip.id,
    name: "METAZONA ( Aposentadoria - 30 anos )",
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function seedCategories(costCenterId: number, name: string) {
  const categories = await prisma.category.upsert({
    where: { name },
    update: {},
    create: {
      name,
      costcenterid: costCenterId,
    },
  });
  return categories;
}
type SubCategoryProps = {
  categoryId: number;
  name: string;
};

async function seedSubCategory({ categoryId, name }: SubCategoryProps) {
  const categories = await prisma.subcategory.upsert({
    where: { name },
    update: {},
    create: {
      name,
      categoryId,
    },
  });
  return categories;
}
