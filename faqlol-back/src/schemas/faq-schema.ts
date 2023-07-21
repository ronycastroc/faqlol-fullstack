import joi, { ObjectSchema, AlternativesSchema } from "joi";

interface CreateFaqParams {
  name: string;
  subSectionId: number | string;
}

interface UpdateFaqParams {
  name: string;
  faqId: number;
}

interface DeleteFaqParams {
  faqId: number;
}

const numberOrStringSchema: AlternativesSchema = joi.alternatives().try(joi.number(), joi.string());

export const faqSchema: ObjectSchema<CreateFaqParams> = joi.object<CreateFaqParams>({
  name: joi.string().required(),
  subSectionId: numberOrStringSchema.required()
});

export const faqUpdateSchema = joi.object<UpdateFaqParams>({
  name: joi.string().required(),
  faqId: joi.number().required()
});

export const faqDeleteSchema = joi.object<DeleteFaqParams>({
  faqId: joi.number().required()
});
