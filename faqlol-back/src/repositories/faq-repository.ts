import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

const create = async (data: Prisma.sectionUncheckedCreateInput) => {
  return prisma.section.create({
    data,
  });
};

const readFaqById = async (subSectionId: number) => {
  return prisma.section.findFirst({
    where: {
      id: subSectionId,
    }
  });
};

const read = async () => {
  return prisma.section.findMany();
};

const faqRepository = {
  create,
  readFaqById,
  read
};

export default faqRepository;
