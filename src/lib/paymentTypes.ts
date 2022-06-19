import { prisma } from "../services/db";
export async function getPaymentTypes() {
  try {
    return prisma.paymentTypes.findMany();
  } catch (error) {
    console.log(error.message);
  }
}
export async function createPaymentType(name: string) {
  try {
    const paymentTypeFound = await prisma.paymentTypes.findUnique({
      where: { name },
    });
    if (paymentTypeFound) {
      throw new Error("payment type already exist");
    }
    return prisma.paymentTypes.create({ data: { name } });
  } catch (error) {
    console.error(error.message);
  }
}
