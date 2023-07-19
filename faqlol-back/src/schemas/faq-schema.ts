import { CreateFaqParams } from "@/services/faq-service";
import joi from "joi";

interface UpdateFaqParams {
  name: string;
  faqId: number;
}

interface DeleteFaqParams {
  faqId: number;
}

export const faqSchema = joi.object<CreateFaqParams>({
  name: joi.string().required(),
  subSectionId: joi.number()
});

export const faqUpdateSchema = joi.object<UpdateFaqParams>({
  name: joi.string().required(),
  faqId: joi.number().required()
});

export const faqDeleteSchema = joi.object<DeleteFaqParams>({
  faqId: joi.number().required()
});
