-- AlterTable
ALTER TABLE "server" ADD COLUMN     "server_configuration_id" TEXT;

-- CreateTable
CREATE TABLE "server_configuration" (
    "id" TEXT NOT NULL,
    "server_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "server_configuration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "server_configuration_server_id_key" ON "server_configuration"("server_id");

-- AddForeignKey
ALTER TABLE "server" ADD CONSTRAINT "server_server_configuration_id_fkey" FOREIGN KEY ("server_configuration_id") REFERENCES "server_configuration"("id") ON DELETE SET NULL ON UPDATE CASCADE;
