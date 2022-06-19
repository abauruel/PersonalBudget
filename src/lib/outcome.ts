import { prisma } from "../services/db";
import { v4 as uuid } from "uuid";
import { getMonth, startOfMonth, endOfMonth } from "date-fns";
type createOutcomeProps = {
  amount: number;
  date: Date;
  name: string;
  idpaymentType: number;
  idsubcategory: number;
  idgroup?: string;
};

export async function createOutcome(createOutcome: createOutcomeProps) {
  console.log(createOutcome);
  try {
    const { amount, date, name, idsubcategory, idpaymentType, idgroup } =
      createOutcome;
    return prisma.expenses.create({
      data: {
        id: uuid(),
        amount,
        date,
        name,
        idpaymentType,
        idsubcategory,
        idgroup,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
}

export async function getOutcomeByMonth(month: Date) {
  const firstDay = startOfMonth(month);
  const endDay = endOfMonth(month);
  return prisma.categories.findMany({
    include: {
      subcategories: {
        include: {
          expenses: true,
        },
      },
    },
    where: {
      subcategories: {
        every: {
          expenses: {
            every: {
              date: {
                gte: firstDay,
                lte: endDay,
              },
            },
          },
        },
      },
    },
  });
}
