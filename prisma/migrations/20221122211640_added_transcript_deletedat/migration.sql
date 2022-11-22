-- DropIndex
DROP INDEX "server_configuration_server_id_key";

-- AlterTable
ALTER TABLE "channel" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "interaction" ADD COLUMN     "chat_transcript" JSONB;
