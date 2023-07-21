-- CreateTable
CREATE TABLE "section" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "subSectionId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "section_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "section" ADD CONSTRAINT "section_subSectionId_fkey" FOREIGN KEY ("subSectionId") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
