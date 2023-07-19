import faqRepository from "@/repositories/faq-repository";
import { section } from "@prisma/client";

export type CreateFaqParams = Omit<section, "id" | "createdAt" | "updatedAt">

const createFaq = async ({ name, subSectionId }: CreateFaqParams): Promise<section> => {
  if (!subSectionId) {
    const result = await faqRepository.create({ name });

    return result;
  }

  const idExists = await faqRepository.readFaqById(subSectionId);

  if (!idExists) throw new Error("Parent section id does not exist.");

  const result = await faqRepository.create({ name, subSectionId });

  return result;
};

const faqService = {
  createFaq
};

export default faqService;
