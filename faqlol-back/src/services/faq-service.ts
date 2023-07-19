import faqRepository from "@/repositories/faq-repository";
import { section } from "@prisma/client";

export type CreateFaqParams = Omit<section, "id" | "createdAt" | "updatedAt">
export type UpdateFaqParams = Omit<section, "id" | "createdAt" | "updatedAt" | "subSectionId">

const createFaq = async ({ name, subSectionId }: CreateFaqParams): Promise<section> => {
  if (!subSectionId) {
    const result = await faqRepository.create({ name });

    return result;
  }

  await readFaqById(subSectionId);  

  const result = await faqRepository.create({ name, subSectionId });

  return result;
};

const readFaqById = async (subSectionId: number): Promise<section> => {
  const idExists = await faqRepository.readFaqById(subSectionId);

  if (!idExists) throw new Error("Parent section id does not exist.");

  return idExists;
};

const readFaqs = async (): Promise<section[]> => {
  const result = await faqRepository.read();

  return result;
};

const updateFaq = async (faqId: number, { name }: UpdateFaqParams): Promise<section> => {
  const updatedAt = new Date();

  await readFaqById(faqId);
  
  const result = await faqRepository.update({ name, updatedAt }, faqId);

  return result;
};

const faqService = {
  createFaq,
  readFaqs,
  updateFaq
};

export default faqService;
