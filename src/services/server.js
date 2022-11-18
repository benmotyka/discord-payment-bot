import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createServerConfiguration = async ({ discordId }) => {
  let server = await prisma.server.findFirst({
    where: {
      discordId,
    },
  });

  if (!server)
    server = await prisma.server.create({
      data: {
        discordId,
        destinationWallet: "test",
      },
    });

  const configuration = await prisma.serverConfigurtion.create({
    data: {
      serverId: server.id,
    },
  });

  await prisma.server.update({
    data: {
      latestServerConfigurtionId: configuration.id,
    },
    where: {
      discordId,
    },
  });
};

export const getServerConfiguration = async ({ serverId }) => {
  const server = await prisma.server.findFirst({
    where: {
      discordId: serverId,
    },
  });

  return await prisma.serverConfigurtion.findFirst({
    where: {
      id: server?.latestServerConfigurtionId,
    },
  });
};
