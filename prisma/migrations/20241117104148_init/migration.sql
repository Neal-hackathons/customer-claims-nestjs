-- CreateTable
CREATE TABLE "customer" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "claim" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "customer" UUID NOT NULL,
    "point_value" INTEGER NOT NULL,

    CONSTRAINT "claim_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_name_email_key" ON "customer"("name", "email");

-- AddForeignKey
ALTER TABLE "claim" ADD CONSTRAINT "claim_customer_fkey" FOREIGN KEY ("customer") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
