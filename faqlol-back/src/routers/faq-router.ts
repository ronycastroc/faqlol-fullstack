import { deleteFaq, getFaqs, postFaq, updateFaq } from "@/controllers/faq-controller";
import { validateBody } from "@/middlewares/validation-middleware";
import { faqDeleteSchema, faqSchema, faqUpdateSchema } from "@/schemas/faq-schema";
import { Router } from "express";

const faqRouter = Router();

faqRouter
  .post("/", validateBody(faqSchema), postFaq)
  .get("/", getFaqs)
  .put("/", validateBody(faqUpdateSchema), updateFaq)
  .delete("/", validateBody(faqDeleteSchema), deleteFaq);

export { faqRouter };
