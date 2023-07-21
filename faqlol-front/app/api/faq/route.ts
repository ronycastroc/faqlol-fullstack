import { IFormData } from "@/app/(pages)/add-faq/page";

export interface FaqItem {
  id: number;
  name: string;
  subSectionId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

const URL_API = "http://localhost:5000/faq";

export async function GET() {
  const response = await fetch(URL_API);

  if (!response.ok) throw new Error("Failed to fetch data");

  const faqs: FaqItem[] = await response.json();

  return faqs;
}

export async function POST(body: IFormData) {
  if (!body.name) throw new Error("Section title is required");

  const response = await fetch(URL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const faqs: FaqItem[] = await response.json();

  return faqs;
}
