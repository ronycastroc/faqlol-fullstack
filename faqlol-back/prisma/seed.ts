/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ParentSection = {
  name: string;
  subSectionId: null;
};

type SubSection = {
  name: string;
  subSectionId: number;
};

const createRandomSections = async () => {
  const parentSections: ParentSection[] = [];
  const subSections: SubSection[] = [];
  const subSubSections: SubSection[] = [];

  for (let i = 1; i <= 5; i++) {
    const parentSection: ParentSection = {
      name: `Lorem, ipsum dolor sit amet consectetur ${i}`,
      subSectionId: null,
    };
    parentSections.push(parentSection);
  }

  for (const parentSection of parentSections) {
    const createdParentSection = await prisma.section.create({
      data: parentSection,
    });

    const subSection: SubSection = {
      name: "Maiores, necessitatibus nesciunt excepturi saepe ex minima dicta ut voluptate enim",
      subSectionId: createdParentSection.id,
    };
    subSections.push(subSection);

    for (let i = 1; i <= 1; i++) {
      const createdSubSection = await prisma.section.create({
        data: subSections[subSections.length - 1],
      });

      const subSubSection: SubSection = {
        name: `Subsubsection ${i}`,
        subSectionId: createdSubSection.id,
      };
      subSubSections.push(subSubSection);
    }
  }

  const allSections: (ParentSection | SubSection)[] = [
    ...parentSections,
    ...subSections,
    ...subSubSections,
  ];
  await prisma.section.createMany({
    data: allSections,
  });
};

const main = async () => {
  try {
    await createRandomSections();
    console.log("Seed completed successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
