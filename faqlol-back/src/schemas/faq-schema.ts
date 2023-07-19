import { CreateFaqParams } from "@/services/faq-service";
import joi from "joi";

export const faqSchema = joi.object<CreateFaqParams>({
  name: joi.string().required(),
  subSectionId: joi.number()
});
