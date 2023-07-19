import faqService from "@/services/faq-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export const postFaq = async (req: Request, res: Response) => {
  try {
    const { name, subSectionId } = req.body;

    const result = await faqService.createFaq({ name, subSectionId });

    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {    
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};