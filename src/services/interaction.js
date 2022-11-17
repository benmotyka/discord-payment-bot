import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createInteraction = async ({
  userId,
  serverId,
  channelId,
  channelName,
}) => {
  return await prisma.interaction.create({
    data: {
      user: {
        connect: {
          discordId: userId,
        },
      },
      server: {
        connectOrCreate: {
          create: {
            destinationWallet: "test",
            discordId: serverId,
          },
          where: {
            discordId: serverId,
          },
        },
      },
      channel: {
        create: {
          name: channelName,
          discordId: channelId,
        },
      },
    },
  });
};

export const softDeleteInteraction = async (channelId) => {
  const interaction = await prisma.interaction.findFirst({
    where: {
      channel: {
        discordId: channelId,
      },
    },
  });

  return await prisma.interaction.update({
    where: {
      id: interaction.id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};

export const getInteractionDetails = async (channelId) => {
  return await prisma.interaction.findFirst({
    where: {
      channel: {
        discordId: channelId,
      },
    },
  });
};
