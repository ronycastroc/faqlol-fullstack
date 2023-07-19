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

export const getFaqs = async (req: Request, res: Response) => {
  try {
    const result = await faqService.readFaqs();

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }  
};

export const updateFaq = async (req: Request, res: Response) => {
  try {
    const { name, faqId } = req.body;

    const result = await faqService.updateFaq(Number(faqId), { name });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {    
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};

export const deleteFaq = async (req: Request, res: Response) => {
  try {
    const { faqId } = req.body;  

    await faqService.deleteFaq(Number(faqId));

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};
