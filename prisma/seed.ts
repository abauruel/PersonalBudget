import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const income = await prisma.type.upsert({
    where: { name: "income" },
    update: {},
    create: {
      name: "income",
    },
  });
  const outcome = await prisma.type.upsert({
    where: { name: "outcome" },
    update: {},
    create: {
      name: "outcome",
    },
  });

  const DespesasEssenciais = await prisma.categories.upsert({
    where: {
      name: "Despesas Essenciais",
    },
    update: {},
    create: {
      name: "Despesas Essenciais",
      typeId: income.id,
    },
  });
  const DespesasEducacao = await prisma.categories.upsert({
    where: {
      name: "Despesas Educação",
    },
    update: {},
    create: {
      name: "Despesas Educação",
      typeId: income.id,
    },
  });
  const GastosLivres = await prisma.categories.upsert({
    where: {
      name: "Gastos livres",
    },
    update: {},
    create: {
      name: "Gastos livres",
      typeId: income.id,
    },
  });
  const BoletoPessoal = await prisma.categories.upsert({
    where: {
      name: "Boleto Pessoal",
    },
    update: {},
    create: {
      name: "Boleto Pessoal",
      typeId: income.id,
    },
  });

  // subcategories
  const habitacao = await prisma.subcategories.upsert({
    where: {
      name: "Habitação",
    },
    update: {},
    create: {
      name: "Habitação",
      idcategory: DespesasEssenciais.id,
    },
  });
  const dividas = await prisma.subcategories.upsert({
    where: {
      name: "Dívidas",
    },
    update: {},
    create: {
      name: "Dívidas",
      idcategory: DespesasEssenciais.id,
    },
  });
  const saude = await prisma.subcategories.upsert({
    where: {
      name: "Saúde",
    },
    update: {},
    create: {
      name: "Saúde",
      idcategory: DespesasEssenciais.id,
    },
  });
  const transporte = await prisma.subcategories.upsert({
    where: {
      name: "Transporte",
    },
    update: {},
    create: {
      name: "Transporte",
      idcategory: DespesasEssenciais.id,
    },
  });
  const despesasPessoais = await prisma.subcategories.upsert({
    where: {
      name: "Despesas pessoais",
    },
    update: {},
    create: {
      name: "Despesas pessoais",
      idcategory: DespesasEssenciais.id,
    },
  });

  const educacao = await prisma.subcategories.upsert({
    where: {
      name: "Educação",
    },
    update: {},
    create: {
      name: "Educação",
      idcategory: DespesasEducacao.id,
    },
  });
  const lazer = await prisma.subcategories.upsert({
    where: {
      name: "Lazer",
    },
    update: {},
    create: {
      name: "Lazer",
      idcategory: GastosLivres.id,
    },
  });
  const outros = await prisma.subcategories.upsert({
    where: {
      name: "Outros",
    },
    update: {},
    create: {
      name: "Outros",
      idcategory: GastosLivres.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
