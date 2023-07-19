import { postFaq } from "@/controllers/faq-controller";
import { validateBody } from "@/middlewares/validation-middleware";
import { faqSchema } from "@/schemas/faq-schema";
import { Router } from "express";

const faqRouter = Router();

faqRouter
  .post("/", validateBody(faqSchema), postFaq);

export { faqRouter };
