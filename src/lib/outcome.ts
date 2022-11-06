import { prisma } from "../services/db";
import { v4 as uuid } from "uuid";
import { getMonth, startOfMonth, endOfMonth } from "date-fns";
type createOutcomeProps = {
  amount: number;
  date: Date;
  description: string;
  idpaymentType: number;
  idsubcategory: number;
  idgroup?: string;
  dueDate: Date;
};

export async function createOutcome(createOutcome: createOutcomeProps) {
  console.log(createOutcome);
  try {
    const {
      amount,
      dueDate,
      description,
      idsubcategory,
      idpaymentType,
      idgroup,
    } = createOutcome;
    return prisma.expense.create({
      data: {
        amount,
        dueDate,
        description,
        status: "open",
        expenseOf: "Alex",
        subcategoryId: idsubcategory,
        bankAccountId: "",
        groupId: "",
        paymentTypeId: 1,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
}

export async function getOutcomeByMonth(month: Date) {
  const firstDay = startOfMonth(month);
  const endDay = endOfMonth(month);
  return prisma.category.findMany({
    include: {
      Subcategory: {
        include: {
          Expense: true,
        },
      },
    },
    where: {
      Subcategory: {
        every: {
          Expense: {
            every: {
              dueDate: {
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
