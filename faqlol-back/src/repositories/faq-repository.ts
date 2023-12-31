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

const update = async (data: Prisma.sectionUncheckedUpdateInput, faqId: number) => {
  return prisma.section.update({
    where: {
      id: faqId
    },
    data,
  });
};

const deleteFaq = async (faqId: number) => {
  return prisma.section.delete({
    where: { 
      id: faqId
    }
  });
};

const faqRepository = {
  create,
  readFaqById,
  read,
  update,
  deleteFaq
};

export default faqRepository;
